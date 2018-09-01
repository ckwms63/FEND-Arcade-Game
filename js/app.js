/*
 * Enemy class and properties
*/
var enemyWidth = 80;
var enemyHeight = 60;
var canvasLength = 405;
var midX = 202;
var gridHeight = 83;
var gridLength = 102;
var minSpeed = 200;
var maxSpeed = 500;

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   // Multiply any movement by the dt parameter to ensure
   // the game runs at the same speed for all computers
   this.x += this.speed * dt;

   // Enemy offscreen start location
   this.startLocation = -enemyWidth;
   // Enemy offscreen end location
   this.endLocation = canvasLength+enemyWidth;

   if (this.x > this.endLocation){
       this.x = this.startLocation;
       // Random pick number between min speed and max speed
       this.speed = Math.floor((Math.random() * maxSpeed) + minSpeed);
    }
    this.collision();
    player.win();
};

Enemy.prototype.collision = function() {
   if (player.x + enemyWidth > this.x &&
       player.x < this.x + enemyWidth &&
       player.y + enemyHeight > this.y &&
       player.y < this.y + enemyHeight){
       player.reset();
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// New enemies position
var allEnemies = [];
var enemyPositions = [63, 147, 230];

enemyPositions.forEach(function(locationY) {
   var startSpeed = Math.floor((Math.random() * maxSpeed) + minSpeed);
   enemy = new Enemy (0, locationY, startSpeed);
   allEnemies.push(enemy);
});

/*
 * Player class and properties
 */
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-pink-girl.png';
};

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// New player position
var player = new Player(midX, canvasLength);

//Move player
Player.prototype.handleInput = function(key) {
  if (key == 'left' && this.x > 0) {
      this.x -= gridLength;
  };
  if (key == 'right' && this.x < canvasLength) {
      this.x += gridLength;
  };
  if (key == 'up' && this.y > 0) {
      this.y -= gridHeight;
  };
  if (key == 'down' && this.y < canvasLength) {
      this.y += gridHeight;
  };
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
});

// Reset the game
Player.prototype.reset = function() {
    this.x = midX;
    this.y = canvasLength;
};

// Win the game
Player.prototype.win = function() {
  setTimeout(function(){
    if (player.y < 0){
        alert("Congratulation, You Win the Game!");
        player.reset();
    }
  }, 1000);
};
