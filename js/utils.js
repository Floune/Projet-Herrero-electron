let Mustache  =require('mustache');
let $  =require('jquery');
var template = $('#template').html();
Mustache.parse(template);

let genGallery = function (data, node, tpl){
	tpl = tpl || template;
	data = data || [];
	let len = data.length;
	$(node).html('');
	for (let i=0; i<len; i++) {
		data[i].k = i;
		var rendered = Mustache.render(tpl, data[i])
		$(node).append(rendered);
	}
};

$.ajax ({
	url: "http://192.168.1.24/phpHerrero/index.php/photos",
	dataType: "text",
	type: "POST",
	success: function(data){
		console.log(data);
	}
});


module.exports = {
	genGallery
}