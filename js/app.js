'use strict';
let Cart = require('./cart.js');
let QartUi = Cart.QartUi;
let Qart = Cart.Qart;
let Galerie = require('./slider.js');


function test(){

}

function main(){
	Galerie.init();
	QartUi.init();
	test();
}

main();

