const express = require("express");
const editor = express.Router();
const { ArticalModel } = require("../models");


editor.all("/*",function(req,res,next){
	console.log("req.session:::",req.session);
	if(req.session.userId){
		next();
	}else{
		res.redirect("/login");
	}
})

editor.get("/",function(req,res,next){
	res.render("editor",{username:req.session.username});
})

editor.post("/",function(req,res,next){
	const form = req.body;
	console.log("Form:",form);
	console.log("REQSESSION",req.session)
	form.author = req.session.userId;
	const art = new ArticalModel(form);
	art.save((err,doc) =>{
		if(err){
			console.log("Error:",err);
		}
		console.log("DOC:",doc);
		// req.session.articalId = doc._id;
		res.redirect("/user");
	})
})


module.exports = editor;