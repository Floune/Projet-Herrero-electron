let $ = require('jquery');
let toastr = require('toastr');
let _utils = require('./utils.js');
let _config = require('./config.js');
let _galerie = require('./slider.js');
let retourParentGallery = _galerie.retourParentGallery;
let genGallery = _utils.genGallery;
let basket = {data:[]};
let identifiant = "";
let timeoutID;
let far;
let boo;
let bar;
let unicId;
let identifiants = ['Pointes','Giselle','Hervé','Don quichotte','Tutu','Tango','Swing','Salsa','Menuet','Sarabande','Java','Ballet','Béjar','Coppélia','SimplonMIP','Ballerine','Lac des cygnes','Noureev','Arabesque','Mazurka','Halle aux grains','Petit rat','Valse','','Guillem','Onéguine','Carmen','Bolero']
let longueur = identifiants.length;
let dataBasket = {};
let prix_total = 0;
let config  = _config.get();


toastr.options.preventDuplicates = false;
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
	add: function(url, type, prix){
		
		basket.data.push(url);
		let i = basket.data.length - 1;
		basket.data[i].format = type;
		basket.data[i].prix = prix;
		prix_total += prix;
		console.log(prix_total);
		QartUi.update(prix_total);
		toastr.success('Item ajouté au panier');
	},

	//enlève un item du panier
	remove: function(bidule){
		let sub = basket.data[bidule].prix;
		prix_total -= sub;
		console.log(prix_total);
		basket.data.splice(bidule, 1);
		QartUi.update(prix_total);
		toastr.info('Item supprimé panier');
	},

	//vide le panier
	clear: function(){
		basket = {data:[]};
		prix_total = 0;
		$('.last_step').hide();
		QartUi.update(prix_total); 
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
		
		console.log(identifiant);
		if (basket.data.length === 0) {
			toastr.warning('Votre panier est vide !');
			return;
		}
		let tiens = JSON.stringify(basket);
		let url = "http://" + config.url + "/phpHerrero/";
		console.log(prix_total);
		$.ajax ({
			url: url + "/index.php/commandes/create",
			dataType: "text",
			data: {'tiens':tiens, 'identifiant':unicId, 'prix':prix_total}, //envoi du panier au serveur php
			type: "POST",
			success: function(data){
				console.log(data);
			},
			error: function(data){
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
		$('.identification').html("Notez bien votre identifiant : " + identifiant);
	}
}


//objet panierUI
let QartUi = {

	init(){
		let text_config = config.text;
		$('.titre_accueil').html(text_config);
		// $('.overlaid').css('background-image', )
		this.watchers();
	},



	//génère la galerie du panier et les infos panier
	update(prix_total){
		genGallery(basket.data, '.list_article', $('#tpl_product').html());
		$('.bouton_panier').html(basket.data.length + '  Articles | Total: ' + prix_total + '€');
		$('.nb_article').html(basket.data.length + ' Articles');
		$('.prix').html(prix_total + '€');
		console.log(basket);

	},

	watchers(){
		$('body').on('click', '.ajout', function(e){
			e.preventDefault();
			let format = $(this).attr('format');
			let prix = parseInt($(this).attr('prix'));
			Qart.add({url:$(this).attr("photo")}, format, prix);
		});	

		$('body').on('click', '.enleve', function(){
			let suppr = $(this).attr('indice');
			Qart.remove(suppr);
		});

		$('body').on('click','.bouton_panier', function(){
			this.update(prix_total);
			$('#basket').show();
		}.bind(this));

		$('body').on('click', '#clear', function(){
			Qart.clear();
		});

		$('body').on('click','.finaliser', function(e){
			e.preventDefault();
			Qart.envoi();
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

// let flashMess = {

// 	add: function(mess) {
// 		if (typeof o != "undefined") {
// 			window.clearTimeout(o);
// 		} 
// 		$('.message').show();
// 		$('.message').html("<div class='ui succes message'>Photo ajoutée au panier</div>");
// 		flashMess.wait();
// 	}, 


// 	remove: function(mess) {
// 		if (typeof o != "undefined") {
// 			window.clearTimeout(o);
// 		} 
// 		$('.message').show();
// 		$('.message').html("<div class='ui success message'>Photo retirée du panier</div>");
// 		flashMess.wait();
// 	},

// 	clear: function(mess) {
// 		if (typeof o != "undefined") {
// 			window.clearTimeout(o);
// 		} 
// 		$('.message').show();
// 		$('.message').html("<div class='ui success message'>Panier vidé</div>");
// 		flashMess.wait();
// 	},

// 	send: function(mess) {
// 		if (typeof o != "undefined") {
// 			window.clearTimeout(o);
// 		} 
// 		$('.message').show();
// 		$('.message').html("<div class='ui success message'>Veuillez vous assurer que votre panier n\'est pas vide</div>");
// 		flashMess.wait();
// 	},

// 	wait: function() {
// 		let o = window.setTimeout(flashMess.hide, 2000);
// 	},

// 	hide: function(){
// 		$('.message').hide();
// 	}
// }

module.exports = {Qart, QartUi};

