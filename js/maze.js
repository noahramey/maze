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


Maze.prototype.setStart = function(x, y, orientation) {
  this.startX = x;
  this.startY = y;
  this.startOrientation = orientation;
}

Maze.prototype.setEnd = function(x, y) {
  this.endX = x;
  this.endY = y;
}

Maze.prototype.isInside = function(x, y) {
  if (x>0 && x<this.width && y>0 && y<this.height) {
    return true;
  } else {
    return false;
  }
}

Maze.prototype.setWall = function (x, y, direction) {
  if (x > 0 && x <= this.width && y > 0 && y <= this.height && this.directions.indexOf(direction) !== -1) {
    this.spaces[x][y].setWall(direction);
    return true;
  }
  return false;
}

MazeSpace.prototype.setWall = function(direction) {
  this[direction] = true;
}








// USER INTERFACE LOGIC //

$(document).ready(function() {
  maze = new Maze(5,5);
  maze.setStart(1,1, "north");
  maze.setEnd(5,5);
  maze.setWall(1,1, "east");
  maze.setWall(1,2, "east");
  maze.setWall(1,3, "east");
  maze.setWall(1,4, "east");
  maze.setWall(2,5, "east");
  maze.setWall(2,4, "east");
  maze.setWall(2,3, "east");
  maze.setWall(2,2, "east");
  maze.setWall(3,1, "east");
  maze.setWall(3,2, "east");
  maze.setWall(3,3, "east");
  maze.setWall(3,4, "east");
  maze.setWall(4,5, "east");
  maze.setWall(4,4, "east");
  maze.setWall(4,3, "east");
  maze.setWall(4,2, "east");
});
