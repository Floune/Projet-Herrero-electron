let $ = require('jquery');
let _utils = require('./utils.js');
let genGallery = _utils.genGallery;
let basket = {data:[]};
let identifiant = "";
let noty = require('noty');
let timeoutID;

//objet cart
let Qart = {

	retouraudebut: function() {
		timeoutID = window.setTimeout(Qart.again, 10000);
	},

	add: function(chose){
		basket.data.push(chose);
		QartUi.update();
		flashMess.add();
	},

	remove: function(bidule){
		basket.data.splice(bidule, 1);
		QartUi.update();
		flashMess.remove();
	},

	clear: function(){
		basket = {data:[]};
		$('.last_step').hide();
		QartUi.update(); 
		flashMess.clear();
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
		identifiant = $('.name').val();
		if (basket.data.length === 0 || identifiant === "") {
			flashMess.send();
			return;
		}
		let tiens = JSON.stringify(basket);
		$.ajax ({
			url: "http://192.168.1.24/simplon/serverHerrero/index.php",
			dataType: "text",
			data: {'tiens':tiens, 'identifiant':identifiant}, //envoi du panier au serveur php
			type: "POST",
			success: function(data){
				console.log(data);
			}
		});
		Qart.clear();
		Qart.retouraudebut();

	},

	startu: function(){
		$('.overlaid').hide();
	},

	again: function(){
		$('#basket').hide();
		$('.last_step').hide();
		$('.overlaid').show();
	},

	fin: function(){
		$('.last_step').show();
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

		$('body').on('click','.bouton_panier', function(){
			this.update();
			$('#basket').show();
		}.bind(this));

		$('body').on('click', '#clear', function(){
			Qart.clear();
		});

		$('#nom').on('submit', function(e){
			e.preventDefault();
			Qart.envoi();
		});

		$('body').on('click', '.demarrer', function(){
			Qart.startu();
		});

		$('body').on('click', '.form_envoi', function(){
			Qart.fin();
		});
	}
}

let flashMess = {

	add: function(mess) {
		$('.message').show();
		$('.message').html("<div class='ui floating message'>Photo ajoutée au panier</div>");
		flashMess.hide();
	}, 


	remove: function(mess) {
		$('.message').show();
		$('.message').html("<div class='ui success message'>Photo retirée du panier</div>");
		flashMess.hide();
	},

	clear: function(mess) {
		$('.message').show();
		$('.message').html("<div class='ui success message'>Panier vidé</div>");
		flashMess.hide();
	},

	send: function(mess) {
		$('.message').show();
		$('.message').html("<div class='ui success message'>Veuillez vous assurer que votre panier n\'est pas vide et que vous avez renseigné votre nom</div>");
		flashMess.hide();
	},

	hide: function() {
		setTimeout(function(){$(".message").hide();}, 2500);
	}
}

module.exports = {Qart, QartUi};

