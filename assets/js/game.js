var playerName = prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
enemyHealth = 50;
enemyAttack = 10;

var fight = function(enemyName) {
    //alert players that the game is starting
    window.alert("Welcome to robot Gladiators!");
    var promptfight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    if(promptfight === "fight" || promptfight === "FIGHT"){
         //subtract 'playerAttack' from 'enemyHealth'
        enemyHealth -= playerAttack;
        //log resulting message
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        //check enemy health
        if(enemyHealth <= 0){
            window.alert(enemyName + " has died!");
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
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } else if (promptfight === "skip" || promptfight === "SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("are you sure you'd like to quit?");
        
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            playerMoney -= 2;
        } else {
            fight();
        }
    } else {
        window.alert("You need to choose a valid option. Try again!");
    }
   
    
};

for(var i = 0; i < enemyNames.length; i++) {
    fight(enemyNames[i]);
}
