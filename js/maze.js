// BACK END //

function Maze(width, height) {
  this.width = width;
  this.height = height;
  this.startX = null;
  this.startY = null;
  this.startOrientation = null;
  this.endX = null;
  this.endY = null;

  this.directions = ["north","east","south","west"];
  this.spaces = [];

  var x, y;
  for (x = 1; x <= this.width; x += 1) {
    this.spaces[x] = [];
    for (y = 1; y <= this.height; y += 1) {
        this.spaces[x][y] = new MazeSpace();
    }
  }
}

function MazeSpace() {
  this.north = false;
  this.east = false;
  this.south = false;
  this.west = false;
}

function Player() {
  this.x = null;
  this.y = null;
  this.orientation = null;
  this.maze = null;
}


Maze.prototype.setStart = function(x, y, orientation) {
  this.startX = x;
  this.startY = y;
  this.startOrientation = orientation;
}

Maze.prototype.setEnd = function(x, y) {
  this.endX = x;
  this.endY = y;
}

Maze.prototype.createWall = function (x, y, direction) {
    this.spaces[x][y].setWallDirection(direction);
    return true;
}

MazeSpace.prototype.setWallDirection = function(direction) {
  this[direction] = true;
}

Maze.prototype.render = function() {
  var mazeRow, $mazeSpace;
  for (var y = this.height; y >= 1; y--) {
    mazeRow = $("<tr class='mazeRow'>").appendTo(".maze table");
    for (var x = 1; x <= this.width; x++) {
      $mazeSpace = $("<td class='mazeSpace'>").appendTo(mazeRow);
      $mazeSpace.append("(" + x + "," + y + ")")
      if (maze.spaces[x][y]["east"] === true) {
        $mazeSpace.addClass("eastWall");
      }
    }
  }
}



// USER INTERFACE LOGIC //

$(document).ready(function() {
  maze = new Maze(5,5);
  maze.setStart(1,1, "north");
  maze.setEnd(5,5);
  maze.createWall(1,1, "east");
  maze.createWall(1,2, "east");
  maze.createWall(1,3, "east");
  maze.createWall(1,4, "east");
  maze.createWall(2,5, "east");
  maze.createWall(2,4, "east");
  maze.createWall(2,3, "east");
  maze.createWall(2,2, "east");
  maze.createWall(3,1, "east");
  maze.createWall(3,2, "east");
  maze.createWall(3,3, "east");
  maze.createWall(3,4, "east");
  maze.createWall(4,5, "east");
  maze.createWall(4,4, "east");
  maze.createWall(4,3, "east");
  maze.createWall(4,2, "east");

  maze.render();

});
