var express = require('express');
var logout = express.Router();

logout.get("/",function(req,res,next){
	req.session.destroy();
	res.redirect("/");
})

module.exports = logout;