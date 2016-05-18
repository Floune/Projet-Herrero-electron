let $ = require('jquery');
let url = "http://192.168.1.61/phpHerrero/";
module.exports = function(cb){

//requete pour recevoir les photos minifiées depuis le serveur php
$.ajax ({
	cache: false,
	url: url + "index.php/photos",
	dataType: "json",
	type: "get",
	success: function(data){
		console.log(data);
		len = data.length;
		for (i=0; i<len; i++) {
			obj = data[i];
			var size = (Object.keys(obj).length);
			for (j=0; j<size; j++) {
				data[i][j]['url'] = url + data[i][j]['url'];		
			}
		}
		cb(data);
	},
	error: function(data){
		console.log('erreeeeeeeeur');
		
	}
});
};