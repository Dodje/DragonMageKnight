$(function() {

  var idInterval;

  // function GameConfig(gameStatus, playerName, princessSex, userScore, computerScore){
  //   this.gameStatus = gameStatus;
  //   this.playerName = playerName;
  //   this.princessSex = princessSex;
  //   this.userScore = userScore;
  //   this.computerScore = computerScore;
  // }
  class GameConfig {
    constructor(gameStatus, playerName, princessSex, userScore, computerScore, currentStage) {
      this.gameStatus = gameStatus;
      this.playerName = playerName;
      this.princessSex = princessSex;
      this.userScore = userScore;
      this.computerScore = computerScore;
      this.currentStage = currentStage;
    }

    setUserScore(number){
      this.userScore = number;
    }

    setComputerScore(number){
      this.computerScore = number;
    }

    getUserScore(){
      return this.userScore;
    }

    getComputerScore(){
      return this.computerScore;
    }

    increaseComputerScore(){
      return ++this.computerScore;      
    }

    increaseUserScore(){
      return ++this.userScore;
    }

    setGameStatus(gameStatus){
      this.gameStatus = gameStatus;
    }

    getGameStatus(){
      return this.gameStatus;
    }

    setPrincessSex(princessSex){
      this.princessSex = princessSex;
    }

    getPrincessSex(){
      return this.princessSex;
    }

    setCurrentStage(currentStage){
      this.currentStage = currentStage;
    }

    getCurrentStage(){
      return this.currentStage;
    }

  }

  class Stage{
    constructor(userChoice, computerChoice, win, name){
      this.userChoice = userChoice;
      this.computerChoice = computerChoice;
      this.win = win;
      this.name = name;
    }

    // getComputerChoice(){
    //   return computerChoice;
    // }
  }

  var stage = new Stage('','',false,'');

  var stages = [
    new Stage('','',false,''),
    new Stage('','',false,''),
    new Stage('','',false,'')
  ]

  
  


  var playerFrameDom = {
    frame:         document.querySelector('.player-frame'),
    actions:       document.querySelector('.player-actions'),
    healthNumber:  document.querySelector('.player-health > span'),
    healthFill:    document.querySelector('.player-health > .color-fill'),
    abilities:     document.querySelector('.player-abilities'),
    icon:          document.querySelector('.player-icon')
  };

  var computerFrameDom = {
    frame:         document.querySelector('.computer-frame'),
    actions:       document.querySelector('.computer-actions'),
    healthNumber:  document.querySelector('.computer-health > span'),
    healthFill:    document.querySelector('.computer-health > .color-fill'),
    abilities:     document.querySelector('.computer-abilities'),
    icon:          document.querySelector('.computer-icon')
  };

  class Fighter{
    constructor(damage, health, healthCoefficient, abilities){
      this.damage = damage;
      this.health = health;
      this.abilities = abilities; 
      
      this.healthCoefficient = healthCoefficient;

      this.defaultHealth = this.healthCoefficient*this.health;
      this.currentHealth = this.healthCoefficient*this.health;
    }

    setCurrentHealth(health){
      this.currentHealth = this.currentHealth + health;
      if(this.currentHealth > this.defaultHealth) this.currentHealth = this.defaultHealth;
      if(this.currentHealth < 0) this.currentHealth = 0;
    }
    getCurrentHealth(){
      return this.currentHealth;
    }

    getCurrentHealthPercentage(){
      return 100 - (this.defaultHealth - this.currentHealth)/this.defaultHealth*100;
    }

    getDealDmg(){
      return  2 + this.damage;
    }

    getAbilities(){
      return this.abilities;
    }

    getAbility(number){
      return this.abilities[number];
    }
  }


  
  

  class Knight extends Fighter {
    constructor(damage, health,healthCoefficient, abilities){
      super(damage, health, healthCoefficient, abilities);
          
    }
    

    usebow(targetPercentageHealth){
      return 5 + Math.floor(this.damage/4 + this.damage*targetPercentageHealth*2/100);
    }

    usePotion(){
      if(this.currentHealth != this.defaultHealth)
        return Math.floor((this.defaultHealth - this.currentHealth)*4/10);
      return 0;
    }

  }

  

  class Mage extends Fighter {
    constructor(damage, health,healthCoefficient, abilities){
      super(damage, health, healthCoefficient, abilities);
    }

    useFreeze(){
      return [this.damage * 2, 0.7];
    }
    
  }

  class Dragon extends Fighter {
    constructor(damage, health,healthCoefficient, abilities){
      super(damage, health, healthCoefficient, abilities);
    }

  }

  class Ability{
    constructor(name, cooldown, onCooldown, value){
      this.name = name;
      this.cooldown = cooldown;
      this.onCooldown = onCooldown;
      this.value = value;
    }
  }

  class Sword extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);

    }

    getDescription(){
      return `Удар мечом нанесет ${this.value} ед. урона противнику.`;
    }
  }

  class Bow extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);
    }

    getDescription(){
      return `Выстрел из лука нанесет ${this.value} ед. урона противнику.`;
    }
  }

  class Potion extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);
    }

    getDescription(){
      return `Выпейте зелье, чтобы восстановить ${this.value} ед. здоровья. Зависит от текущего здоровья.`;
    }
  }

  class Wand extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);
    }

    getDescription(){
      return `Слабая атака наносит ${this.value} ед. урона, но снижает урон от некоторых атак противника.`;
    }
  }

  class Ice extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);
    }

    getDescription(){
      return `Слабая атака наносит ${this.value} ед. урона, но снижает урон от всех атак противника.`;
    }
  }

  class Storm extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);
    }

    getDescription(){
      return `Мощная атака наносит ${this.value} ед. урона.`;
    }
  }

  class Claws extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);
    }

    getDescription(){
      return `Яростная атака когтями наносит ${this.value} ед. урона.`;
    }
  }

  class Fire extends Ability{
    constructor(name, cooldown, onCooldown, value){
      super(name, cooldown, onCooldown, value);
    }

    getDescription(){
      return `Дыхание огнем воспламеняет жерту, нанося ей ${this.value} ед. урона.`;
    }
  }

  var knightAbilities = [
     new Sword('sword', 1, false, 20),
     new Bow('bow', 5, false, 45),
     new Potion('potion', 8, false, 60)
  ];

  var computerKnightAbilities = [
    new Sword('sword', 1, false, 20),
    new Bow('bow', 5, false, 45),
    new Potion('potion', 8, false, 60)
 ];

  var mageAbilities = [
    new Wand('wand', 1, false, 20),
    new Ice('ice', 5, false, 45),
    new Storm('storm', 10, false, 90)
  ];

  var computerMageAbilities = [
    new Wand('wand', 1, false, 20),
    new Ice('ice', 5, false, 45),
    new Storm('storm', 10, false, 90)
  ];

  var dragonAbilities = [
    new Claws('claws', 1, false, 20),
    new Fire('fire', 5, false, 45)
  ];

  var computerDragonAbilities = [
    new Claws('claws', 1, false, 20),
    new Fire('fire', 5, false, 45)
  ];

  // var sword = new Ability('sword', 1, false, 20);
  // var bow = new Ability('bow', 5, false, 45);
  // var potion = new Ability('potion', 8, false, 60);

  var wand = new Ability('wand', 1, false, 20);
  var ice = new Ability('ice', 3, false, 40);


  var player, computer;

  var knight = new Knight(10, 100, 2, knightAbilities);
  var mage = new Mage(20, 80, 2, mageAbilities);
  var dragon = new Dragon(20, 90, 3, dragonAbilities);

  var computerKnight = new Knight(10, 100, 2, computerKnightAbilities);
  var computerMage = new Mage(20, 80, 2, computerMageAbilities);
  var computerDragon = new Dragon(20, 90, 3, computerDragonAbilities);
  









  function updateCharacters(char){
    char.setCurrentHealth(char.defaultHealth);
  }


  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function animateAbilites(character, ability){

    let characterFrame; 
    if(character === player) {
      characterFrame = playerFrameDom.abilities.children[ability];
    } else {
      characterFrame = computerFrameDom.abilities.children[ability];
    }
 

    if(characterFrame.classList.contains('animated')){
      characterFrame.classList.remove('animated');
      setTimeout(function(){
        characterFrame.classList.add('animated');
      }, 100);
    }  else {
      characterFrame.classList.add('animated')
    }    
    
  }

  function replaceAbilities(person, abilities){
    
    if(person == 'player') {

      for(let i = 0; i < abilities.length; i++) {

        let ability = document.createElement('div');
        ability.classList.add('player-ability', `ability_${abilities[i].name}`);

        let icon = document.createElement('img');
        icon.src = `img/icon_${abilities[i].name}.png`;
        // console.log(icon); 

        let description = document.createElement('div');
        description.classList.add('player-ability__description');
        description.innerHTML = abilities[i].getDescription();

        console.log(description);
        


        ability.appendChild(icon);  
        ability.appendChild(description);  
        playerFrameDom.abilities.appendChild(ability);

      }   
    }
    else if(person == 'computer'){
      for(let i = 0; i < abilities.length; i++) {

        let ability = document.createElement('div');
        ability.classList.add('computer-ability', `ability_${abilities[i].name}`);

        let icon = document.createElement('img');
        icon.src = `img/icon_${abilities[i].name}.png`;
        // console.log(icon); 
        ability.appendChild(icon);
        computerFrameDom.abilities.appendChild(ability);
      }   
    }
  }

  function updateCurrentHealth(target){
    let targetFrame;
    if(target === player) { targetFrame = playerFrameDom; } 
    else { targetFrame = computerFrameDom; }
    targetFrame.healthNumber.innerHTML = target.getCurrentHealth();
    targetFrame.healthFill.style.maxWidth = target.getCurrentHealthPercentage() + '%';
  }


  function clearNumbers(person){
    let targetFrame;

    switch(person){
      case player:
        targetFrame = playerFrameDom;
        break;
      case computer:
        targetFrame = computerFrameDom;
        break;
    }

    targetFrame.actions.innerHTML = '';
  }

  function showNumbers(person, value){

    let target;
    let targetFrame;

    switch(person){
      case player:
        target = 'player';
        targetFrame = playerFrameDom;
        break;
      case computer:
        target = 'computer';
        targetFrame = computerFrameDom;
        break;
    }

    let randomXY = [randomInteger(-20, 35), randomInteger(-20, 35)]

    let numberWrapper = document.createElement('div');
    if(value > 0) {
      numberWrapper.classList.add(`${target}-got-heal`, 'numericAnimation');
    } else if(value <= 0) {
      numberWrapper.classList.add(`${target}-got-dmg`, 'numericAnimation');
    }
    
    numberWrapper.style.top = 20 + randomXY[1] + 'px';
    numberWrapper.style.right = 10 + randomXY[0] + 'px';
    numberWrapper.innerHTML = value;

    

    targetFrame.actions.appendChild(numberWrapper);



  }

  function computerMove(){
    
    let randomAbility = randomInteger(0,computer.abilities.length-1);

    

      let ability = computer.getAbility(randomAbility);
      console.log(ability);
      
      console.log('computer ability cooldown: ' +  ability.onCooldown);
      if(!isOnCooldown(ability)){

        

        showTimer(computer, ability, randomAbility);
        
        // healing logic for knight
        if(ability.name === 'potion'){

          if(player.getCurrentHealthPercentage() < 60) {
            computer.setCurrentHealth(ability.value); 
            updateCurrentHealth(computer); 
            showNumbers(computer, ability.value);
            animateAbilites(computer, randomAbility);
            createSound(ability.name);
          } else {
            computerMove();
          }

        }
        // !healing logic for knight
        else { 
          player.setCurrentHealth(-ability.value); 
          updateCurrentHealth(player); 
          showNumbers(player, -ability.value);
          animateAbilites(computer, randomAbility);
          createSound(ability.name);
        }
        
        ability.onCooldown = true;            
        checkOnStageWin();
      } else {
        computerMove();
      }  
    }
 


  

  function replacePlayerFrame(){
    playerFrameDom.healthNumber.innerHTML = player.getCurrentHealth();
    playerFrameDom.healthFill.style.maxWidth = player.getCurrentHealthPercentage() + '%';
    if(player === knight){    
      playerFrameDom.icon.setAttribute('src', `img/frame_knight.png`);
      playerFrameDom.abilities.innerHTML = '';
      replaceAbilities('player', knight.getAbilities());
    } else if(player === mage){    
      playerFrameDom.abilities.innerHTML = '';
      playerFrameDom.icon.setAttribute('src', `img/frame_mage.png`);
      replaceAbilities('player', mage.getAbilities());
    } else {    
      playerFrameDom.abilities.innerHTML = '';
      playerFrameDom.icon.setAttribute('src', `img/frame_dragon.png`);
      replaceAbilities('player', dragon.getAbilities());
    }
  }
  

  function replaceComputerFrame(){
    computerFrameDom.healthNumber.innerHTML = computer.getCurrentHealth();
    computerFrameDom.healthFill.style.maxWidth = computer.getCurrentHealthPercentage() + '%';
    if(computer === computerKnight ){    
      computerFrameDom.icon.setAttribute('src', `img/frame_knight.png`);
      computerFrameDom.abilities.innerHTML = '';
      replaceAbilities('computer', computerKnight.getAbilities());
    } else if(computer === computerMage){    
      computerFrameDom.icon.setAttribute('src', `img/frame_mage.png`);
      computerFrameDom.abilities.innerHTML = '';
      replaceAbilities('computer', computerMage.getAbilities());
    } else {    
      computerFrameDom.icon.setAttribute('src', `img/frame_dragon.png`);
      computerFrameDom.abilities.innerHTML = '';
      replaceAbilities('computer', computerDragon.getAbilities());
    }
  }


  var gameConfig = new GameConfig(true, 'Игрок', 'female', 0, 0, 0);
  // localStorage.setItem('gameIsNew', 'true');

  function checkStorageBoolean(pre){
    if(localStorage.getItem(pre)) {
      return localStorage.getItem(pre) === 'true'? true : false;
    }
    return true;
   
  }


  gameConfig.setGameStatus(checkStorageBoolean('gameIsNew'));
  gameConfig.setPrincessSex(localStorage.getItem('princessSex'));
  // console.log(gameConfig.gameStatus + '  ' + gameConfig.princessSex);

  
  

  //-----PREGAME---------


 
  var playerName = document.querySelector('#user-label'); 
  var fieldName = document.querySelector('.type-player-name');
  const PREVIEW = document.querySelector('.preview');
  const RULES = document.querySelector('.rules');
  const PRINCEBUNDLE = document.querySelector('.prince-bundle');
  var princeIcon = document.querySelectorAll('.prince-bundle img');
  var princeScoreIcon = document.querySelectorAll('.score-container img');

  const GAME_WRAPPER = document.querySelector('.game');

  function showGame(){
    GAME_WRAPPER.classList.remove('hide');
    
  }

  function removePreviewWindow(){
    PREVIEW.style.opacity = "0";
    PREVIEW.style.display = "none"
    // setTimeout(function(){PREVIEW.style.display = "none"}, 100);
    // let headerLoading = document.querySelector('.header-loading');
    // headerLoading.classList.remove('header-loading');
  }

  function removeRules(){
    RULES.style.opacity = "0";
    setTimeout(function(){RULES.style.display = "none"}, 100);
  }

  function replacePrince(sex){
    if(gameConfig.getGameStatus()){
      localStorage.setItem('princessSex', sex);
      for(let i = 0; i < princeScoreIcon.length; i++){
        princeScoreIcon[i].style.display = 'none';
        if(sex === 'female' && i === 0){
          princeScoreIcon[i].style.display = 'block';
        } else if(sex === 'male' && i === 1) {
          princeScoreIcon[i].style.display = 'block';
        }
      }
      // console.log(localStorage.getItem('princessSex'));        
      
    } else {
      let sex = localStorage.getItem('princessSex');
      for(let i = 0; i < princeScoreIcon.length; i++){
        princeScoreIcon[i].style.display = 'none';
        if(sex === 'female' && i === 0){
          princeScoreIcon[i].style.display = 'block';
        } else if(sex === 'male' && i === 1) {
          princeScoreIcon[i].style.display = 'block';
        }
      }
    }
  }

  function showPrinceBundle(){
    PRINCEBUNDLE.style.display = 'block';
    PRINCEBUNDLE.style.opacity = "1";

  }

  function replacePlayerName(){
    if(gameConfig.getGameStatus()){
      playerName.innerHTML = fieldName.value;
      localStorage.setItem('playerName', playerName.innerHTML);
      removeRules();
      showPrinceBundle();
    } else{
      playerName.innerHTML = localStorage.getItem('playerName');
      removeRules();
    }
  }


  if(gameConfig.getGameStatus()){
    // Set new playerName
    fieldName.addEventListener('keyup',
    function(e){
      e.preventDefault();
      event = e || windows.event;
      if (event.keyCode === 13) {
        replacePlayerName();
        console.log(gameConfig.getGameStatus());     
      }    
    }, false);
    // Set new princess

    for(let i = 0; i < princeIcon.length; i++) {
      princeIcon[i].addEventListener('click', function(e){
        e.preventDefault();
        
        let sex = (i === 0) ? 'female' : 'male';

        // console.log(sex);
        replacePrince(sex);
        removePreviewWindow();  
        showGame();  
        localStorage.setItem('gameIsNew', 'false');    
      });
    }

  } else{
    replacePlayerName();
    replacePrince();
    removePreviewWindow();
    showGame();
  }



  

  
  // removePreviewWindow();
  //--------/PREGAME------------


  const FIGHT_WRAPPER = document.querySelector('.fight-wrapper');
  const userScore_span = document.querySelector('#user-score');
  const computerScore_span = document.querySelector('#computer-score');
  const scoreBoard_div = document.querySelector('.score-board');
  const result_p = document.querySelector('.result > p');
  const knight_div = document.querySelector('#knight');
  const mage_div = document.querySelector('#mage');
  const dragon_div = document.querySelector('#dragon');
  const NEW_GAME = document.querySelector('.new-game');
  const NEW_SCORE = document.querySelector('.new-score');
  const ACTION_MESSAGE = document.querySelector('#action-message');
  const CHOICE_FRAME = document.querySelectorAll('.choice');
  const CHOICES_WRAPPER = document.querySelector('.choices');

  const MAP_AREA = document.querySelector('.map');
  const MAP_BUTTON = document.querySelector('.map__show-button');
  const MAP_STAGES = document.querySelector('.stages');


  MAP_BUTTON.addEventListener('click', function(){
    if(MAP_AREA.classList.contains('hidden')){
      MAP_AREA.classList.remove('hidden');
    } else {
      MAP_AREA.classList.add('hidden')
    }
  }, false);

 
  FIGHT_WRAPPER.style.marginTop = `-${FIGHT_WRAPPER.clientHeight}px`;
  // console.log(FIGHT_WRAPPER.clientHeight);


  function hideChoiceWrapper() {
    CHOICES_WRAPPER.classList.add('hide');
    CHOICES_WRAPPER.style.marginTop = `-${CHOICES_WRAPPER.clientHeight}px`;
  }

  function showChoiceWrapper(){
    CHOICES_WRAPPER.classList.remove('hide');
    CHOICES_WRAPPER.style.marginTop = `30px`;
  }

  function hideFightWrapper(){
    FIGHT_WRAPPER.classList.add('hide');
    FIGHT_WRAPPER.style.marginTop = `-${FIGHT_WRAPPER.clientHeight}px`;
  }

  function getComputerChoice(){
    const choices = ['knight', 'mage', 'dragon'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
    
  }

  function showActionMessage(userChoice, computerChoice){
    // Create new element just for fun
    // let USER_CHOICE = document.createElement('span');
    // USER_CHOICE.setAttribute('style', 'position: absolute; left: 0; top: 100%; color: #f1bfbf');
    // USER_CHOICE.innerHTML = userChoice;
    // playerName.appendChild(USER_CHOICE);
  }


  function checkOnWin(){
    if(gameConfig.getUserScore() === 3){
      // console.log(gameConfig.getUserScore());
      
      // console.log('win');
     
      newScore();
    }
  }

  function showWinMessage(userChoice, computerChoice){

    // console.log(userChoice + " and " + computerChoice);
    
    switch(userChoice + computerChoice){
      case 'knightknight':
        return 'Ваш рыцарь сильнее!';
      case "knightmage":
        return 'Вражеский маг лишился языка, и не смог продолжить бой.';
      case "knightdragon":
        return 'Ваш Рыцарь ловко побеждает дракона!';
      case "magemage":
        return 'Ваш маг оказался проворнее!';
      case "mageknight":
        return 'Ваше заклинание размазало вражеского рыцаря по стенке..';
       case "dragonmage":
        return 'Вражеский маг оказался не таким вкусным, Ваш дракон закопал его где-то под камнем.';
      default:
        return '';
    }
  }

  function showLoseMessage(userChoice, computerChoice){
    // console.log('show loos: ' + userChoice + ' & ' + computerChoice);
    
    switch(userChoice + computerChoice){
      case 'knightknight':
        return 'Ваш рыцарь потерпел поражение от Азуфаровского подлеца';
      case "knightmage":
        return 'Ваш Рыцарь повержен подлым магом!';
      case "knightdragon":
        return 'Вашему бойцу не хватило упорства против такого чудовищного зверя!';
      case "magedragon":
       return 'Вражеский дракон выплюнул Вас не дожевав...';
      case "dragonknight":
       return 'Ваш дракон оказался неповоротлив, он буквально застрял в пещере.';
      default:
        return '';
    }
  }


  function clearColorFrame() {
    for(let i = 0; i < CHOICE_FRAME.length; i++){
      let classList = CHOICE_FRAME[i].classList;
      while (classList.length > 1) {
        classList.remove(classList.item(1));
     }
    }
  }
  function colorFrame(choice, color){
    
    document.querySelector('#' + choice).classList.add(color);
    // setTimeout(() => document.querySelector('#' + choice).classList.remove(color), 900);
  }
 

  function colorStageFrame(num){
    let MAP_STAGE = document.querySelectorAll('.stage');
    MAP_STAGE[num].classList.add('win');
  }
  
  function win(userChoice, computerChoice){
    gameConfig.increaseUserScore();
    userScore_span.innerHTML = gameConfig.getUserScore();
    result_p.innerHTML = showWinMessage(userChoice, computerChoice);
    result_p.style.color = '#bff1bf'; //
    clearColorFrame();
    colorFrame(computerChoice, 'azufar-glow');
    colorFrame(userChoice, 'green-glow');      
    clearNumbers(player); 
    clearNumbers(computer); 

 
  }

  function lose(userChoice, computerChoice){
    gameConfig.increaseComputerScore();
    computerScore_span.innerHTML = gameConfig.getComputerScore();
    result_p.innerHTML = showLoseMessage(userChoice, computerChoice);
    result_p.style.color = '#f1bfbf';
    clearColorFrame();
    colorFrame(userChoice, 'red-glow');
    colorFrame(computerChoice, 'azufar-glow');
    clearNumbers(player); 
    clearNumbers(computer); 
    
  }

  function draw(userChoice, computerChoice){
    result_p.innerHTML = showDrawMessage(userChoice, computerChoice);
    result_p.style.color = '#f1efbf';
    clearColorFrame();
    colorFrame(userChoice, 'yellow-glow');
    // colorFrame(computerChoice, 'half-glow');
  }

 
  function setCurrentStage(){
    stage = stages[gameConfig.getCurrentStage()];
    console.log('current stage is  ' + stage.computerChoice);
     
  }

  function computerChoice(){

    const computerChoice = stage.computerChoice;

    console.log(stage);
    

    switch(computerChoice) {
      case 'knight':
        computer = computerKnight; 
        replaceComputerFrame();
        break;
      case 'mage':
        computer = computerMage;
        replaceComputerFrame();
        break;
      case 'dragon':
        computer = computerDragon;
        replaceComputerFrame();
        break;
    }    

  }

  function game(userChoice){

    setCurrentStage();

    hideChoiceWrapper();
    FIGHT_WRAPPER.classList.remove('hide');
    FIGHT_WRAPPER.style.marginTop = `30px`;


    switch(userChoice) {
      case 'knight':
        player = knight;
        stage.userChoice = userChoice;
        // console.log('user choice: ' + stage.userChoice);
        computerChoice();
        replacePlayerFrame();  
        stageFight();
        break;
      case 'mage':
        player = mage;
        stage.userChoice = userChoice;
        replacePlayerFrame();
        computerChoice();
        stageFight()
        break;
      case 'dragon':
        player = dragon;
        stage.userChoice = userChoice;
        replacePlayerFrame();
        computerChoice();
        stageFight();
        break;
    }  
  }

  function updateStage(){

    stages[gameConfig.currentStage].win = 'Player'; 
    colorStageFrame(gameConfig.currentStage);
    console.log(gameConfig.currentStage);
    
    gameConfig.currentStage++;

  }

  function checkOnStageWin(){
    if(computer.getCurrentHealth() < 1){
      updateStage();
      win(stage.userChoice, stage.computerChoice);   
      clearInterval(idInterval);
      // showActionMessage(stage.userChoice, stage.computerChoice);    
      setTimeout(function(){
        hideFightWrapper();   
        updateCharacters(player);
        updateCharacters(computer);
        showChoiceWrapper();
      }, 1200);     
     
    } else if(player.getCurrentHealth() < 1){
      lose(stage.userChoice, stage.computerChoice);   
      clearInterval(idInterval);
      // showActionMessage(stage.userChoice, stage.computerChoice);
      setTimeout(function(){
        hideFightWrapper();   
        updateCharacters(player);
        updateCharacters(computer);
        showChoiceWrapper();
      }, 1200);   
    } 
    // else {
    //   console.log('just nothing');
    // }

  
  }

  function createNewGame(){
    localStorage.setItem('gameIsNew', 'true');
    gameConfig.userScore++;
    document.location.reload(true);
  }

  function newScore(){
    gameConfig.setComputerScore(0);
    computerScore_span.innerHTML = gameConfig.getComputerScore();
    gameConfig.setUserScore(0);
    userScore_span.innerHTML = gameConfig.getUserScore();
    result_p.innerHTML = 'Азуфар наступает!'
    result_p.style.color = '#ffffff';
    clearColorFrame();
  }

  function createCoolDownLayer(value){
    let cd = document.createElement('div');
    cd.classList.add('ability-cooldown');

    let timer = document.createElement('span');

    timer.innerHTML = value;

    cd.appendChild(timer);

    // console.log(cd);

    return cd;
   
  }

  function isOnCooldown(ability){
    if(ability.onCooldown === true) {
      return true;
    }

    let timerId = setTimeout(function(){
      ability.onCooldown = false;
      return false;
    }, ability.cooldown*1000);
  }
  
  // Getting person object, ability name and abilityNumber in the row of players abilities and creating 
  // the timer which does not allow as click too quickly
  function showTimer(person, ability, abilityNumber){
    let targetFrame;
    if(person === player) targetFrame = playerFrameDom;
    if(person === computer) targetFrame = computerFrameDom;
    let cooldownView = targetFrame.abilities.children[abilityNumber].appendChild(createCoolDownLayer(ability.cooldown));
    let timerAbility = ability.cooldown;
    let intervalTimer = setInterval(function(){
      cooldownView.children[0].innerHTML = --timerAbility;
    } ,1000);
    setTimeout(function(){
      clearInterval(intervalTimer);
      cooldownView.remove();
    }, ability.cooldown*1000);
  }

  function createSound(name){
    let audio = new Audio();
    audio.preload = 'auto';
    audio.volume = 0.3;
    audio.src = `sounds/sound_${name}.mp3`;
    audio.play();
  }

  function autoMoveInterval(){

    
    return setInterval(function(){
      computerMove();
    }, 1500);


    
  }

  function stageFight(){

    idInterval = autoMoveInterval();

    let abilities =  playerFrameDom.abilities.childNodes;

    
    for (let i = 0; i < abilities.length; i++){     
      playerFrameDom.abilities.children[i].addEventListener('click',function(e){
        if(computer.getCurrentHealth() > 0) {
          let ability = player.getAbility(i);
          console.log(ability);
          
          if(!isOnCooldown(ability)){
            showTimer(player, ability, i);
            if(ability.name === 'potion'){ 
              player.setCurrentHealth(ability.value); 
              animateAbilites(player, i);
              showNumbers(player, ability.value);
            }
            else { 
              computer.setCurrentHealth(-ability.value);
              animateAbilites(player, i);
              showNumbers(computer, -ability.value); 
            }
            
            ability.onCooldown = true;          
            updateCurrentHealth(computer);    

            checkOnStageWin();
            createSound(ability.name);
          }  
        }         
      },false);  
    }    
    
  }

  function stagesInfo(i){
    switch(i){
      case 0:
        return 'Начало пути';
      case 1:
        return 'Враг на перепутье';
      case 2:
        return 'Вызволить принцессу';

    }
  }

  function generateStages(){
    for(let i = 0; i < stages.length; i++){

      stages[i].computerChoice = getComputerChoice();
      stages[i].name = stagesInfo(i);

      console.log(stages[i]);
      
    }
  }

  function putStagesInDom(){
    for(let i = 0; i < stages.length; i++){
      let stageElement = document.createElement('div');
      let imgElement = document.createElement('img');
      let spanElement = document.createElement('span');
      let checkElement = document.createElement('i');

      let stage = stages[i];

      stageElement.classList.add('stage');
      imgElement.setAttribute('src', `img/frame_${stage.computerChoice}.png`);
      imgElement.classList.add('img-responsive');
      spanElement.innerHTML = `${stage.name}`;
      checkElement.classList.add('fa', 'fa-angle-down', 'hide');

      stageElement.append(imgElement, spanElement, checkElement);

      MAP_STAGES.appendChild(stageElement);
      
    }
  }

  
  function main(){

    generateStages();
    putStagesInDom();

    knight_div.addEventListener('click', () => game('knight'),false);
    mage_div.addEventListener('click', () => game('mage'), false);
    dragon_div.addEventListener('click', function(){
      game('dragon');
    } ,false);



    NEW_GAME.addEventListener('click', function(e){
      e.preventDefault();
      createNewGame();
    }, false);

    NEW_SCORE.addEventListener('click', function(e){
      e.preventDefault();
      newScore();
      MENU.classList.toggle('show');
      MENU_BUTTON.classList.toggle('on');
    }, false);

  }

  main();

 


});

