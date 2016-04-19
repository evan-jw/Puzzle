var PuzzleController= function($scope, $rootScope){
	//$('#puzzle-picture').html('<span><b>TEST</b></span>');
	
	$scope.totalMove = 0;
	
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
				tile.push('<div class="tile sub-tile" draggable ng-click="testClick()" index="' + i + '"/>');
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

			setTimeout(function() {
				$target = $('#puzzle-picture-container');
				angular.element($target).injector().invoke(function($compile) {
					var $scope = angular.element($target).scope();
					$target.append($compile($target)($scope));
					// Refresh the watch expressions in the new element
					$scope.$apply();
				});
			}, 0);
			
			// Set width, height, margin for the tiles. 
			// Math.floor is used to avoid small gaps (during dragging & snapping movement)
			tilesGroup.css({
				width: Math.floor((width / settings.x)) - settings.gap,
				height: Math.floor((height / settings.y)) - settings.gap,
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
			$scope.$apply();
		},0);
		
		$('.parent-tile').each(function(index,value){
			$(value).remove();
		});
		$('#originalImg').show();
		$('#puzzle-picture-container').splitPicture();
	}
}