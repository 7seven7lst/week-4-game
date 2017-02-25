class GameCharacterDOM {
	constructor(character, id) {
	  this.name = character.name;
	  this.healthPoint = character.healthPoint;
	  this.baseAttackPower = character.baseAttackPower;
	  this.counterAttackPower = character.counterAttackPower;
	  this.currentAttackPower = this.baseAttackPower;
	  this.id = id;
	  this.charDom = $("<div>");
	  this.charDom.attr({"id": this.id, "data-char": this.name});
	  this.charTitle = $("<h6>");
  	this.charTitle.attr({"id": "current-character-title"});
  	this.charTitle.text(this.name);
  	this.charHP = $("<span>");
  	this.charHP.attr({"id": "current-character-hp"});
  	this.charHP.text(this.healthPoint);
  	this.charHPBar = $("<progress>");
  	this.charHPBar.attr({"id": "health-bar", "value": 100, "max": 100});
  	this.charImg = $("<img>");
  	this.charImg.attr({
  		"id": "current-character-img",
  		"src": "./assets/images/darth_vader.png",
  		"width": 100,
  		"height": 100,
  	});
  	this.charDom.append(this.charTitle, this.charHP, this.charHPBar, this.charImg);
	}

	attackEnemy(enemy){
		this.deductHitPoints(enemy.counterAttackPower);
		enemy.deductHitPoints(this.currentAttackPower);
		let damageHiLight = {player: this.currentAttackPower, enemy: enemy.counterAttackPower};
		this.currentAttackPower += this.baseAttackPower;
		return damageHiLight;
	}

	deductHitPoints(hp){
		this.healthPoint = this.isDead() ? 0: this.healthPoint - hp;
	}

	isDead(){
		return this.healthPoint <= 0;
	}

	appendCharacterDOM(targetSelector){
    	$(targetSelector).append(this.charDom);
	}

	updateCharacterHPDOM() {
		this.charHP.text(this.healthPoint);
	}

	removeCharacterFromDOM(targetSelector){
		let self = this;
		$(`${targetSelector} > div`).each(function () {
			if($(this).attr('data-char')===self.name){
			  $(this).remove();
			}
		});
	}

	setId(id){
		this.id=id;
		this.charDom.attr("id", this.id);
	}
}