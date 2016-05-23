let Mustache  =require('mustache');
let $  =require('jquery');
var template = $('#template').html();
Mustache.parse(template);


//Génère la galerie parent
let genParentGallery = function(data, node, tpl) {
	let html = data.map(function(gal, i){
		gal.k = i;
		gal.cover = gal && gal.img && gal.img[0] && gal.img[0].url || '';
		return Mustache.render(tpl, gal);
	});	
	$(node).html(html);

};

// fonction utilisée pour générer les galerie 
let genGallery = function (data, node, tpl, title){
	tpl = tpl || template;
	data = data || [];
	let len = data.length;
	$node = $(node);
	$(node).html('');
	for (let i=0; i<len; i++) {
		if (title) {
			data[i].title = title;
		}
		data[i].k = i;
		var rendered = Mustache.render(tpl, data[i]);
		$node.append(rendered);
	}


};


module.exports = {
	genGallery,
	genParentGallery
}




