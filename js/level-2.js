//Second Level

$("#level2").click(function() {
  $(".maze table").show();
  $(".winning-image").hide();
  maze = new Maze(10,10);
  maze.setStart(1,10, "south");
  maze.setEnd(10,1);
  var xVertWallsArray = [1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,5,5,5,5,5,5,6,6,6,7,7,7,7,7,8,8,8,8,9,9,9,9,9,9,9];
  var yVertWallsArray = [2,4,5,8,3,4,5,8,9,10,2,5,6,7,8,9,1,4,2,5,7,8,9,10,1,4,6,2,3,7,9,10,1,5,7,8,2,3,4,6,7,8,9];
  var xHorizWallsArray = [1,1,1,2,2,2,2,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,8,9,9,9,9,10];
  var yHorizWallsArray = [2,6,9,1,5,6,7,1,3,6,2,3,5,7,9,2,3,5,6,8,3,5,7,8,2,3,5,9,2,4,5,6,8,2,3,6,9,4];
  console.log(xHorizWallsArray.length, yHorizWallsArray.length);
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
  maze.spaces[1][10].playerSpace = true;

  maze.render();
  player = new Player(1,10, maze);

});
