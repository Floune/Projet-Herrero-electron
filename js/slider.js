(function(){

	'use strict';
	let $  =require('jquery');
	let gallery = require('./data.js');
	let _utils = require('./utils.js');
	let _config = require('./config.js');
	let config  = _config.get();
	let genGallery = _utils.genGallery;
	let genParentGallery = _utils.genParentGallery;
	let par = [];
	let foo;
	let bar;
	let oo;
	

//objet galerie
let Galerie = {


	init(){

		this.watchers();
		this.cache();
		//génère galerie parent
		this.retourParentGallery();
	},

	retourParentGallery() {
		gallery(function(data){
			this.data = data;
			genParentGallery(data, $('.main'), $('#tplParent').html());
		}.bind(this));
	},

	//génère la galerie
	genere(id){
		genGallery(this.data[id]['img'], $('.main'), $('#template').html());
	},

	//Fermer la photo plein écran
	cache(){
		$('.full').removeClass('tourne');		
		$('.full').hide();
		$('.last_step').hide();
		$('#basket').hide();
	},

	//affiche la photo en plein écran
	affiche(tof){
		
		$(".full").css('background-image', tof);
		$('.full').show();	
	},

		//cache l'overlay
	startu: function(){
		$('.overlaid').hide();
		this.retourParentGallery();
	},

	watchers(){

		$('body').on('click', '.demarrer', function(){
		Galerie.startu();
		});

		$('body').on('click','.affichage', function(){
			Galerie.affiche($(this).css('background-image'));
		});
		$('body').on('click','.ferme', function(){
			Galerie.cache();
		});
		$('body').on('click','.v', function(){
			$('.full').addClass('tourne');
		});
		$('body').on('click', '.voir', function(){
			let indice = $(this).attr('indice');		
			Galerie.genere(indice);
		});
		$('body').on('click', '.bouton_retour_parent', function(){
			Galerie.retourParentGallery();
		});


		// bouton pour consoleloguer ce qu'on veut
		$('body').on('click','.recup', function(){

			console.log(config);		
		});

	}
}


module.exports = Galerie;
})();