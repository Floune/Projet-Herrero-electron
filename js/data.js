let $ = require('jquery');
let url = "http://192.168.1.61/phpHerrero/index.php";
module.exports = function(cb){

$.ajax ({
	cache: false,
	url: url + "/photos",
	dataType: "json",
	type: "get",
	success: function(data){
		cb(data);
	},
	error: function(data){
		console.log(data);
	}
});
};