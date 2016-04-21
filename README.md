# Puzzle
Simple puzzle app using Angular, jQuery, and Bootstrap.

=== General Info ===

Front-End framework used: Angular, jQuery, Bootstrap.
Tools used: Grunt, Scss.
Tested by using Karma/Jasmine/AngularMock.
To run the page, just go to web folder and open puzzle.html.

=== Features ===

- Minified js,css and optimised image in order to reduce network load.
- Timer for each game. The timer will be reset if player start new game.
- Save state (puzzle board position, timer, and number of moves) even after the browser is closed.
- Modifiable settings at Init.js. The number of tiles for the puzzle can be changed by modifying the size attribute. The gap between each tile also can be hidden by setting the gap attribute to 0.