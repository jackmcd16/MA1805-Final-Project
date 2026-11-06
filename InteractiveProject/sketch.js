//global variables

function setup () {
  createCanvas (1440, 1080);
  rectMode(CENTER);
}

function draw () {
  background(0);

  //constant UI
  fill(0);
  stroke(0, 255, 255);
  rect(width/6, height * .7, 450, 200);

  stroke(0, 255, 255);
  rect(width/2, height * .7, 450, 200);

  stroke(0, 255, 255);
  rect(5 * width/6, height * .7, 450, 200);

  
  playerTurn();

  lifeCheck();

  enemyTurn();
}


function playerTurn () {

}

function enemyTurn () {

  //made attack box
  fill(0);
  stroke(0, 255, 0);
  strokeWeight(5);
  square(width/2, 375, 400);

  //player controls 

}

function lifeCheck () {

}