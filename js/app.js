'use strict';
let Cart = require('./cart.js');
let QartUi = Cart.QartUi;
let Qart = Cart.Qart;
let Galerie = require('./slider.js');


function test(){

	Qart.add({url:'img/IMG_0118.JPG'});
	Qart.add({url:'img/IMG_0965.JPG'});
	Qart.add({url:'img/IMG_0915.JPG'});
	Qart.add({url:'img/IMG_0726.JPG'});
	QartUi.update();
}

function main(){
	Galerie.init();
	QartUi.init();
	test();
}

main();

