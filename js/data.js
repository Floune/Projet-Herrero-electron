let $ = require('jquery');
let url = "http://192.168.1.24/simplon/serverHerrero/";
module.exports = function(cb){

//requete pour recevoir les photos minifiées depuis le serveur php
$.ajax ({
	cache: false,
	url: url + "index.php/photos",
	dataType: "json",
	type: "get",
	success: function(data){
		data.map(function(d){
			d.url = url +  d.url;
		})
		cb(data);
	},
	error: function(data){
		console.log(data);
	}
});
};