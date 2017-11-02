# checkers
Let's make a game of checkers.

# setup

To begin the server run 'nodemon server.js'

# Notes on the tech

* Node and Express
* plain HTML5 and CSS3, no client-side UI frameworks
* native DOM API, no libraries
* use a unit-testing framework -- Jest is very handy all-in-one (can be used for both client and server), but use whatchu like

# Notes on construction

there should be a real UI -- it can be plain-looking or nicer-looking, but an interactive UI that handles clicks on pieces.

The exact details of the interaction are up to your sensibilities.

(in particular how to make moves, and perhaps whether the game visually highlights the valid move options for a given pieces)

keep things clean and modular

maintain the "source-of-truth" state of the game on the server, not the client
including how you compute the next state of the board, after a move -- please do this on the server

write unit tests as you go, don't leave them for the end

you are very likely to run out of time if you try to tackle Kings from the beginning. That said, plan ahead.

make sure to include a minimal README indicating:

what this project is

how to run it

how to run the test suite

how to interact with the game (in particular how to make moves, which was up to you to decide)

any notes on implementation strategy

a TODO section on what did not get implemented yet


# The rules of checkers

Checkers is played by two players.

The board consists of 64 squares, alternating between 32 dark and 32 light squares.

The board is positioned so that each player has a light square on the right side corner closest to him or her.

Each player begins the game with 12 colored discs. (Typically, one set of pieces is black and the other red.)

Each player places his or her pieces on the 12 dark squares closest to him or her.

Black moves first.

Players then alternate moves.


# Gameplay with basic (unpromoted) pieces

A player wins the game when the opponent cannot make a move.

In most cases, this is because all of the opponent's pieces have been captured,
but it could also be because all of his pieces are blocked in.
Moves are allowed only on the dark squares, so pieces always move diagonally.

Single pieces are always limited to forward moves (toward the opponent).

A piece making a non-capturing move (not involving a jump) may move only one square.

A piece making a capturing move (a jump) leaps over one of the opponent's pieces, landing in a straight diagonal line on the other side.

Only one piece may be captured in a single jump; however, multiple jumps are allowed during a single turn.

When a piece is captured, it is removed from the board.

If a player is able to make a capture, there is no option; the jump must be made.

If more than one capture is available, the player is free to choose whichever he or she prefers.


# Gameplay with Kings

When a piece reaches the furthest row from the player who controls that piece, it is crowned and becomes a king.

One of the pieces which had been captured is placed on top of the king so that it is twice as high as a single piece.

Kings are limited to moving diagonally but may move both forward and backward.

(Remember that single pieces, i.e. non-kings, are always limited to forward moves.)

Kings may combine jumps in several directions, forward and backward, on the same turn.

Single pieces may shift direction diagonally during a multiple capture turn, but must always jump forward (toward the opponent).