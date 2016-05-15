'use strict';
let Cart = require('./cart.js');
let QartUi = Cart.QartUi;
let Qart = Cart.Qart;
let Galerie = require('./slider.js');

//Seule fonction exécutée au début
function main(){
	Galerie.init();
	QartUi.init();
}

main();

