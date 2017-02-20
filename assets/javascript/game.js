'use strict';

const chars = [
{name: "Darth Vader", healthPoint: 160, baseAttackPower: 10, counterAttackPower: 15},
{name: "Obiwan", healthPoint: 180, baseAttackPower: 10, counterAttackPower: 15}, 
{name: "Darth Sidious", healthPoint: 240, baseAttackPower: 10, counterAttackPower: 20},
];

$(document).ready(function(){
	let starWarGame = new StarWarGame(chars);
  $(document).on("click", "#char-to-pick, #enemy-to-pick, #attack-button, #restart-button", function(e){
    e.preventDefault();
    e.stopPropagation();
		let clickerId = $(this).attr("id");
		let name, selectedChar;
    console.log("clickerId is>>>", clickerId);
		switch(clickerId){
			case "char-to-pick":
				name = $(this).attr("data-char");
				selectedChar = _.find(starWarGame.charList, char=>char.name===name);
        console.log("selectedChar is >>>", selectedChar);
				starWarGame.choosePlayer(selectedChar);
				break;
			case "enemy-to-pick":
				name = $(this).attr("data-char");
				selectedChar = _.find(starWarGame.enemyChars, char=>char.name===name);
				starWarGame.chooseEnemyToFight(selectedChar);
				break;
			case "attack-button":
        console.log("playerChar is >>>", starWarGame);
				let damage=starWarGame.playerChar.attackEnemy(starWarGame.currentEnemy);
				console.log("damage is >>>>", damage);
        starWarGame.playerChar.updateCharacterHPDOM();
        starWarGame.currentEnemy.updateCharacterHPDOM();
        starWarGame.determineGameStatus();
				break;
			case "restart-button":
        starWarGame = new StarWarGame(chars);
        break;
			default: 
		}
	});
	
});