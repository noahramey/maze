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
  this.playerSpace = false;
  this.minotaurSpace = false;
  this.gavelSpace = false;
}

function Player(x,y,m) {
  this.x = x;
  this.y = y;
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

Maze.prototype.createWall = function (x, y, direction) {
  this.spaces[x][y].setWallDirection(direction);
  return true;
}

MazeSpace.prototype.setWallDirection = function(direction) {
  this[direction] = true;
}

Maze.prototype.render = function() {
  $(".maze table").empty();
  var mazeRow, $mazeSpace;
  for (var y = this.height; y >= 1; y--) {
    mazeRow = $("<tr class='mazeRow'>").appendTo(".maze table");
    for (var x = 1; x <= this.width; x++) {
      $mazeSpace = $("<td class='mazeSpace'>").appendTo(mazeRow);

      $mazeSpace.append("")

      if (maze.spaces[x][y]["east"] === true) {
        $mazeSpace.addClass("eastWall");
      }
      if (maze.spaces[x][y]["north"] === true) {
        $mazeSpace.addClass("northWall");
      }
      if (maze.spaces[x][y]["playerSpace"] === true) {
        $mazeSpace.addClass("playerSpace");
      }
      if (maze.spaces[x][y]["minotaurSpace"] === true) {
        $mazeSpace.addClass("minotaurSpace");
      }
      // if (maze.spaces[x][y]["gavelSpace"] === true) {
      //   $mazeSpace.toggleClass("gavelSpace");
      // }
    }
  }
}

// MazeSpace.prototype.renderSpace = function (x, y) {
//   this.playerSpace = true;
// };


Player.prototype.moveNorth = function(x, y) {
  if (this.maze.spaces[x][y].north === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x;
    this.y = y+1;
  this.maze.spaces[x][y+1].playerSpace = true;
  }
  this.win();
  maze.render();
  // player.gavel();
}

Player.prototype.moveEast = function(x, y) {
  if (this.maze.spaces[x][y].east === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x+1;
    this.y = y;
  this.maze.spaces[x+1][y].playerSpace = true;
  }
  this.win();
  maze.render();
  // player.gavel();

}

Player.prototype.moveSouth = function(x, y) {
  if (this.maze.spaces[x][y].south === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x;
    this.y = y-1;
  this.maze.spaces[x][y-1].playerSpace = true;
  }
  this.win();
  maze.render();
  // player.gavel();

}

Player.prototype.moveWest = function(x, y) {
  if (this.maze.spaces[x][y].west === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x-1;
    this.y = y;
  this.maze.spaces[x-1][y].playerSpace = true;
  }
  this.win();
  maze.render();
  // player.gavel();

}


Player.prototype.moveMinotaur = function () {
  var i = Math.floor(Math.random() * 4);
  if (i === 0) {
    this.minotaurEast(this.x, this.y);
  }
  else if (i === 1) {
    this.minotaurNorth(this.x, this.y);
  }
  else if (i === 2) {
    this.minotaurWest(this.x, this.y);
  }
  else if (i === 3) {
    this.minotaurSouth(this.x, this.y);
  }
  console.log(this.x, this.y);
};

Player.prototype.minotaurNorth = function(x, y) {
  if (this.maze.spaces[x][y].north === false) {
    this.maze.spaces[x][y].minotaurSpace = false;
    this.x = x;
    this.y = y+1;
  this.maze.spaces[x][y+1].minotaurSpace = true;
  }
  this.win();
  maze.render();
  minoCrunch();

}

Player.prototype.minotaurEast = function(x, y) {
  if (this.maze.spaces[x][y].east === false) {
    this.maze.spaces[x][y].minotaurSpace = false;
    this.x = x+1;
    this.y = y;
  this.maze.spaces[x+1][y].minotaurSpace = true;
  }
  this.win();
  maze.render();
  minoCrunch();

}

Player.prototype.minotaurSouth = function(x, y) {
  if (this.maze.spaces[x][y].south === false) {
    this.maze.spaces[x][y].minotaurSpace = false;
    this.x = x;
    this.y = y-1;
  this.maze.spaces[x][y-1].minotaurSpace = true;
  }
  this.win();
  maze.render();
  minoCrunch();

}

Player.prototype.minotaurWest = function(x, y) {
  if (this.maze.spaces[x][y].west === false) {
    this.maze.spaces[x][y].minotaurSpace = false;
    this.x = x-1;
    this.y = y;
  this.maze.spaces[x-1][y].minotaurSpace = true;
  }
  this.win();
  maze.render();
  minoCrunch();

}


Player.prototype.win = function(){
  if (player.x === player.maze.endX && player.y === player.maze.endY) {
    $(".maze table").hide();
    $(".winning-image").fadeIn();
    $(".container").css('background-image', 'url(img/policelights.gif)')
  }
}

// Maze.prototype.gavel = function(x, y) {
//   maze.spaces[x][y].gavelSpace = true;
// }

Player.prototype.gavel = function() {
  if (this.x === 2 && this.y === 10) {
    alert("you dead");
  }
}

function minoCrunch() {
  if(player.x === minotaur.x && player.y === minotaur.y || player.x === juggernaut.x && player.y === juggernaut.y) {
    alert("You're going to the slammer");
    maze.spaces[player.x][player.y].playerSpace = false;
    maze.spaces[1][10].playerSpace = true;
    player.x = 1;
    player.y = 10;
  }
}

function mazeWalls(xVertWallsArray, yVertWallsArray, xHorizWallsArray, yHorizWallsArray, mazeSize){
  for (var i = 0; i < xVertWallsArray.length; i++) {
    maze.createWall(xVertWallsArray[i], yVertWallsArray[i], "east");
  }
  for (var i = 0; i < xVertWallsArray.length; i++) {
    maze.createWall(xVertWallsArray[i]+1, yVertWallsArray[i], "west");
  }
  for (var i = 0; i < xHorizWallsArray.length; i++) {
    maze.createWall(xHorizWallsArray[i], yHorizWallsArray[i], "north");
  }
  for (var i = 0; i < xHorizWallsArray.length; i++) {
    maze.createWall(xHorizWallsArray[i], yHorizWallsArray[i]+1, "south");
  }
  for (var i = 1; i <= mazeSize; i++) {
    maze.createWall(1, i, "west");
  }
  for (var i = 1; i <= mazeSize; i++) {
    maze.createWall(i, mazeSize, "north");
  }
  for (var i = 1; i <= mazeSize; i++) {
    maze.createWall(mazeSize, i, "east");
  }
  for (var i = 1; i <= mazeSize; i++) {
    maze.createWall(i, 1, "south");
  }
}

// USER INTERFACE LOGIC //

$(document).ready(function() {
  maze = new Maze(5,5);
  maze.setStart(1,1, "north");
  maze.setEnd(5,5);

  var xVertWallsArray = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
  var yVertWallsArray = [1,2,3,4,5,4,3,2,1,2,3,4,5,4,3,2];
  var xHorizWallsArray = [];
  var yHorizWallsArray = [];
  mazeWalls(xVertWallsArray, yVertWallsArray, xHorizWallsArray, yHorizWallsArray, 5);

  maze.spaces[1][1].playerSpace = true;

  maze.render();
  player = new Player(1,1, maze);


  $("#start").click(function() {
    $("#intro").hide();
    $("table").show();
  });

  $("#level2").click(function() {
    $(".container").css('background-image', 'none')
    $(".maze table").show();
    $(".winning-image").hide();
    maze = new Maze(10,10);
    maze.setStart(1,10, "south");
    maze.setEnd(10,1);
    var xVertWallsArray = [1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,5,5,5,5,5,5,6,6,6,7,7,7,7,7,8,8,8,8,9,9,9,9,9,9,9];
    var yVertWallsArray = [2,4,5,8,3,4,5,8,9,10,2,5,6,7,8,9,1,4,2,5,7,8,9,10,1,4,6,2,3,7,9,10,1,5,7,8,2,3,4,6,7,8,9];
    var xHorizWallsArray = [1,1,1,2,2,2,2,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,9,9,9,9,10];
    var yHorizWallsArray = [2,6,9,1,5,6,7,1,3,6,2,3,5,7,9,2,3,5,6,8,3,5,7,8,2,3,5,9,2,4,5,6,8,2,3,6,9,4];
    mazeWalls(xVertWallsArray, yVertWallsArray, xHorizWallsArray, yHorizWallsArray, 10);

    maze.spaces[1][10].playerSpace = true;

    // maze.gavel(2, 10);
    maze.render();

    function minoTimer() {
      minotaur.moveMinotaur();
      juggernaut.moveMinotaur();
    };

    var myMinoMove = setInterval(minoTimer, 200);
    player = new Player(1,10, maze);
    minotaur = new Player(1, 5, maze);
    juggernaut = new Player(8, 8, maze);
    // player.gavel();

  });


  // console.log(player.x, player.y);

  function userControls(button) {
    $(button).mousedown(function(){$(this).toggleClass('btn-press')}); $(button).mouseup(function(){$(this).toggleClass('btn-press')});
  }

  $('#north').click(function(){player.moveNorth(player.x, player.y)});
  userControls('#north');

  $('#east').click(function(){player.moveEast(player.x, player.y)});
  userControls('#east');

  $('#south').click(function(){player.moveSouth(player.x, player.y)});
  userControls('#south');

  $('#west').click(function(){player.moveWest(player.x, player.y)});
  userControls('#west');


  $(document).keydown(function(e){
    switch(e.which) {
      case 37: //left arrow
        player.moveWest(player.x, player.y);
        break;
      case 38: //up arrow
        player.moveNorth(player.x, player.y);
        // $('#north').toggleClass('btn-press');
        break;
      case 39: //right arrow
        player.moveEast(player.x, player.y);
        break;
      case 40: //down arrow
        player.moveSouth(player.x, player.y);
        break;
    }
  });

  // console.log(player.x, player.y);
});
