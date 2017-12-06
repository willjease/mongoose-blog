const crypto = require("crypto");


const hmac = function(){
	const hmac1 = crypto.createHmac("sha256");
	hmac1.update(str);
	return hmac1.digest("hex");
}

module.exports = hmac;