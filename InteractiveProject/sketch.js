
/*

PLANNING CODE

  constant animation
    player
    enemy
  constant UI
    player HP
    TP Bar
  enemy attacks

*/


//global variables
let TP = 50;

let playerX = 720;
let playerY = 375;

let turnPart = 'EnemyTurn';
let duration = 0


function preload () {

}


function setup () {
  createCanvas (1440, 1080);
  background(0);
  rectMode(CENTER);
  frameRate(60);
}


function draw () {
  background(0);

  //TP Meter
  PercentTP = 650 - (510 * (TP / 100));

  fill(150, 0, 0);
  quad(100, 140, 130, 110, 130, 620, 100, 650);

  fill(255, 200, 0);
  quad(100, PercentTP, 130, (PercentTP - 30), 130, 620, 100, 650);

  //turn choice
  if (turnPart == 'EnemyTurn') {
    EnemyTurn ();
  }
}





function PlayerTurn () {
  //arrows to switch selected button
  //enter to open button
}

function EnemyTurn () {
  //VARIABLES


  //creates attack box
  fill(0);
  stroke(0, 255, 0);
  strokeWeight(5);
  square(width/2, 375, 400);

  //detect arrow keys for player movement
  if (keyIsDown(UP_ARROW) === true) {
    playerY = playerY - 4;
  } 
  if (keyIsDown(LEFT_ARROW) === true) {
    playerX = playerX - 4;
  }  
  if (keyIsDown(DOWN_ARROW) === true) {
    playerY = playerY + 4;
  } 
  if (keyIsDown(RIGHT_ARROW) === true) {
    playerX = playerX + 4;
  }

  //checks player's coords to keep them in the box
  if (playerX > 905) {
    playerX = 905;
  } 
  if (playerX < 535) {
    playerX = 535;
  }

  if (playerY > 560) {
    playerY = 560;
  } 
  if (playerY < 190) {
    playerY = 190;
  }

  //creates soul at new position
  fill(255, 0, 0);
  noStroke();
  circle(playerX, playerY, 30);


  //enemy attack
  //check if player is hit/graze


  duration = duration + 1

  if (duration/60 == 15) {
    turnPart = 'no';
    duration = 0;
  }
}


function CollisionCheck () {
  //damage if too close
  //addTP if within parameters
}

function PlayerHP () {
  
}

function EnemyHP () {
  
}