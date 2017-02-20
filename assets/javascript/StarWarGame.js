class StarWarGame {
  constructor(listOfCharacters) {
    this.duelStatus = "continue";
    this.gameStatus = "continue";
    this.playerChar = null;
    this.currentEnemy = null;
    this.enemyChars = [];
    this.charList = _.map(listOfCharacters, char=>new GameCharacterDOM(char, "char-to-pick"));
    this.currentAttackPower = 0;
    _.forEach(this.charList, char=>char.appendCharacterDOM("#chars-to-pick"));
  }
  
  choosePlayer(player){
    this.playerChar = _.find(this.charList, char=>char.name===player.name);
    this.enemyChars = _.filter(this.charList, char=>char.name!==player.name);
    this.charList = [];
    player.setId("player"); 
    player.appendCharacterDOM("#player-character");
    $("#chars-to-pick").text("");
    _.forEach(this.enemyChars, char=>{
      char.setId("enemy-to-pick");
      char.appendCharacterDOM("#enemy-characters")
    });
  }

  chooseEnemyToFight(enemy){
    this.currentEnemy = _.find(this.enemyChars, char=>char.name===enemy.name);
    this.enemyChars = _.filter(this.enemyChars, char=>char.name!==enemy.name);
    this.currentEnemy.setId("enemy");
    console.log("this.currentEnemy is >>>", this.currentEnemy);
    this.currentEnemy.appendCharacterDOM("#fight-defender");
    this.currentEnemy.removeCharacterFromDOM("#enemy-characters");
  }

  determineDuelStatus() { // determine the status of current duel
    if (this.playerChar.isDead()){
      if (this.currentEnemy.isDead()){
        this.duelStatus = "tie";
      } else {
        this.duelStatus = "lose";
      }
    } else if (this.currentEnemy.isDead()) {
      this.duelStatus = "win";
    } else {
      this.duelStatus = "continue";
    }
  }

  determineGameStatus(){ // determine the status of overall game
    this.determineDuelStatus();
    if (this.duelStatus ==="lose"){ // lose
      this.gameStatus = "lose";
      console.log("you die, game over.");
    } else if (this.duelStatus === "win"){
      console.log("you killed XX, now continue");
      this.currentEnemy.removeCharacterFromDOM("#fight-defender");
      this.currentEnemy = null;
      if (this.enemyChars.length ===0) { // no more ppl to fight
        this.gameStatus = "win";
      } else {
        this.gameStatus = "continue";
      }
    } else if (this.duelStatus === "tie"){ // lose
      console.log("you have died");
      console.log("this.gameStatus is>>>", this.duelStatus); 
      this.currentEnemy.removeCharacterFromDOM("#fight-defender");
      this.currentEnemy = null;
      // if both player have died, then it count as lose
      this.gameStatus = "lose";
    }
  }
}
