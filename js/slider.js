var $ = require('jquery');

$(document).ready(function() {
	$(".full").hide();

$('.img').on('click', function(){
	var url = $(this).css('background-image');
	var img = url.slice(58, 74);

	console.log(img);


	$(".full").css('background-image', 'url('+img+')')
	$('.full').fadeIn(800);
});

$('.ferme').on('click', function(){
	$('.full').fadeOut();
});


});