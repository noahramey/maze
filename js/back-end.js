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

      var attrArray = ["east", "north", "playerSpace", "minotaurSpace", "endSpace", "idSpace", 'computerSpace'];

      for (var i = 0; i < attrArray.length; i++) {
        if (maze.spaces[x][y][attrArray[i]] === true) {
          $mazeSpace.addClass(attrArray[i]);
        }
      }
      if (maze.spaces[x][y]["gavelSpace"] === true) {
        $mazeSpace.addClass("gavelSpace");
        $mazeSpace.addClass("gavelToggle");
      }
      if (maze.spaces[3][3].playerSpace === true) {
        $mazeSpace.removeClass("idSpace");
        maze.spaces[3][3].idSpace = false;
        $('#fakeid').fadeIn();
      }
      if (maze.height === 15) {
        if (maze.spaces[15][6].playerSpace === true) {
          $mazeSpace.removeClass("computerSpace");
          maze.spaces[15][6].computerSpace = false;
          $('#computer').fadeIn();
          $('#compbtn').fadeIn();
        }
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

Player.prototype.escape = function () {
  if (player.x === player.maze.endX && player.y === player.maze.endY) {
    $(".escape").hide();

  }
};

Player.prototype.win = function(){
  if (maze.height === 15 && player.x === 7 && player.y === 2) {
    $(".maze table").empty();
    $(".instructions").hide();
    $(".controls").hide();
    $("#conair").fadeIn(500);
    setTimeout(function(){
         window.location.reload();
    }, 3000);
  }
  else if (player.x === player.maze.endX && player.y === player.maze.endY) {
    $(".maze table").hide();
    $(".winning-image").fadeIn();
    $(".container").css('background-image', 'url(img/policelights.gif)');
    $("#walter").css('background-image', "url(img/level-win.gif)");
    $("#notoriety").show();
    $(".instructions").hide();
    $(".controls").hide();
    $("#level").show();
    $("#badgeHollow").show();
    $('#fakeid').remove();
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
    $("#message").fadeIn(1000).delay(0).fadeOut(1000);
    maze.spaces[player.x][player.y].playerSpace = false;
    maze.spaces[maze.startX][maze.startY].playerSpace = true;
    player.x = maze.startX;
    player.y = maze.startY;
  }
}

function mazeWalls(xVertWallsArray, yVertWallsArray, xHorizWallsArray, yHorizWallsArray, mazeSize){
  for (var i = 0; i < xVertWallsArray.length; i++) {
    maze.createWall(xVertWallsArray[i], yVertWallsArray[i], "east");
    maze.createWall(xVertWallsArray[i]+1, yVertWallsArray[i], "west");
  }
  for (var i = 0; i < xHorizWallsArray.length; i++) {
    maze.createWall(xHorizWallsArray[i], yHorizWallsArray[i], "north");
    maze.createWall(xHorizWallsArray[i], yHorizWallsArray[i]+1, "south");
  }
  for (var i = 1; i <= mazeSize; i++) {
    maze.createWall(1, i, "west");
    maze.createWall(i, mazeSize, "north");
    maze.createWall(mazeSize, i, "east");
    maze.createWall(i, 1, "south");
  }
}
