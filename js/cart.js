$ = require('jquery');
let basket = {data:[]};

let Qart = {

	add: function(chose){
		basket.data.push(chose);
	},

	remove: function(bidule){
		let tab = basket.data;
		gru = tab.findIndex(bidule);
	},

	get: function(nodeId) {
		nodeId = nodeId || false;
		if (nodeId)
		{
			return basket.data[nodeId];
		}
		return basket.data;
	}
}

let QartUi = {

	update(){
		var lon = basket.data.length;
		for (var i = 0; i < lon; i++) {
			var achat = basket.data[i];
			achat = JSON.stringify(achat);
			console.log(achat);
			$('.list_article').append('<li>' + achat +'</li>');	
		}

	},

	watchers(){
		$('.panier_ajout').on('click', function(){

		});		
	}
}


Qart.add({url:'img/IMG_0118.JPG'});
Qart.add({url:'img/IMG_0965.JPG'});
Qart.add({url:'img/IMG_0915.JPG'});
Qart.add({url:'img/IMG_0726.JPG'});
QartUi.update();

console.log(basket);

