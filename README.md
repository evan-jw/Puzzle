# Puzzle
Simple puzzle app using Angular, jQuery, and Bootstrap.

=== General Info ===

Front-End framework used: Angular, jQuery, Bootstrap.

Tools used: Grunt, Scss.

Unit tested by using Karma/Jasmine/AngularMock.

Tested in Chrome and IE 11 (http mode).

To run the page in file protocol (instead of http), just go to web folder and open puzzle.html. However, this only works in Chrome and is not working in IE 11. The reason for this is HTML5 local storage. It does not work in file protocol in IE (although it still works in Chrome). The application works in IE (and Chrome as well) just fine after it's deployed to a server.

=== Features ===

- Minified js,css and optimised image in order to reduce network load.
- Timer for each game. The timer will be reset if player start new game.
- Save state (puzzle board position, timer, and number of moves) even after the browser is closed.
- Modifiable settings at Init.js. The number of tiles for the puzzle can be changed by modifying the size attribute. The gap between each tile also can be hidden by setting the gap attribute to 0.