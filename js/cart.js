let $ = require('jquery');
let _utils = require('./utils.js');
let genGallery = _utils.genGallery;
let basket = {data:[]};

let Qart = {

	alerte: function(){
		$('.cachou').fadeIn(2000);
		$('.cachou').fadeOut(2000);
	},

	add: function(chose){
		basket.data.push(chose);
		QartUi.update();
		Qart.alerte();
	},

	remove: function(bidule){
		basket.data.splice(bidule, 1);
		QartUi.update();
	},

	clear: function(){
		basket = {data:[]};
		QartUi.update(); 
	},

	get: function(nodeId) {
		nodeId = nodeId || false;
		if (nodeId)
		{
			return basket.data[nodeId];
		}
		return basket.data;
	},

	envoi: function() {
		let tiens = JSON.stringify(basket);
		$.ajax ({
			url: "http://192.168.1.16/phpHerrero/server.php",
			dataType: "text",
			data: {'tiens':tiens},
			type: "POST",
			success: function(data){
				console.log(data);
			}
		})
		Qart.clear();
	}
}

	let QartUi = {

		init(){
			this.watchers();
		},

		update(){
			genGallery(basket.data, '.list_article', $('#tpl_product').html());
			$('.nb_article').html(basket.data.length);
		},

		watchers(){
			$('body').on('click', '.ajout', function(e){
				e.preventDefault();
				Qart.add({url:$(this).attr("photo")});
			});	

			$('body').on('click', '.enleve', function(){
				let suppr = $(this).attr('indice');
				Qart.remove(suppr);
			});

			$('.bouton_panier').on('click', function(){
				this.update();
				$('#basket').fadeIn();
			}.bind(this));

			$('body').on('click', '#clear', function(){
				Qart.clear();
			});

			$('body').on('click', '.finaliser', function(){
				Qart.envoi();
			});
		}
	}

	module.exports = {Qart, QartUi};

