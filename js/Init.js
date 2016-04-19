$(function() {
	var settings = {
		x : 3, // tiles in x axis
		y : 3, // tiles in y axis
		gap: 1
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
				tile.push('<div class="tile sub-tile draggable" index="' + i + '"/>');
			}
			
			tilesGroup = $( tile.join('') );

			// Hide original image and insert tiles
			$img.hide().after( tilesGroup );
			
			// Wrap each tile with 'truth' frame
			$('.sub-tile').each(function(index,value){
				$(value).wrap(function(){
					return "<div class='parent-tile tile' truth-index='" + index + "'></div>";
				})
			});

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
			
			// Randomise the tile position
			$('.parent-tile').each(function(index,value){
				var randomNum = Math.floor(Math.random() * tiles);
				
				// Get sub-tile of current parent-tile
				var subTile = $(value).find('.sub-tile');
				
				// Get random parent tile and get its sub-tile
				var subTileSwap = $('[truth-index="' + randomNum + '"]').find('.sub-tile');
				
				// Swap the sub-tiles
				$('[truth-index="' + randomNum + '"]').append(subTile);
				$(value).append(subTileSwap);
			});
		});
	};
	
	$('#puzzle-picture-container').splitPicture();
	
	$( ".draggable" ).each(function(index,value){
		$(value).draggable({ containment: "#puzzle-picture-container", scroll: false });
	});
});