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
	},

	envoi: function() {
		$.post("http://192.168.1.16/phpHerrero/", basket, function(data){
			console.log(data);
		});
	}
}

let QartUi = {

	init(){
		this.watchers();
	},

	update(){
		genGallery(basket.data, '.list_article', $('#tpl_product').html());
		$('.nb_article').html(basket.data.length);
	},

	watchers(){
		$('body').on('click', '.ajout', function(e){
			e.preventDefault();
			Qart.add({url:$(this).attr("photo")});
		});	

		$('body').on('click', '.enleve', function(){
			let suppr = $(this).attr('indice');
			Qart.remove(suppr);
		});

		$('.bouton_panier').on('click', function(){
			this.update();
			$('#basket').fadeIn();
		}.bind(this));

		$('body').on('click', '#clear', function(){
			Qart.clear();
		});

		$('body').on('click', '.finaliser', function(){
			Qart.envoi();
		});
	}
}

module.exports = {Qart, QartUi};

