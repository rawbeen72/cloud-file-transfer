const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
	{
		fileName: {
			type: String,
			required: true,
		},
		uuid: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		multiFilesId: {
			type: String,
			required: false,
			default: null,
		},
		fileType: {
			type: String,
			required: false,
		},
		sender: {
			type: String,
			required: false,
		},
		receiver: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
