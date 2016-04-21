let $ = require('jquery');
let _utils = require('./utils.js');
let genGallery = _utils.genGallery;
let basket = {data:[]};

let Qart = {

	add: function(chose){
		basket.data.push(chose);
		QartUi.update();
	},

	remove: function(bidule){
		basket.data.splice(bidule, 1);
		QartUi.update();
	},

	clear: function(){
		basket = {data:[]};
		QartUi.update(); 
	},

	get: function(nodeId) {
		nodeId = nodeId || false;
		if (nodeId)
		{
			return basket.data[nodeId];
		}
		return basket.data;
	}
}

let QartUi = {

	init(){
		this.watchers();
	},

	update(){
		genGallery(basket.data, '.list_article', $('#tpl_product').html());
	},

	watchers(){
		$('body').on('click', '.ajout', function(e){
			e.preventDefault();
			console.log($(this).attr("photo"));
			Qart.add({url:$(this).attr("photo")});
		});	

		$('body').on('click', '.enleve', function(){
			let suppr = $(this).attr('indice');
			console.log(suppr);
			Qart.remove(suppr);
		});

		$('.bouton_panier').on('click', function(){
			this.update();
			$('#basket').fadeIn();
		}.bind(this));

		$('body').on('click', '#clear', function(){
			console.log('clear appuyé !!!!!!!!');
			Qart.clear();
		});
	}
}

module.exports = {Qart, QartUi};

