var express = require('express');
var users = express.Router();
const {UserModel,ArticalModel} = require("../models");
const multer = require("multer");
const dest = "public/upload/";
const uploadMid = multer({dest:dest});


/* GET users listing. */
users.all("/*",function(req,res,next){
	console.log("req.session::",req.session);
	if (req.session.userId) {
		next()
	} else {
		res.redirect("/login");
	}
})

users.get("/", function(req, res, next) {
	console.log("session:",req.session);
	const user = req.session.username;
	const id = req.session.userId;
	UserModel.findById(id).then((doc) =>{
		console.log("Doc:",doc);
		const username = doc.username;
		if(!doc.avatar){
			doc.avatar = "/static/img/D.VA.jpg";
		}
	ArticalModel.find({author:doc._id}).then((docs) =>{
		console.log("ARTICAl docs::::",docs);
		// req.session.articalId = docs._id;
		res.render("usercenter", {username: username,user:doc,data:docs});
		})
	})
})

users.post("/",uploadMid.single("image1"),function(req,res,next){
	console.log("Form:",req.body);
	console.log("file:",req.file);
	const start = req.file.path.indexOf("\\");
	// console.log("Start:",start);
	const path = req.file.path.substr(start);
	// console.log("Path:",path);
	const id = req.session.userId;
	// console.log("ID:",id);
	UserModel.findById(id).then((doc) =>{
		// console.log("Doc:",doc);
		doc.avatar = path;
		doc.save();
		res.redirect("/user");
	}).catch((err) =>{
		next(err);
	})
	// res.redirect("/user")
	// res.render("usercenter",{imgPath:path});
})

// users.get("/logout", function(req, res, next) {
	// req.session.destroy();
	// res.redirect("/");
// })

module.exports = users;
