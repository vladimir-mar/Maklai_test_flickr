// Key: 18275b92928a5f98a6d97ab2adb7a81c
// Secret: c6feb0d534c7df14

let flickrSearchObj = {
	globalObjImg: {
		mainObjImg: null,
		stepAmountImg: 10,
		showImg: null
	},
	SearchProcessing: function(){
		let valSearch = $('#search-input').val();
		if ( valSearch ) {
			let urlData = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=18275b92928a5f98a6d97ab2adb7a81c&tags='+valSearch+'&per_page=500&format=json&nojsoncallback=1';
			$.getJSON(urlData, function(data){
				if (data.stat === 'ok') {
					console.log(data.photos.photo);
					flickrSearchObj.globalObjImg.mainObjImg = data.photos.photo;
					flickrSearchObj.globalObjImg.showImg = 0;
					flickrSearchObj.CompileContent();
				} else {
					flickrSearchObj.InsertContent(data.message);
				}
			}).fail(function(){
				flickrSearchObj.InsertContent('Error. Try again!');
			});
		} else {
			flickrSearchObj.InsertContent('');
			if ( $('#show-more').is(':visible') ) {
				$('#show-more').hide();
			}
		}
	},
	CompileContent: function(){
		let returnObj = flickrSearchObj.globalObjImg.mainObjImg,
		contObj = '';
		flickrSearchObj.globalObjImg.showImg += flickrSearchObj.globalObjImg.stepAmountImg;
		for (let i = 0; i < flickrSearchObj.globalObjImg.showImg; i++) {
			let urlLoc = 'https://farm'+returnObj[i].farm+'.staticflickr.com/'+returnObj[i].server+'/'+returnObj[i].id+'_'+returnObj[i].secret+'.jpg',
				titleLoc = returnObj[i].title;
	  		contObj += '<img class="img-cont__image" src="'+urlLoc+'" alt="'+titleLoc+'" title="'+titleLoc+'">';
		}
		flickrSearchObj.InsertContent(contObj);
		if ( $('#show-more').is(':hidden') ) {
			$('#show-more').show();
		}
	},
	InsertContent: function(cont){
		$('#img-cont').html(cont);
	}
}

// event handling...
$(document).ready( function(){
	$('#search-input').keydown(function(event){
		if(event.keyCode == 13){
			flickrSearchObj.SearchProcessing();
    	}
	});
	$('#search-button').click(function(){
		flickrSearchObj.SearchProcessing();
	});
	$(document).on('click', '#show-more', function(){
		flickrSearchObj.CompileContent();
	});
});