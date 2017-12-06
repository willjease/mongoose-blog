const mongoose = require("mongoose");


const CommentSchema = mongoose.Schema({
	content: String,
	author: {
		type: String,
		require: true,
	},
	artical: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "artical",
	},
	createAt: {
		type: Date,
		default: Date.now
	},
})

const CommentModel = mongoose.model("comment", CommentSchema, "comment");

module.exports = CommentModel;