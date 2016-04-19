$(function() {
	var settings = {
		x : 3, // tiles in x axis
		y : 3, // tiles in y axis
		gap: 2
	};

	$.fn.splitPicture = function() {
		return this.each(function() {
			var $container = $(this),
				$img = $container.find('img'),
				width = $img.width(),
				height = $img.height(),
				tiles = settings.x * settings.y,
				tile = [], 
				tilesGroup;

			for ( var i = 0; i < tiles; i++ ) {
				tile.push('<div class="tile draggable"/>');
			}

			tilesGroup = $( tile.join('') );

			// Hide original image and insert tiles
			$img.hide().after( tilesGroup );

			// Set width, height, margin for the tiles
			tilesGroup.css({
				width: (width / settings.x) - settings.gap,
				height: (height / settings.y) - settings.gap,
				marginBottom: settings.gap +'px',
				marginRight: settings.gap +'px',
				backgroundImage: 'url('+ $img.attr('src') +')'
			});
		  
			// Position adjustment for each tile
			tilesGroup.each(function(index,value){
				var pos = $(value).position();
				$(this).css( 'backgroundPosition', -pos.left +'px '+ -pos.top +'px' );
			});

		});
	};
	
	$('#puzzle-picture-container').splitPicture();
	
	$( ".draggable" ).each(function(index,value){
		$(value).draggable();
	});
});