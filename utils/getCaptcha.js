const http = require("http");
const port = 3000;
const ip = "192.168.1.118";
const path = "/";

const getCaptcha = function(cb){
	http.get({
		host:ip,
		port:port,
		path:path,
	},function(res){
		let resDate = "";
		res.setEncoding("utf-8");
		res.on("data",function(chunk){
			resDate += chunk;
		});
		res.on("end",function(){
			const jsobj = JSON.parse(resDate);
			console.log("obj:",jsobj);
			cb(jsobj);
		})
	})
}

module.exports = getCaptcha;