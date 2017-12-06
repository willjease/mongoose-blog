var express = require('express');
var signup = express.Router();
const { UserModel } = require("../models");
const hmac = require("../utils/hash");
const getCaptcha = require("../utils/getCaptcha");

signup.get("/",function(req,res,next){
	res.render("signup");
})

signup.post("/",function(req,res,next){
	const reqJson = req.body;
	console.log("ReqJson:",reqJson);
	/*
	const check = {};
	if(form.password !== form.password1){
		check.passErr = "两次输入的密码不一样";
		return res.render("signup",{check:check});
	}
	const hashPass = hmac(form.password);
	const blog = new UserModel({
		username:form.user,
		password:hashPass,
		phone:form.phone,
		email:form.email,
	});
	blog.save((err,doc) =>{
		if(!err){
			// console.log("Error:",err);
			req.session.userId = doc._id;
			req.session.username = doc.username;
			res.redirect("/");
			return
		}
		console.log("Error:",err);
		// console.log("Doc:",doc);
		if(err.message.indexOf("duplicate key error") !== -1){
			check.userErr = "用户名已经存在";
			console.log("Check:",check);
		}
		// res.redirect("/welcome");
		res.render("/signup",{check:check});
	})
	*/
	const blog = new UserModel(reqJson);
	blog.save((err,doc) =>{
		if(err){
			console.log("Error:",err);
		}
		console.log("Doc:",doc);
		res.redirect("/welcome");
	})
})

signup.get("/",function(req,res,next){
	res.render("welcome");
})

module.exports = signup;