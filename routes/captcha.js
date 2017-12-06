const express = require("express");
const getCcap = require("../utils/getCaptcha");

const captcha = express.Router();

captcha.get("/", function(req, res, next) {
	getCcap((cap) =>{
		req.session.captcha = cap.text;
		res.send(cap.buffer);
	});
});

module.exports = captcha;