var PuzzleController= function($scope, $rootScope){
	// Number of movement made
	$scope.totalMove = 0;
	
	// Time tracker variable
	$scope.setTimer = function(){
		if(localStorage.getItem("time") !== null){
			$scope.time = parseInt(localStorage.getItem("time"));
		}else{
			$scope.time = 0;
		}
	}
	$scope.setTimer();
	
	$scope.timeTracker = function(){
		setTimeout(function() {
			$scope.time += 1;
			localStorage.setItem("time", $scope.time);
			$scope.$apply();
		});
	}
	
	$scope.startTimer = function(){
		$scope.interval = setInterval($scope.timeTracker, 1000);
	}
	
	$scope.stopTimer = function(){
		clearInterval($scope.interval);
	}
	
	$scope.checkWinStatus = function(){
		// Winning flag. This is used to determine whether the game is already ended or not
		if(localStorage.getItem("winningFlag") !== null){
			$scope.winningFlag = parseInt(localStorage.getItem("winningFlag"));
			if($scope.winningFlag === 1){
				// Already win, show the hidden message
				$('#banner-win').removeClass('hide');
			}else
				$scope.startTimer();
		}else{
			$scope.winningFlag = 0;
		}
	}
	$scope.checkWinStatus();
		
	if(localStorage.getItem("state") !== null){
		$('#puzzle-picture-container').html(localStorage.getItem("state"));
		$scope.totalMove = parseInt(localStorage.getItem("totalMove"));
		// Refresh the digest
		setTimeout(function() {
			$target = $('#puzzle-picture-container');
			angular.element($target).injector().invoke(function($compile) {
				var $scope = angular.element($target).scope();
				$target.append($compile($target)($scope));
				$scope.$apply();
			});
		}, 0);
	}else{
		// Split picture and shuffle it
		$('#puzzle-picture-container').splitPicture();
		
		// Save puzzle board state after shuffling the board
		localStorage.setItem("state", $('#puzzle-picture-container').html());		
	}
	
	$scope.startGame = function(){
		setTimeout(function() {
			$scope.totalMove = 0;
			$scope.winningFlag = 0;
			$scope.time = 0;
			$scope.$apply();
		},0);
		
		$('#banner-win').addClass('hide');
		
		$('.parent-tile').each(function(index,value){
			$(value).remove();
		});
		$('#originalImg').show();
		$('#puzzle-picture-container').splitPicture();
		
		// Reset all local storage since it's a new game
		localStorage.setItem("state", $('#puzzle-picture-container').html());
		localStorage.setItem("totalMove", 0);
		localStorage.setItem("winningFlag", 0);
		localStorage.setItem("time", 0);
		$scope.stopTimer();
		$scope.startTimer();
	}
}