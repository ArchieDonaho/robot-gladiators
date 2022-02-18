//if we want a random number between 'min' and 'max', we use the function below
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}


var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    promptFight = promptFight.toLowerCase();
    if(promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    if(promptFight === "skip"){
        var confirmSkip = window.confirm("are you sure you'd like to quit?");

        if(confirmSkip){
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
    return false;
}


var fight = function(enemy) {
    console.log(enemy);
    var isPlayerTurn = true;
    if(Math.random() > 0.5){
        isPlayerTurn = false;
    }

    while (enemy.health > 0 && playerInfo.health > 0){
        if(isPlayerTurn){
            if(fightOrSkip()) {
                //if true, leave fight by breaking the loop
                break;
            }
            
            //generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            //log resulting message
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
            //check enemy health
            if(enemy.health <= 0){
                window.alert(enemy.name + " has died!");
                //award player for winning
                playerInfo.money += 20;
                //leave while loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {
            //subtract 'enemy.attack' from 'playerInfo.health'
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - enemy.attack);
            //log resulting message
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            //check player health
            if(playerInfo.health <= 0){
                window.alert(playerInfo.name + " has died!");
                //leave while loop since player has died
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
}; 


var endGame = function() {
    var highScore = localStorage.getItem("score");
    if(highScore === null){
        highScore = 0;
    }
    //if player is still alive, player wins
    if(playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now hava a score of " + playerInfo.money + ".");
        if( playerInfo.money >= highScore ){
            console.log("Congrats, " + playerInfo.name +  " beat the high score of " + localStorage.getItem("score"));
            localStorage.setItem("score", playerInfo.money);       
            localStorage.setItem("name", playerInfo.name); 
        } else {
            console.log(playerInfo.name +  " did not beat the high score of " + highScore);
        }
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE' to make a choice."
    );

    switch (parseInt(shopOptionPrompt)) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
}

var getPlayerName = function() {
    var name = "";

    while(name === "" || name === null){
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        //reset values each time the object is called
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
        
    },
    upgradeAttack: function() {
        if(this.money >= 7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [{name: "Roberto", attack: randomNumber(10, 14)}, 
                 {name: "Amy Android", attack: randomNumber(10, 14)}, 
                 {name: "Robo Trumble", attack: randomNumber(10, 14)}
                ];
debugger;
//function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            console.log(pickedEnemyObj);

            //pass the pickedenemy.name variable's value into the function
            fight(pickedEnemyObj);
            //if we're not at the last enemy in teh array
            if( playerInfo.health > 0 && i < enemyInfo.length - 1){
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
}

