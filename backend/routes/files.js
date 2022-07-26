const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const { v4 } = require("uuid");
const path = require("path");
const File = require("../models/file");
var fileUrls = [];
var newFiles = [];
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()} - ${file.originalname}`);
	},
});
const upload = multer({
	dest: "uploads/",
	storage,
	limits: { fileSize: 1000000 * 1000 },
}).array("files", 100);

router.post("/", (req, res) => {
	// store file
	upload(req, res, async (err) => {
		if (!req.files) {
			return res.status(400).json({
				error: "No file uploaded",
			});
		}
		if (err) {
			return res.status(500).json({
				error: err.message,
			});
		}

		if (req.files.length > 1) {
			fileUrls = [];
			multiFilesId = v4();
			req.files.forEach(async (file) => {
				let fileType = file.filename.split(".")[1];
				const newFile = new File({
					fileName: file.filename,
					path: file.path,
					size: file.size,
					uuid: v4(),
					fileType,
					multiFilesId,
				});
				fileUrls.push(`${process.env.SERVER_BASE_URL}/file/${newFile.uuid}`);
				await newFile.save();
			});
			return res.status(200).json({
				message: "Files uploaded successfully",
				id: multiFilesId,
			});
		}

		// single file
		else {
			let fileType = req.files[0].filename.split(".")[1];
			const newFile = new File({
				fileName: req.files[0].filename,
				path: req.files[0].path,
				size: req.files[0].size,
				fileType,
				uuid: v4(),
			});
			fileUrls = [];
			fileUrls.push(`${process.env.SERVER_BASE_URL}/file/${newFile.uuid}`);

			await newFile.save();
			return res.status(200).json({
				message: "File uploaded successfully",
				id: newFile.uuid,
				"file(s)": fileUrls,
			});
		}
	});
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	if (fileUrls.length === 1) {
		const file = await File.findOne({ uuid: id });
		if (!file) {
			return res.status(404).json({
				error: "File not found",
			});
		}
		return res.status(200).json({
			id,
			"file(s)": [file],
		});
	}
	const files = await File.find({
		multiFilesId: id,
	});

	res.json({
		id,
		"file(s)": files,
	});
});

module.exports = router;
