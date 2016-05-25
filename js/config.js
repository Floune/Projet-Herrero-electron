let $ = require('jquery');
let fs = require('fs');
let obj_config = {}


let config = {


	set(url) {
		obj_config.url = url;
		conff = JSON.stringify(obj_config);
		fs.writeFileSync("config.json", conff);
	},

	get() {
		let confi = JSON.parse(fs.readFileSync('config.json'));
		return confi;
	}

}


module.exports = config;




