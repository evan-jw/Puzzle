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
app.directive('droppable', [function() {
	return {
		scope: {
			drop: '&',
			bin: '='
		},
		link: function(scope, element) {
			// again we need the native object
			var el = element[0];
		  
			el.addEventListener(
				'dragover',
				function(e) {
					e.dataTransfer.dropEffect = 'move';
					// allows us to drop
					if (e.preventDefault) e.preventDefault();
					this.classList.add('over');
					return false;
				},
				false
			);
		  
			el.addEventListener(
				'dragenter',
				function(e) {
				  this.classList.add('over');
				  return false;
				},
				false
			);

			el.addEventListener(
				'dragleave',
				function(e) {
				  this.classList.remove('over');
				  return false;
				},
				false
			);
		  
			el.addEventListener(
				'drop',
				function(e) {
					this.classList.remove('over');
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
					}
					return false;
				},
				false
			);
		}
	}
}]);

app.controller('PuzzleController', ['$scope', PuzzleController]);