let $ = require('jquery');
let _utils = require('./utils.js');
let genGallery = _utils.genGallery;
let basket = {data:[]};
let noty = require('noty');
let timeoutID;

let Qart = {

	retouraudebut: function() {
		timeoutID = window.setTimeout(Qart.again, 20000);
	},

	add: function(chose){
		basket.data.push(chose);
		QartUi.update();
		noty({
			killer: true,
			text: 'Votre article a été ajouté',
			timeout: true,
			animation: {
        		open: {height: 'toggle'}, // jQuery animate function property object
        		close: {height: 'toggle'}, // jQuery animate function property object
        		easing: 'swing', // easing
        		speed: 1000 // opening & closing animation speed
    		}
		});
	},

	remove: function(bidule){
		basket.data.splice(bidule, 1);
		QartUi.update();
		noty({
			killer: true,
			text: 'Article supprimé !',
			timeout: true,
			animation: {
        		open: {height: 'toggle'}, // jQuery animate function property object
        		close: {height: 'toggle'}, // jQuery animate function property object
        		easing: 'swing', // easing
        		speed: 1000 // opening & closing animation speed
    		}
		});
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
		if (basket.data.length != 0) {
		let tiens = JSON.stringify(basket);
		$.ajax ({
			url: "http://192.168.1.16/phpHerrero/server.php",
			dataType: "text",
			data: {'tiens':tiens},
			type: "POST",
			success: function(data){
				console.log(data);
			}
		});
		Qart.clear();
		noty({
			text: 'Commande validée, retour à l\'accueil dans 20 secondes',
			killer: true
		});
		Qart.retouraudebut();
		}else{
			noty({
			killer: true,
			text: 'Votre panier est vide !',
			timeout: true,
			animation: {
        		open: {height: 'toggle'}, // jQuery animate function property object
        		close: {height: 'toggle'}, // jQuery animate function property object
        		easing: 'swing', // easing
        		speed: 1000 // opening & closing animation speed
    		}
		});
		}
	},

	startu: function(){
		$('.overlaid').fadeOut(700);
	},

	again: function(){
		$('#basket').hide();
		$('.overlaid').show();
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

		$('body').on('click', '.demarrer', function(){
			Qart.startu();
		});
	}
}



module.exports = {Qart, QartUi};

