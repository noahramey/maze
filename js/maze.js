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

function Player(x,y,m) {
  this.x = x;
  this.y = y;
  // this.orientation = null;
  this.maze = m;
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
  if (x>0 && x<=this.width && y>0 && y<=this.height) {
    return true;
  } else {
    return false;
  }
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
      // if (player.maze.spaces[x][y].playerspace === true) {
      //   $mazeSpace.addClass("playerSpace");
      // }
    }
  }
}

Maze.prototype.renderSpace = function () {
  player.maze.spaces[x][y].playerspace = true;
};
// function boundryCheck(oldx, oldy, newx, newy)
//   if (this.maze.isInside(this.x, this.y) === false) {
//     this.x = x;
//     this.y = y;
//     newx = oldx;
//     newy = oldy;
// }

// function buttonClick(direction) {
//   document.getElementById(direction).onclick === true;
// }

Player.prototype.moveNorth = function(x, y) {
  if (this.maze.spaces[x][y].north === false) {
    this.x = x;
    this.y = y+1;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  }
}

Player.prototype.moveEast = function(x, y) {
  if (this.maze.spaces[x][y].east === false) {
    this.x = x+1;
    this.y = y;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  }
}

Player.prototype.moveSouth = function(x, y) {
  if (this.maze.spaces[x][y].south === false) {
    this.x = x;
    this.y = y-1;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  }
}

Player.prototype.moveWest = function(x, y) {
  if (this.maze.spaces[x][y].west === false) {
    this.x = x-1;
    this.y = y;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  }
}

// USER INTERFACE LOGIC //

$(document).ready(function() {
  maze = new Maze(5,5);
  maze.setStart(1,1, "north");
  maze.setEnd(5,5);
  maze.createWall(1,1, "east");
  maze.createWall(2,1, "west");

  maze.createWall(1,2, "east");
  maze.createWall(2,2, "west");

  maze.createWall(1,3, "east");
  maze.createWall(2,3, "west");

  maze.createWall(1,4, "east");
  maze.createWall(2,4, "west");

  maze.createWall(2,5, "east");
  maze.createWall(3,5, "west");

  maze.createWall(2,4, "east");
  maze.createWall(3,4, "west");

  maze.createWall(2,3, "east");
  maze.createWall(3,3, "west");

  maze.createWall(2,2, "east");
  maze.createWall(3,2, "west");

  maze.createWall(3,1, "east");
  maze.createWall(4,1, "west");

  maze.createWall(3,2, "east");
  maze.createWall(4,2, "west");

  maze.createWall(3,3, "east");
  maze.createWall(4,3, "west");

  maze.createWall(3,4, "east");
  maze.createWall(4,4, "west");

  maze.createWall(4,5, "east");
  maze.createWall(5,5, "west");

  maze.createWall(4,4, "east");
  maze.createWall(5,4, "west");

  maze.createWall(4,3, "east");
  maze.createWall(4,3, "west");

  maze.createWall(4,2, "east");
  maze.createWall(4,2, "west");


  maze.render();

  player = new Player(1,1, maze);

  console.log(player.x, player.y);

  // $('#north').click(function(){player.moveNorth(player.x, player.y)});
  // $('#east').click(function(){player.moveEast(player.x, player.y)});
  // $('#south').click(function(){player.moveSouth(player.x, player.y)});
  // $('#west').click(function(){player.moveWest(player.x, player.y)});

  $(document).keydown(function(e){
    switch(e.which) {
      case 37: //left arrow
        player.moveWest(player.x, player.y);
        break;
      case 38: //up arrow
        player.moveNorth(player.x, player.y);
        break;
      case 39: //right arrow
        player.moveEast(player.x, player.y);
        break;
      case 40: //down arrow
        player.moveSouth(player.x, player.y);
        break;
    }
  });

  console.log(player.x, player.y);
});
