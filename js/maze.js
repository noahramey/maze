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
  this.endSpace = false;
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
  this.spaces[x][y].endSpace = true;
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
      if (maze.spaces[x][y]["gavelSpace"] === true) {
        $mazeSpace.addClass("gavelSpace");
        $mazeSpace.addClass("gavelToggle");
      }
      if(maze.spaces[x][y]["idSpace"] === true) {
        $mazeSpace.addClass("idSpace");
      }
      if(maze.spaces[x][y]["endSpace"] === true) {
        $mazeSpace.addClass("endSpace");
      }
    }
  }
}

Player.prototype.move = function(x, y, i, j, direction, icon) {
  if (this.maze.spaces[x][y][direction] === false) {
    this.maze.spaces[x][y][icon] = false;
    this.x = x + i;
    this.y = y + j;
  this.maze.spaces[x + i][y + j][icon] = true;
  }
  this.win();
  maze.render();
  $('td.gavelToggle').removeClass("gavelSpace");
}


Player.prototype.moveMinotaur = function () {
  var randomMove = Math.floor(Math.random() * 4);
  if (randomMove === 0) {
    this.move(this.x, this.y, 1, 0, "east", "minotaurSpace");
    player.gavel(5,6);
    minoCrunch();
  }
  else if (randomMove === 1) {
    this.move(this.x, this.y, 0, 1, "north", "minotaurSpace");
    player.gavel(5,6);
    minoCrunch();
  }
  else if (randomMove === 2) {
    this.move(this.x, this.y, -1, 0, "west", "minotaurSpace");
    player.gavel(5,6);
    minoCrunch();
  }
  else if (randomMove === 3) {
    this.move(this.x, this.y, 0, -1, "south", "minotaurSpace");
    $('td.gavelToggle').addClass("gavelSpace");
    player.gavel(5,6);
    minoCrunch();
  }
};

function minoTimer() {
  minotaur.moveMinotaur();
  juggernaut.moveMinotaur();
};


Player.prototype.win = function(){
  if (player.x === player.maze.endX && player.y === player.maze.endY) {
    $(".maze table").hide();
    $(".winning-image").fadeIn();
    $(".container").css('background-image', 'url(img/policelights.gif)');
    $("#walter").css('background-image', "url(img/playericon.gif)");
    $("#notoriety").show();
    $(".instructions").hide();
    $(".controls").hide();
    $("#level").show();
    $("#badgeHollow").show();
    $("#start").blur();
    $("#level").show();
    $("#level").focus();
  }
}

Maze.prototype.gavel = function(x, y) {
  maze.spaces[x][y].gavelSpace = true;
}

Player.prototype.gavel = function(x, y) {
  if (this.x === x && this.y === y && $('td.gavelToggle').hasClass("gavelSpace")) {
    // $('#message').text("BUSTED!");
    // $("#message").fadeIn(500).delay(0).fadeOut(500)
  }
}

// Player.prototype.fakeid = function(x, y) {
//   if (this.x === x && this.y === y) {
//     $("td.idSpace").css('display', 'none')
//     $("#message").fadeIn(500).delay(0).fadeOut(500)
//   }
// }

