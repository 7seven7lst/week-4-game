'use strict';

const chars = [
	{name: "Darth Vader", healthPoint: 160, baseAttackPower: 10, counterAttackPower: 15},
	{name: "Obi-wan Kenobi", healthPoint: 180, baseAttackPower: 10, counterAttackPower: 15}, 
	{name: "Darth Sidious", healthPoint: 240, baseAttackPower: 8, counterAttackPower: 20},
	{name: "Mace Windu", healthPoint: 170, baseAttackPower: 12, counterAttackPower: 18},
	{name: "Yoda", healthPoint: 300, baseAttackPower: 5, counterAttackPower: 18},
];

function canAttack(starWarGame){
	return starWarGame.playerChar && starWarGame.currentEnemy;
}

function reset(){
	$("#chars-to-pick").text("");
	$("#enemy-characters").text("");
	$("#player-character").text("");
	$("#fight-defender").text("");
	$("#game-status").text("");
}

$(document).ready(function(){
	let faction = $.url().param('faction');
	let audioSourceUrl;
	switch(faction){
		case "alliance":
			audioSourceUrl = "./assets/sounds/main.mp3";
			$("body").css({'background-image': `url("./assets/images/${faction}.png")`, "background-size": "cover"});
			break;
		case "jedi":
			audioSourceUrl = "./assets/sounds/main.mp3";
			$("body").css({'background-image': `url("./assets/images/${faction}.png")`, "background-size": "cover"});
			break;
		case "sith":
			audioSourceUrl = "./assets/sounds/imperial_march.mp3";
			$("body").css({'background-image': `url("./assets/images/${faction}.png")`, "background-size": "cover"});
			break;
		case "other": 
			audioSourceUrl = "./assets/sounds/imperial_march.mp3";
			$("body").css({'background-image': `url("./assets/images/${faction}.png")`, "background-size": "cover"});
			break;
		default:
		audioSourceUrl = "./assets/sounds/main.mp3";
		$("body").css({'background-image': `url("./assets/images/other.png")`, "background-size": "cover"});
	}
	let audio = $("#player");
	$("#audio-source").attr("src", audioSourceUrl);
	audio.load();

	let starWarGame = new StarWarGame(chars);
	$("#attack-button").prop("disabled",true);
  $(document).on("click", "#char-to-pick, #enemy-to-pick, #attack-button, #restart-button", function(e){
    e.preventDefault();
    e.stopPropagation();
		let clickerId = $(this).attr("id");
		let name, selectedChar;
		switch(clickerId){
			case "char-to-pick":
				name = $(this).attr("data-char");
				selectedChar = _.find(starWarGame.charList, char=>char.name===name);
				starWarGame.choosePlayer(selectedChar);
				if (canAttack(starWarGame)){
					$("#attack-button").prop("disabled",false);
				}
				break;
			case "enemy-to-pick":
				name = $(this).attr("data-char");
				selectedChar = _.find(starWarGame.enemyChars, char=>char.name===name);
				starWarGame.chooseEnemyToFight(selectedChar);
				if (canAttack(starWarGame)){
					$("#attack-button").prop("disabled",false);
				}
				break;
			case "attack-button":
				let damage=starWarGame.playerChar.attackEnemy(starWarGame.currentEnemy);
				$("#player-damage").text(`you attacked ${starWarGame.currentEnemy.name} for ${damage.player}`);
				$("#enemy-damage").text(`${starWarGame.currentEnemy.name} attacked you for ${damage.enemy}`);
        starWarGame.playerChar.updateCharacterHPDOM();
        starWarGame.currentEnemy.updateCharacterHPDOM();
        starWarGame.determineGameStatus();
				break;
			case "restart-button":
				reset();
    		starWarGame = new StarWarGame(chars);
    		break;
			default: 
		}
	});
	
});