let $ = require('jquery');
module.exports = function(cb){

$.ajax ({
	url: "http://192.168.1.17/phpHerrero/index.php/photos",
	dataType: "json",
	type: "get",
	success: function(data){
		cb(data);
	}
});
};