function minoCrunch() {
  if(player.x === minotaur.x && player.y === minotaur.y || player.x === juggernaut.x && player.y === juggernaut.y || maze.spaces[player.x][player.y].gavelSpace === true) {
    alert("You're going to the slammer");
    maze.spaces[player.x][player.y].playerSpace = false;
    maze.spaces[maze.startX][maze.startY].playerSpace = true;
    player.x = maze.startX;
    player.y = maze.startY;
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
  maze.spaces[3][3].idSpace = true;

  // player.fakeid(3,3);
  maze.render();
  player = new Player(1,1, maze);


  $("#start").click(function() {
    $("#intro").hide();
    $("table").show();
    $(".instructions button").hide();
    $(".instructions").prepend("<h6>Level 1</h6>");
    $(".instructions h2").text("Get out of here, Walter!");
    $(".instructions p").text("Don't forget your fake ID. It might come in handy.");
    $(".instructions").css('background-image', 'none')
  });



  $("#level").click(function() {
    $(".instructions").show();
    $(".controls").show();
    $("#level").hide();
    $("#badgeHollow").hide();
    $("#notoriety").hide();
    $(".instructions button").hide();
    $(".instructions h6").text("Level 2");
    $(".instructions h2").text("Evade the Law!");
    $(".instructions p").text("Maneuver past FBI agents and the gavel to catch your next flight.");
    $(".container").css('background-image', 'none')
    $(".maze table").show();
    $(".winning-image").hide();


    if (player.x === 5 && player.y === 5) {
      maze = new Maze(10,10);
      maze.setStart(1,10, "south");
      maze.setEnd(10,4);
      var xVertWallsArray = [1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,5,5,5,5,5,5,6,6,6,7,7,7,7,7,8,8,8,8,9,9,9,9,9,9,9];
      var yVertWallsArray = [2,4,5,8,3,4,5,8,9,10,2,5,6,7,8,9,1,4,2,5,7,8,9,10,1,4,6,2,3,7,9,10,1,5,7,8,2,3,4,6,7,8,9];
      var xHorizWallsArray = [1,1,1,2,2,2,2,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,9,9,9,9,10];
      var yHorizWallsArray = [2,6,9,1,5,6,7,1,3,6,2,3,5,7,9,2,3,5,6,8,3,5,7,8,2,3,5,9,2,4,5,6,8,2,3,6,9,4];
      mazeWalls(xVertWallsArray, yVertWallsArray, xHorizWallsArray, yHorizWallsArray, 10);

      maze.spaces[maze.startX][maze.startY].playerSpace = true;
      maze.gavel(5,6);
      maze.render();

      var myMinoMove = setInterval(minoTimer, 200);
      player = new Player(1,10, maze);
      minotaur = new Player(1, 5, maze);
      juggernaut = new Player(8, 8, maze);
    }
    else if (player.x === 10 && player.y === 4) {
      maze = new Maze(15,15);
      maze.setStart(8,15, "south");
      maze.setEnd(8,1);

      var xVertWallsArray = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,11,11,12,12,12,12,12,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14];
      var yVertWallsArray = [2,4,7,8,11,12,13,4,6,9,10,11,13,14,5,7,9,10,12,13,2,3,4,5,6,8,11,12,13,14,1,4,5,7,9,10,12,14,15,2,4,6,8,9,14,1,2,5,6,9,12,13,14,3,4,5,7,8,10,11,12,13,14,3,9,12,14,15,2,5,6,7,8,13,1,2,3,6,9,13,14,8,9,10,14,15,2,3,4,7,8,11,13,14,1,4,5,6,7,8,9,10,12,15];
      var xHorizWallsArray = [1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,5,5,5,5,6,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,8,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,13,13,14,14,14,14,14,15,15,15];
      var yHorizWallsArray = [2,5,9,14,1,4,5,6,9,12,14,1,2,3,5,7,8,11,14,2,3,6,8,10,2,6,9,12,2,3,5,7,10,12,13,2,3,6,7,10,11,1,3,6,8,10,14,1,2,5,6,8,10,1,3,4,5,7,9,10,11,13,3,4,7,9,10,11,12,14,2,4,5,6,7,10,11,1,3,5,8,10,11,12,2,5,9,11,13,2,10,13];
      mazeWalls(xVertWallsArray, yVertWallsArray, xHorizWallsArray, yHorizWallsArray, 15);

      maze.spaces[8][15].playerSpace = true;
      maze.gavel(5,6);
      maze.render();

      var myMinoMove = setInterval(minoTimer, 200);
      player = new Player(8,15, maze);
      minotaur = new Player(3, 8, maze);
      juggernaut = new Player(10, 14, maze);

    }
  });

  /***********************************
  Level 3
  ************************************/

    // var xVertWallsArray = [1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,9,9];
    // var yVertWallsArray = [2,3,4,5,6,7,8,9,1,2,3,4,8,9,10,2,3,4,5,7,8,9,1,2,4,6,7,8,9,10,1,2,3,5,6,7,8,9,2,3,4,5,6,7,8,9,10,2,3,4,5,6,7,8,9,10,1,3,4,6,7,9];
    // var xHorizWallsArray = [1,2,3,3,4,5,5,8,8,9,9,9,10];
    // var yHorizWallsArray = [3,6,5,7,5,3,4,4,8,5,7,9,8];


  function userControls(button) {
    $(button).mousedown(function(){$(this).toggleClass('btn-press')}); $(button).mouseup(function(){$(this).toggleClass('btn-press')});
  }

  $('#north').click(function(){player.move(player.x, player.y, 0, 1, "north", "playerSpace")});
  userControls('#north');

  $('#east').click(function(){player.move(player.x, player.y, 1, 0, "east", "playerSpace")});
  userControls('#east');

  $('#south').click(function(){player.move(player.x, player.y, 0, -1, "south", "playerSpace")});
  userControls('#south');

  $('#west').click(function(){player.move(player.x, player.y, -1, 0, "west", "playerSpace")});
  userControls('#west');

  $(document).keydown(function(e){
    switch(e.which) {
      case 37: //left arrow
        player.move(player.x, player.y, -1, 0, "west", "playerSpace");
        break;
      case 38: //up arrow
        player.move(player.x, player.y, 0, 1, "north", "playerSpace");
        // $('#north').toggleClass('btn-press');
        break;
      case 39: //right arrow
        player.move(player.x, player.y, 1, 0, "east", "playerSpace");
        break;
      case 40: //down arrow
        player.move(player.x, player.y, 0, -1, "south", "playerSpace");
        break;
    }
  });
});
