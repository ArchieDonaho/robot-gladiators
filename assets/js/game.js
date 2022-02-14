var playerName = prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 20;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
enemyAttack = 10;

var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0){
        var promptfight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptfight === "skip" || promptfight === "SKIP") {
            var confirmSkip = window.confirm("are you sure you'd like to quit?");

            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                playerMoney -= 10
                console.log("playermoney", playerMoney);
                break;
            }
        } 

        //subtract 'playerAttack' from 'enemyhealth'
        enemyHealth -= playerAttack;
        //log resulting message
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        //check enemy health
        if(enemyHealth <= 0){
            window.alert(enemyName + " has died!");
            //award player for winning
            playerMoney += 20;
            //leave while loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //subtract 'enemyAttack' from 'playerHealth'
        playerHealth -= enemyAttack;
        //log resulting message
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
        //check player health
        if(playerHealth <= 0){
            window.alert(playerName + " has died!");
            //leave while loop since player has died
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
}; 

for(var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
    //let player know what round they are in
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    //pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    //reset enemyHealth before starting new fight
    enemyHealth = 50;

    //pass the pickedEnemyName variable's value into the function
    fight(pickedEnemyName[i]);
  } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
  }
}
