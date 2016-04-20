var $ = require('jquery');
var Mustache = require('mustache');
var template = $('#template').html();
Mustache.parse(template);

$(document).ready(function() {

//on cache la div plein écran
$(".full").hide();

let Galerie = {

	cache(){
		//Fermer la photo plein écran		
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
	}
}


$('.img').on('click', function(){
	Galerie.affiche($(this).css('background-image'));
});

$('.ferme').on('click', function(){
	Galerie.cache();
});

$('.bouton_panier').on('click', function(){
	$('#basket').fadeIn();
});

});

var gallery = [
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0118.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0201.JPG'},
{url:'img/IMG_0726.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0965.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0117.JPG'},
{url:'img/IMG_0915.JPG'},];

function genGallery(data, node){
	data = data || [];
	let len = data.length;
	for (let i=0; i<len; i++) {
		var rendered = Mustache.render(template, data[i])
		$(node).append(rendered);
	}
}

genGallery(gallery, '.main');
