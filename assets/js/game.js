var playerName = prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
enemyAttack = 10;

//if we want a random number between 'min' and 'max', we use the function below
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
  
    // randomly change turn order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
  
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
        }
  
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
        );
  
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + " has died!");
  
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
  
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // player gets attacked first
      } else {
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
        // remove player's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
        );
  
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + " has died!");
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
      }
      // switch turn order for next round
      isPlayerTurn = !isPlayerTurn;
    }
  };


var endGame = function() {
    //if player is still alive, player wins
    if(playerHealth > 0){
        window.alert("Great job, you've survived the game! You now hava a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing robot Gladiators! Come back again soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if(playerMoney >= 7){
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth += 20;
                playerMoney -= 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "UPGRADE":
        case "upgrade":
            if(playerMoney >= 7){
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerAttack =+ 6;
                playerMoney -= 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

//function to start a new game
var startGame = function() {
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            //let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            //reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);

            //pass the pickedEnemyName variable's value into the function
            fight(pickedEnemyName[i]);
            //if we're not at the last enemy in teh array
            if( playerHealth > 0 && i < enemyNames.length - 1){
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if(storeConfirm){
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //after loop ends, player is either out of health or enemies to fight, so run the endgame function
    endGame();
};

startGame();{
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
}

