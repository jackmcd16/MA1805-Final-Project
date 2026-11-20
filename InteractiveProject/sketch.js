
/*

PLANNING CODE

  constant animation
    player
    enemy
  constant UI
    player HP
    TP Bar
  enemy attacks
  mercy and death checks

  switch case to the turnPart

*/


//global variables
// player stats
let TP = 0;
let PercentTP;
let playerHP = 160;
let playerPercentHP;

let playerX = 720;
let playerY = 375;

let enemyHP = 300;
let mercyPercent = 0;

let playerPosition;
let playerBorder;

let turnPart = 0;
let duration = 0;

let playerChoice = 0;
let shiftChoice = false;

let choiceLevel = 1;
let buttonLock = false;

let actSelect = 0;
let shiftAct = false;

let defending = false;



function preload () {

}

function setup () {
  //centering canvas to web window
  let gameWorld = createCanvas(1440, 1080);
  gameWorld.position((windowWidth-width)/2, 0);

  //additional setup
  rectMode(CENTER);
  frameRate(30);
}

function draw () {
  constantUI();

  //turn choice
  if (turnPart == 0) {
    PlayerTurn();
  }
  if (turnPart == 1) {
    EnemyTurn();
    choiceLevel = 1;
    buttonLock = false;
  }
}

function keyPressed () {
  if (keyCode === 37 || keyCode === 39) {
    if (buttonLock == false) {
      shiftChoice = true;
    }
  } else if (keyCode === 38 || keyCode === 40) {
    shiftAct = true;
    shiftItem = true;
  } else if (keyCode === 13) {
    choiceLevel = choiceLevel + 1;
    buttonLock = true;
  } else if (keyCode === 8) {
    buttonLock = false;
    choiceLevel = choiceLevel - 1;
    if (choiceLevel < 1) {
      choiceLevel = 1;
    }
  }
}





function constantUI () {
  //background
  background(0);            //NOTE: ADD BACKGROUND ASSET


  //TP Meter
  PercentTP = 650 - (510 * (TP / 100));

  noStroke();
  fill(150, 0, 0);
  quad(100, 140, 130, 110, 130, 620, 100, 650);

  fill(255, 200, 0);
  quad(100, PercentTP, 130, (PercentTP - 30), 130, 620, 100, 650);

  fill(255);
  textStyle(BOLDITALIC);
  textSize(25);
  textAlign(CENTER);
  text('T', 60, 180);
  text('P', 60, 210);

  text(TP, 65, 240);

  textStyle(ITALIC);
  text('%', 65, 270);


  //player stats
  if (turnPart == 0) {
    playerBorder = [0, 255, 255];
    playerPosition = 700;
  }
  if (turnPart == 1) {
    playerBorder = 50;
    playerPosition = 750;
  }
  fill(0);
  stroke(playerBorder);
  strokeWeight(5);
  rect(width/2, playerPosition, 400, 175);


  //player health bar
  noStroke();
  fill(150, 0, 0);
  rect((width/2) + 100, playerPosition - 30, 170, 20);

  playerPercentHP = playerHP / 160;
  fill(0, 255, 255);
  rect((width/2 + 100) - (85 - (playerPercentHP * 85)), playerPosition - 30, (playerPercentHP * 170), 20);


  //text box
  fill(0);
  stroke(255);
  strokeWeight(5);
  rect(width/2, 900, 1380, 300);
}



function PlayerTurn () {
  //arrows to switch selected button
  //enter to open button

  let buttonX = [-130, -65, 0, 65, 130];

  //base buttons 
  stroke(255, 150, 70);
  strokeWeight(3);
  rect(width/2 - 130, 715, 50, 40);
  rect(width/2 - 65, 715, 50, 40);
  rect(width/2, 715, 50, 40);
  rect(width/2 + 65, 715, 50, 40);
  rect(width/2 + 130, 715, 50, 40);

  //check if arrows are pressed
  if (shiftChoice == true) {
    shiftChoice = false;

    if (keyCode === 37) {
      playerChoice--
    } else if (keyCode === 39) {
      playerChoice++
    }

    //loops if presses left on the far left key, and right on the far right key
    if (playerChoice < 0) {
      playerChoice = 4;
    } else if (playerChoice > 4) {
      playerChoice = 0;
    }
  }
  
  //active button
  stroke(255, 240, 0);
  rect(width/2 + buttonX[playerChoice], 715, 50, 40);

  //if enter is clicked, checks the index to run correct button
  if (choiceLevel >= 2) {

    if (playerChoice == 0) {
      attack();
    } else if (playerChoice == 1) {
      act();
    } else if (playerChoice == 2) {
      item();
    } else if (playerChoice == 3) {
      spare();
    } else if (playerChoice == 4) {
      defend();
    }
  }
}



