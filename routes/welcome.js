var express = require('express');
var welcome = express.Router();

welcome.get("/",function(req,res,next){
	res.render("welcome");
})


module.exports = welcome;