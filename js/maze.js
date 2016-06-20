function Maze(width, height) {
  this.width = width;
  this.height = height;

  this.startX = null;
  this.startY = null;
  this.startOrientation = null;
  this.endX = null;
  this.endY = null;
}

this.directions = ["north","east","south","west"];
this.spaces = [];

var x, y;
for (x=1; x <= this.width; x++) {
  this.spaces[x] = [];
  for (y=1; y <= this.height; y += 1) {
      this.spaces[x][y] = new MazeSpace(this.directions);
  }
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