function attack () {
  //check timer when enter is clicked, compare to parameters for dmg
  // check enemy HP after attack, if at 0 end fight
}


let actions = [
  //[name, TP cost, description]
  ['Check', 0, 'enemy information', 0],
  ['Disconnect', 16, '16 TP, disconnect camera', 30],
  ['Shutdown', 100, '100 TP, shut it down', 100],
]

function act () {
  let textPosition = 840;
  
  for (let i = 0; i < actions.length; i++) {
    if (TP < actions[i][1]) {
      fill(150);
    } else {
      fill(255);
    }
    noStroke();
    textStyle(BOLD);
    textSize(35);
    textAlign(LEFT);
    text(actions[i][0], 100, textPosition)
    textPosition = textPosition + 75;
  }

  let actX = [830, 905, 980];

  if (shiftAct == true) {
    shiftAct = false;

    if (keyCode === 38) {
      actSelect--
    } else if (keyCode === 40) {
      actSelect++
    }

    //loops if presses left on the far left key, and right on the far right key
    if (actSelect < 0) {
      actSelect = actions.length - 1;
    } else if (actSelect >= actions.length) {
      actSelect = 0;
    }
  }

  fill(255, 0, 0);
  circle(70, actX[actSelect], 30);

  fill(100);
  textWrap(WORD);
  text(actions[actSelect][2], 1200, 840, 200);

  if (choiceLevel == 3 && TP >= actions[actSelect][1]) {
    turnPart = 1;
    TP = TP - actions[actSelect][1];
    mercyPercent = mercyPercent + actions[actSelect][3];
    if (mercyPercent > 100) {
      mercyPercent = 0;
    }
  } else {
    if (choiceLevel == 3) {
      choiceLevel = 2;
    }
  }

  //add description of action on the right
  //program each button
  //add description for a few seconds before cutting to gameplay
}



let itemList = [
  //[itemName, health/TP gain, description]
  ['LancerCookie', 50],
  ['ChocDiamond', 80],
  ['HeartDonut', 20],
  ['Darkburger', 70],
  ['ReviveMint', 999],
  ['TensionBit', 32],
]

let shiftItem = false;
let itemSelect = 0;

function item () {
  //use a 2D array to have each item, description and healing factor
  // remove item when used from array, and do the thingy it does

  let textX = 100;
  let textY = 840;

  for (let i = 0; i < itemList.length; i++) {
    if (i == 3) {
      textX = textX + 550;
      textY = 840;
    }
    fill(255);
    noStroke();
    textStyle(BOLD);
    textSize(35);
    textAlign(LEFT);
    text(itemList[i][0], textX, textY)
    textY = textY + 75;
  }

  let itemY = [830, 905, 980, 830, 905, 980];
  let itemX = [70, 70, 70, 620, 620, 620];

  if (shiftItem == true) {
    shiftItem = false;

    if (keyCode === 38) {
      itemSelect--
    } else if (keyCode === 40) {
      itemSelect++
    }

    //loops if presses left on the far left key, and right on the far right key
    if (itemSelect < 0) {
      itemSelect = itemList.length - 1;
    } else if (itemSelect >= itemList.length) {
      itemSelect = 0;
    }
  }

  fill(255, 0, 0);
  circle(itemX[itemSelect], itemY[itemSelect], 30);
}

function spare () {
  // if spare == 100, end the fight
  // else the spare fails
}

function defend () {
  TP = TP + 16;
  if (TP > 100) {
    TP = 100;
  }

  // ADD ANIMATION 
  
  turnPart = 1;
  defending = true;
}




function EnemyTurn () {
  //creates attack box
  fill(0);
  stroke(0, 255, 0);
  strokeWeight(5);
  square(width/2, 375, 400);

  //detect arrow keys for player movement
  if (keyIsDown(UP_ARROW) === true) {
    playerY = playerY - 7;
  } 
  if (keyIsDown(LEFT_ARROW) === true) {
    playerX = playerX - 7;
  }  
  if (keyIsDown(DOWN_ARROW) === true) {
    playerY = playerY + 7;
  } 
  if (keyIsDown(RIGHT_ARROW) === true) {
    playerX = playerX + 7;
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
  circle(playerX, playerY, 30);               //NOTE: REPLACE WITH ASSET

  //enemy attack
  //check if player is hit/graze

  //duration of attack
  duration = duration + 1;

  if (duration/30 == 10) {
    turnPart = 0;
    duration = 0;

    playerX = 720;
    playerY = 375;

    defending = false;
    playerChoice = 0;
  }
}