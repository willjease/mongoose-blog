const express = require("express");
const show = express.Router();
const {
	ArticalModel,
	CommentModel
} = require("../models");

show.get("/:id", function(req, res, next) {
	const id = req.params.id
	console.log("Params:", id);
	ArticalModel.findById(id)
		.then((doc) => {
			console.log("ARTICAL DOC::", doc); //文章的对象
			req.session.articalId = doc._id;
			CommentModel.find({
					artical: req.session.articalId
				})
				.sort("-createAt")
				.then((docs) => {
					console.log("DOCS:", docs)
					res.render("show", {
						artical: doc,
						comment: docs,
						username: req.session.username,
					})
				})
		})
		.catch((err) => {
			console.log("ERRor:", err);
			next(err);
		})
})


show.post("/:id", function(req, res, next) {
	const reqJson = req.body;
	console.log("REQJSON:", reqJson);
	console.log("REQsession:", req.session);
	reqJson.artical = req.session.articalId;
	reqJson.author = req.session.username || "游客";
	const comment = new CommentModel(reqJson);
	comment.save((err, doc) => {
		if (err) {
			console.log("ERROR:", err)
		}
		CommentModel.find({
				artical: req.session.articalId
			})
			.then((docs) => {
				console.log("COMMENT docs::", docs);
				res.redirect("back");
			})
	})
})


module.exports = show;