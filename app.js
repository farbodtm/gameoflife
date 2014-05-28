(function(window, undefined){
  document = window.document;

  // Initialization
  var aliveColor = "rgb(0, 221, 50)";
  var deadColor = "rgb(0, 0, 0)";
  var size = 7;
  var canvas = document.createElement("canvas");
  canvasSetSize();
  //window.addEventListener("resize", canvasSetSize, false);

  document.body.insertBefore(canvas, document.getElementsByTagName("script"));

  // Check for canvas support
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
  }

  window.addEventListener("click", draw);
  //  window.addEventListener("keyup", function() { setInterval(nextGeneration, 150); });
  

  var s = Math.floor(size/2);

  context.fillStyle = deadColor; 
  context.fillRect (0, 0, canvas.width, canvas.height);


 var sy = s+size*50;
 var sx = s+size*50;
  
  live(sx+size*0,sy,size);
  live(sx+size*1,sy,size);
  live(sx+size*2, sy,size);
  live(sx+size*3,sy,size);
  live(sx+size*4,sy,size);
  live(sx+size*5,sy,size);
  live(sx+size*6,sy,size);
  live(sx+size*7,sy,size);
  
  live(sx+size*9,sy,size);
  live(sx+size*10,sy,size);
  live(sx+size*11,sy,size);
  live(sx+size*12,sy,size);
  live(sx+size*13,sy,size);
  
  live(sx+size*17,sy,size);
  live(sx+size*18,sy,size);
  live(sx+size*19,sy,size);
  
  live(sx+size*26,sy,size);
  live(sx+size*27,sy,size);
  live(sx+size*28,sy,size);
  live(sx+size*29,sy,size);
  live(sx+size*30,sy,size);
  live(sx+size*31,sy,size);
  live(sx+size*32,sy,size);


  live(sx+size*34,sy,size);
  live(sx+size*35,sy,size);
  live(sx+size*36,sy,size);
  live(sx+size*37,sy,size);
  live(sx+size*38,sy,size);

  function draw(e) {
    context.fillStyle = aliveColor;
    var x = (Math.ceil(e.clientX/3)*3) + Math.floor(size/2);
    var y = (Math.ceil(e.clientY/3)*3) + Math.floor(size/2);
    console.log(x);
    console.log(y);
    context.fillStyle = aliveColor;
    context.fillRect (x, y, 10*size, 10*size);
  }

  function nextGeneration() {
    var width, height, imageData;
    width = canvas.width;
    height = canvas.height;
    imageData = context.getImageData(0, 0, width, height);

    var numOfAliveNeighbours;
    for (var i = Math.floor(size/2); i < width; i = i+size){
      for (var j = Math.floor(size/2); j < height; j = j+size){
	numOfAliveNeighbours = neighbours(i, j, size, imageData);
	if (numOfAliveNeighbours < 2 || numOfAliveNeighbours > 3)
	  die(i, j, size);
	if (numOfAliveNeighbours == 3)
	  live(i, j, size);
      }
    }
  }
  function live(i, j, size) {
    context.fillStyle = aliveColor;
    context.fillRect (i - Math.floor(size/2), j - Math.floor(size/2), size, size);
  }
  function die(i, j, size) {
    context.fillStyle = deadColor;
    context.fillRect (i - Math.floor(size/2), j - Math.floor(size/2), size, size);
  }


  function neighbours(i, j, size, imageData) {
    var numOfAlive = 0;
    numOfAlive += isAlive(imageData, i, j + size);
    numOfAlive += isAlive(imageData, i, j - size);
    numOfAlive += isAlive(imageData, i + size, j);
    numOfAlive += isAlive(imageData, i - size, j);
    numOfAlive += isAlive(imageData, i + size, j + size);
    numOfAlive += isAlive(imageData, i - size, j + size);
    numOfAlive += isAlive(imageData, i + size, j - size);
    numOfAlive += isAlive(imageData, i - size, j -  size);
    return numOfAlive;
  }

  function isAlive(imageData, x, y) { 
    if (x < 0 || y < 0 || x > imageData.width || y > imageData.height) {
      return 0;
    }
    var offset = x * 4 + y * 4 * imageData.width;
    
    r = imageData.data[offset];
    g = imageData.data[offset+1];
    b = imageData.data[offset+2];
    return (r == 0 && g == 0 && b == 0) ? 0 : 1;
  }

  function canvasSetSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  var gameoflife = {
    nextGeneration: nextGeneration 
  };

  window.gameoflife = gameoflife;
}(window))
