let $ = require('jquery');
let toastr = require('toastr');
let _utils = require('./utils.js');
let genGallery = _utils.genGallery;
let basket = {data:[]};
let identifiant = "";
let noty = require('noty');
let timeoutID;
let far;
let boo;
let bar;
let unicId;
let identifiants = ['Pointes','Giselle','Don quichotte','Tutu','Tango','Swing','Salsa','Menuet','Sarabande','Java','Ballet','Béjar','Coppélia','SimplonMIP','Ballerine','Lac des cygnes','Noureev','Arabesque','Mazurka','Petit rat','Valse','Guillem','Onéguine','Carmen','Bolero']
let longueur = identifiants.length;
let url = "http://192.168.1.61/phpHerrero/";
let dataBasket = {};

toastr.options.preventDuplicates = true;
toastr.options.timeOut = 2000;
toastr.options.closeDuration = 0;
toastr.options.showMethod = 'show';
toastr.options.hideMethod = 'hide';
toastr.options.closeMethod = 'hide';


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

//objet cart
let Qart = {
	
	//Renvoie à la page d'accueil apres 10 secondes
	retouraudebut: function() {
		t = window.setTimeout(Qart.again, 10000);
	},

	//Ajoute l'item au panier
	add: function(chose){
		basket.data.push(chose);
		QartUi.update();
		toastr.success('Item ajouté au panier');
	},

	//enlève un item du panier
	remove: function(bidule){
		basket.data.splice(bidule, 1);
		QartUi.update();
		toastr.info('Item supprimé panier');
	},

	//vide le panier
	clear: function(){
		basket = {data:[]};
		$('.last_step').hide();
		QartUi.update(); 
		toastr.info('Panier vidé');
	},

	//récupère un item du panier
	get: function(nodeId) {
		nodeId = nodeId || false;
		if (nodeId)
		{
			return basket.data[nodeId];
		}
		return basket.data;
	},

	//envoie le panier au serveur php et reviens au début
	envoi: function() {
		// s
		console.log(identifiant);
		if (basket.data.length === 0) {
			toastr.warning('Votre panier est vide !');
			return;
		}
		let tiens = JSON.stringify(basket);
		$.ajax ({
			url: url + "/index.php/commandes/create",
			dataType: "text",
			data: {'tiens':tiens, 'identifiant':unicId}, //envoi du panier au serveur php
			type: "POST",
			success: function(data){
			},
			error: function(data){
			console.log(data);
			}
		});
		Qart.clear();
		$('.ecran_fin').show();
		Qart.retouraudebut();

	},

	mdp: function() {
		let arbitraire = getRandomInt(1, 100);
		let choix = getRandomInt(1, longueur);
		unicId = identifiants[choix];
		unicId += " ";
		unicId += arbitraire;
		return unicId;
	},

	//cache l'overlay
	startu: function(){
		$('.overlaid').hide();
	},

	//retour au debut
	again: function(){
		$('#basket').hide();
		$('.ecran_fin').hide();
		$('.last_step').hide();
		$('.overlaid').show();
	},

	//afiche la div de confirmation de commande
	fin: function(){
		let identifiant = Qart.mdp();
		$('.last_step').show();
		$('.identification').html("Voici votre identifiant de commande : " + identifiant);
	}
}


//objet panierUI
let QartUi = {

	init(){
		this.watchers();
	},

	//génère la galerie du panier
	update(){
		genGallery(basket.data, '.list_article', $('#tpl_product').html());
		$('.nb_article').html(basket.data.length);
	},

	seekCB(parent){
		boo = parent[2];
		bar = $(boo).children();
		foo = bar[0];
		len = $(foo).children(); //On va chercher la checkbox de la carte cliquée(un peu moche)
		sek = len[0];
		set = $(sek).children();
		return set;
	},

	watchers(){
		$('body').on('click', '.ajout', function(e){
			e.preventDefault();
			far = ($(this).parents());
			// QartUi.seekCB(far);
			// $(set).prop('checked',true);
			Qart.add({url:$(this).attr("photo")});
		});	

		$('body').on('click', '.enleve', function(){
			far = ($(this).parents());
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

		$('body').on('click','.finaliser', function(e){
			e.preventDefault();
			Qart.envoi();
		});

		$('body').on('click', '.demarrer', function(){
			Qart.startu();
		});

		$('body').on('click', '.form_envoi', function(){
			Qart.fin();
		});

		$('body').on('click', '.accueil', function(){
			clearTimeout(t);
			Qart.again();
		});

		$('body').on('click', '.bouton_reinit', function(){
			Qart.clear();
			$('.ecran_fin').show();
			Qart.retouraudebut();
		});
	}
}

let flashMess = {

	add: function(mess) {
		if (typeof o != "undefined") {
			window.clearTimeout(o);
		} 
		$('.message').show();
		$('.message').html("<div class='ui succes message'>Photo ajoutée au panier</div>");
		flashMess.wait();
	}, 


	remove: function(mess) {
		if (typeof o != "undefined") {
			window.clearTimeout(o);
		} 
		$('.message').show();
		$('.message').html("<div class='ui success message'>Photo retirée du panier</div>");
		flashMess.wait();
	},

	clear: function(mess) {
		if (typeof o != "undefined") {
			window.clearTimeout(o);
		} 
		$('.message').show();
		$('.message').html("<div class='ui success message'>Panier vidé</div>");
		flashMess.wait();
	},

	send: function(mess) {
		if (typeof o != "undefined") {
			window.clearTimeout(o);
		} 
		$('.message').show();
		$('.message').html("<div class='ui success message'>Veuillez vous assurer que votre panier n\'est pas vide</div>");
		flashMess.wait();
	},

	wait: function() {
		let o = window.setTimeout(flashMess.hide, 2000);
	},

	hide: function(){
		$('.message').hide();
	}
}

module.exports = {Qart, QartUi};

