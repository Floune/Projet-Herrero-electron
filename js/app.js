'use strict';
let Cart = require('./cart.js');
let QartUi = Cart.QartUi;
let Qart = Cart.Qart;
let Galerie = require('./slider.js');


function test(){

	// Qart.add('bonjour hayates');
	// QartUi.update();
}

function main(){
	Galerie.init();
	QartUi.init();
	test();
}

main();

