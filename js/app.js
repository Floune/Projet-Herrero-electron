'use strict';
let Cart = require('./cart.js');
let QartUi = Cart.QartUi;
let Qart = Cart.Qart;
let _config = require('./config.js');
let Galerie = require('./slider.js');

function bootstrap(){
	$('body').on('click', '.envoi_config', function(e){
		e.preventDefault();
		let url = $('#config_url').val();
		let photo_accueil = $('#config_accueil').val();
		let texte_accueil = $('#config_texte').val();
		_config.set(url, photo_accueil, texte_accueil);
		$('.container_config').hide();
		$('.overlaid').show();
	});
	main();
}

//Seule fonction exécutée au début
function main(){
	Galerie.init();
	QartUi.init();
}


bootstrap();
