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
			
			// again we need the native object
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
					var originTruthIndex = e.dataTransfer.getData('Text');
					var targetIndex = $(e.currentTarget).attr('truth-index');
					// If source and target is the same, then do nothing. The puzzle piece does not move
					// Otherwise, swap puzzle piece and increment the total move
					if( originTruthIndex!=targetIndex ){
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
						
					}
					return false;
				},
				false
			);
		}
	}
}]);

app.controller('PuzzleController', ['$scope', PuzzleController]);