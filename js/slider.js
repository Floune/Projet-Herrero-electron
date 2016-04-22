(function(){

'use strict';
let $  =require('jquery');
 
let gallery = require('./data.js');
let _utils = require('./utils.js');
let genGallery = _utils.genGallery;


let Galerie = {

	init(){
		this.watchers();
		this.cache();
		genGallery(gallery, '.main');
	},

	cache(){
		//Fermer la photo plein écran
		$('.full').removeClass('tourne');		
		$('.full').fadeOut();
		$('#basket').fadeOut();
	},

	affiche(tof){
		//On récupère l'attr. css bckgrd img du thumbnail et on l'applique à la div full qu'on affiche		
		var url = tof;
		var x = url.lastIndexOf("/");
		var img = url.slice(x + 1);
		$(".full").css('background-image', 'url("img/'+img);
		$('.full').fadeIn(800);	
	},

	watchers(){
		$('body').on('click','.img', function(){
			Galerie.affiche($(this).css('background-image'));
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