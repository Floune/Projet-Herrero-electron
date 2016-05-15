(function(){

'use strict';
let $  =require('jquery');
 
let gallery = require('./data.js');
let _utils = require('./utils.js');
let genGallery = _utils.genGallery;
let par = [];
let foo;
let bar;
let oo;

//objet galerie
let Galerie = {

	init(){
		this.watchers();
		this.cache();
		gallery(function(data){
			genGallery(data, '.main');
		});
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
		console.log(tof);
		$(".full").css('background-image', tof);
		$('.full').show();	
	},

	watchers(){
		$('body').on('click','.grand', function(){
			par = ($(this).parents());
			foo = par[2];
			bar = $(foo).children().children();
			oo = bar[0];
			Galerie.affiche($(oo).css('background-image'));
		});
		$('body').on('click','.ferme', function(){
			Galerie.cache();
		});
		$('body').on('click','.v', function(){
			$('.full').addClass('tourne');
		});
	}
}


module.exports = Galerie;
})();