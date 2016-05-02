let Mustache  =require('mustache');
let $  =require('jquery');
var template = $('#template').html();
Mustache.parse(template);
let adresses = [];

let genGallery = function (data, node, tpl){
	console.log('generation galerie');
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


module.exports = {
	genGallery
}



