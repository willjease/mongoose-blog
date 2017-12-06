const mongoose = require("mongoose");

const ArticalSchema = mongoose.Schema({
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"user",
	},
	title:String,
	content:String,
	createAt:{
		type:Date,
		default:Date.now,
	},
})

const ArticalModel = mongoose.model("artical",ArticalSchema,"artical");

module.exports = ArticalModel;