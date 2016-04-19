var PuzzleController= function($scope, $rootScope){
	// Number of movement made
	$scope.totalMove = 0;
	
	// Winning flag. This is used to determine whether the game is already ended or not
	$scope.winningFlag = 0;
	
	var settings = {
		size : 3, // number of tiles generated for the puzzle
		gap: 1	// set gap width between tile
	};
	
	$.fn.splitPicture = function() {
		return this.each(function() {
			var $container = $(this),
				$img = $container.find('img'),
				width = $container.width(),
				height = $container.height(),
				tiles = settings.size * settings.size,
				tile = [], 
				tilesGroup;

			for ( var i = 0; i < tiles; i++ ) {
				tile.push('<div class="tile sub-tile" draggable index="' + i + '"/>');
			}
			
			tilesGroup = $( tile.join('') );

			// Hide original image and insert tiles
			$img.hide().after( tilesGroup );
			
			// Wrap each tile with 'truth' frame
			$('.sub-tile').each(function(index,value){
				$(value).wrap(function(){
					return "<div class='parent-tile tile' droppable drop='handleDrop' truth-index='" + index + "'></div>";
				})
			});

			// Refresh the new element to include draggable and droppable directives
			// Timeout is needed to ensure that the scope apply is executed in next digest
			setTimeout(function() {
				$target = $('#puzzle-picture-container');
				angular.element($target).injector().invoke(function($compile) {
					var $scope = angular.element($target).scope();
					$target.append($compile($target)($scope));
					$scope.$apply();
				});
			}, 0);
			
			// Set width, height, margin for the tiles.
			tilesGroup.css({
				width: width / settings.size - settings.gap,
				height: height / settings.size - settings.gap,
				marginBottom: settings.gap +'px',
				marginRight: settings.gap +'px',
				backgroundImage: 'url('+ $img.attr('src') +')'
			});
		  
			var offset;
			// Position adjustment for each tile
			tilesGroup.each(function(index,value){
				var pos = $(this).position();
				
				if(index === 0){
					offset = pos.left;
				}
					
				$(this).css( 'backgroundPosition', -pos.left+offset +'px '+ -pos.top +'px' );
			});
			
			// Randomise the tile position
			$('.parent-tile').each(function(index,value){
				var randomNum = Math.floor(Math.random() * tiles);
				
				// Get sub-tile of current parent-tile
				var subTile = $(value).find('.sub-tile');
				
				// Get random parent tile and get its sub-tile
				var randomSubTile = $('[truth-index="' + randomNum + '"]').find('.sub-tile');
				
				// Swap the sub-tiles
				$('[truth-index="' + randomNum + '"]').append(subTile);
				$(value).append(randomSubTile);
			});
			
			
		});
	};
	
	$('#puzzle-picture-container').splitPicture();
	
	$scope.startGame = function(){
		setTimeout(function() {
			$scope.totalMove = 0;
			$scope.winningFlag = 0;
			$scope.$apply();
		},0);
		
		$('#banner-win').addClass('hide');
		
		$('.parent-tile').each(function(index,value){
			$(value).remove();
		});
		$('#originalImg').show();
		$('#puzzle-picture-container').splitPicture();
	}
}