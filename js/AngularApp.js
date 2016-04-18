var app = angular.module('puzzle-app',[]);
app.controller('PuzzleController', ['$scope', PuzzleController]);

/* Was trying to use directive but unfortunately, there is a problem with cross-origin request, 
 * which is caused by calling a file directly instead of calling from http protocol. 
 * This can be overcome by deploying the application to a web server, however it is not going to be  
 * practical when the user try to run the application directly from the html file.
 */
//app.directive('puzzleSection', [PuzzleSection]);