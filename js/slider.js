var $ = require('jquery');

$(document).ready(function() {
	$(".full").hide();

$('.img').on('click', function(){
	var url = $(this).css('background-image');
	var x = url.lastIndexOf("/");
	console.log(x);
	var img = url.slice(x + 1);
	console.log(img);


	$(".full").css('background-image', 'url("img/'+img);
	$('.full').fadeIn(800);
});

$('.ferme').on('click', function(){
	$('.full').fadeOut();
});

$('.v').on('click', function(){
	$('.full').addClass('tourne');

});

});

