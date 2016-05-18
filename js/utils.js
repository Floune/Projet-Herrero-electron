let Mustache  =require('mustache');
let $  =require('jquery');
var template = $('#template').html();
Mustache.parse(template);
let users = [];



let genParentGallery = function(data, node, tpl) {
	data.map(function(gal, i){

	})
};

// fonction utilisée pour générer les galerie 
let genGallery = function (data, node, tpl){
	tpl = tpl || template;
	data = data || [];
	let len = data.length;
	$(node).html('');
	for (let i=0; i<len; i++) {
		data[i].k = i;
		var rendered = Mustache.render(tpl, data[i]);
		$(node).append(rendered);
	}
};


module.exports = {
	genGallery,
	genParentGallery
}




