let $ = require('jquery');
let _config = require('./config.js');
// let config  = _config.get();
// let url = "http://" + config.url + "/simplon/serverHerrero/";

module.exports = function(cb){
let config  = _config.get();
let url = "http://" + config.url + "/simplon/serverHerrero/";
//requete pour recevoir les photos minifiées depuis le serveur php
$.ajax ({
	cache: false,
	url: url + "index.php/photos",
	dataType: "json",
	type: "get",
	success: function(data){
		len = data.length;
		for (let i=0; i<len; i++) {
			obj = data[i];
			var lon = obj['img'].length;
			for (j=0; j<lon; j++) {
				obj['img'][j]['url'] = url + obj['img'][j]['url'];
			}
		}
		cb(data);
	},
	error: function(data){
		console.log('erreeeeeeeeur', data);
		
	}
});
};