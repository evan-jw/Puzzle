var app = angular.module('puzzle-app',[]);

/* Was trying to use directive but unfortunately, there is a problem with cross-origin request, 
 * which is caused by calling a file directly instead of calling from http protocol. 
 * This can be overcome by deploying the application to a web server, however it is not going to be  
 * practical when the user try to run the application directly from the html file.
 */
//app.directive('puzzleSection', [PuzzleSection]);

// Directive for dragging
app.directive('draggable', [function() {
	return function(scope, element) {
		// get the element
		var el = element[0];
		el.draggable = true;
		el.addEventListener(
			'dragstart',
			function(e) {
				e.dataTransfer.effectAllowed = 'move';
				var originIndex = $(e.currentTarget).parent().attr('truth-index');
				e.dataTransfer.setData('Text', originIndex);
				this.classList.add('drag');
				return false;
			},
			false
		);

		el.addEventListener(
			'dragend',
			function(e) {
				this.classList.remove('drag');
				return false;
			},
			false
		);
	}
}]);

// Directive for dropping
app.directive('droppable', ['$timeout', function($timeout) {
	return {
		link: function(scope, element, attrs) {
			// get the element
			var el = element[0];
		  
			el.addEventListener(
				'dragover',
				function(e) {
					e.dataTransfer.dropEffect = 'move';
					// allows us to drop
					if (e.preventDefault) e.preventDefault();
					$(this).find('.sub-tile').addClass('over');
					return false;
				},
				false
			);
		  
			el.addEventListener(
				'dragenter',
				function(e) {
				    $(this).find('.sub-tile').addClass('over');
				    return false;
				},
				false
			);

			el.addEventListener(
				'dragleave',
				function(e) {
					$(this).find('.sub-tile').removeClass('over');
				    return false;
				},
				false
			);
		  
			el.addEventListener(
				'drop',
				function(e) {
					$(this).find('.sub-tile').removeClass('over');
					
					if(scope.winningFlag === 1){
						// Player already won the game, disable drop function
						return false;
					}
					var originTruthIndex = e.dataTransfer.getData('Text');
					var targetIndex = $(e.currentTarget).attr('truth-index');
					
					// If source and target is the same, then do nothing. The puzzle piece does not move
					// Otherwise, swap puzzle piece and increment the total move
					if( originTruthIndex !== targetIndex ){
						// Get sub-tile of origin
						var subTileOrigin = $('[truth-index="' + originTruthIndex + '"]').find('.sub-tile');
						
						// Get sub-tile of drop target
						var subTileTarget = $('[truth-index="' + targetIndex + '"]').find('.sub-tile');
						
						// Swap the sub-tiles
						$('[truth-index="' + originTruthIndex + '"]').append(subTileTarget);
						$('[truth-index="' + targetIndex + '"]').append(subTileOrigin);
						
						// Add total movement
						scope.$apply(function(){
							if(scope.totalMove === 0 )
								scope.totalMove = 1;
							else
								scope.totalMove += 1;
						});
						
						// Save the puzzle board state
						localStorage.setItem("state", $('#puzzle-picture-container').html());
						localStorage.setItem("totalMove", scope.totalMove);
						
						// Check if the game is completed
						var len = $('.parent-tile').length;
						$('.parent-tile').each(function(index,value){
							var parentIndex = $(value).attr('truth-index');
							var subTileIndex = $(value).find('.sub-tile').attr('index');
							
							if(parentIndex !== subTileIndex)
								return false; // game is not completed yet
							
							if(index === len-1)
							{
								// Game completed!
								// Show the winning banner
								$('#banner-win').removeClass('hide');
								scope.$apply(function(){
									scope.winningFlag = 1;
									localStorage.setItem("winningFlag", scope.winningFlag);
									// Stop the time tracker
									clearInterval(scope.stopTimer()); 
								});
							}
						});
					}
					return false;
				},
				false
			);
		}
	}
}]);

app.controller('PuzzleController', ['$scope', PuzzleController]);