describe('puzzle', function () {
	beforeEach(module('puzzle-app'));

	var $controller;
	
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('starting variable', function () {
		it('should return default value 0', function () {
			var $scope = {};
			var controller = $controller('PuzzleController', { $scope: $scope });
			
			$scope.startGame();
			
			// Test the scope default value in the new game
			expect($scope.totalMove).toEqual(0);
			expect($scope.winningFlag).toEqual(0);
			
			// Test the local storage default value in the new game
			expect(parseInt(localStorage.getItem("totalMove"))).toEqual(0);
			expect(parseInt(localStorage.getItem("winningFlag"))).toEqual(0);
			
		});
	});
	
	describe('win banner', function(){
		it('should be displayed', function () {
			var $scope = {};
			var controller = $controller('PuzzleController', { $scope: $scope });
			
			$scope.winningFlag = 1;
			$scope.checkWinStatus();
			var show = $('#banner-win').hasClass('hide');
			expect(show).toEqual(false);
		});
		
		it('should not be displayed', function () {
			var $scope = {};
			var controller = $controller('PuzzleController', { $scope: $scope });
			
			$scope.winningFlag = 0;
			$scope.checkWinStatus();
			var show = $('#banner-win').hasClass('hide');
			expect(show).toEqual(false);
		});
	});
	
	describe('timer', function(){
		it('should have default value 0 with local storage is not present', function () {
			var $scope = {};
			var controller = $controller('PuzzleController', { $scope: $scope });
			$scope.setTimer();
			expect($scope.time).toEqual(0);
		});
		
		it('should have same value with local storage', function () {
			var $scope = {};
			var controller = $controller('PuzzleController', { $scope: $scope });
			localStorage.setItem("time",5);
			$scope.setTimer();
			expect($scope.time).toEqual(5);
		});
	});
});