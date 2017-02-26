class GameCharacterDOM {
	constructor(character, id) {
	  this.name = character.name;
	  this.healthPoint = character.healthPoint;
	  this.maxHealthPoint = character.healthPoint;
	  this.baseAttackPower = character.baseAttackPower;
	  this.counterAttackPower = character.counterAttackPower;
	  this.currentAttackPower = this.baseAttackPower;
	  this.id = id;
	  this.charDom = $("<div>");
	  this.charDom.attr({"id": this.id, "data-char": this.name});
	  this.charTitle = $("<h6>");
  	this.charTitle.attr({"id": "current-character-title"});
  	this.charTitle.text(this.name);
  	this.charImg = $("<img>");
  	this.charImg.attr({
  		"id": "current-character-img",
  		"src": `./assets/images/${this.name}.png`,
  		"width": 100,
  		"height": 150,
  	});
  	this.charImgContainer = $("<div>");
  	
  	this.charImgContainer.append(this.charImg);
  	this.charHPBar = $("<progress>");
  	this.charHPBar.attr({"id": "health-bar", "class": "health-bar-display", "value": 100, "max": 100});
  	this.charHP = $("<div>");
  	this.charHP.attr({"id": "current-character-hp"});
  	this.charHP.text(this.healthPoint);
  	
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

	appendCharacterDOM(targetSelector, cardBackground){
		this.charImgContainer.attr({
			"id": "current-character-img-container",
			"class": cardBackground
		})
		this.charDom.append(this.charTitle, this.charImgContainer, this.charHPBar, this.charHP);
  	$(targetSelector).append(this.charDom);
	}

	updateCharacterHPDOM() {
		this.charHP.text(this.healthPoint);
		let hpValue = this.healthPoint / this.maxHealthPoint *100;
		this.charHPBar.attr("value", hpValue);
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