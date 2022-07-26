const router = require("express").Router();
const File = require("../models/file");
router.get("/:id", async (req, res) => {
	const file = await File.findOne({ uuid: req.params.id });
	if (!file) {
		return res.status(404).json({
			error: "File not found",
		});
	}
	res.download(__dirname + "/../uploads/" + file.fileName);
});
module.exports = router;
