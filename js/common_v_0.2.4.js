$(function() {

  // function GameConfig(gameStatus, playerName, princessSex, userScore, computerScore){
  //   this.gameStatus = gameStatus;
  //   this.playerName = playerName;
  //   this.princessSex = princessSex;
  //   this.userScore = userScore;
  //   this.computerScore = computerScore;
  // }
  class GameConfig {
    constructor(gameStatus, playerName, princessSex, userScore, computerScore) {
      this.gameStatus = gameStatus;
      this.playerName = playerName;
      this.princessSex = princessSex;
      this.userScore = userScore;
      this.computerScore = computerScore;
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

  }


  class Fighter{
    constructor(damage, health){
      this.damage = damage;
      this.health = health;
      console.log('bl');
    }

  }

  var playerFrameDom = {
    playerHealthNumber: document.querySelector('.player-health > span'),
    playerHealthFill:   document.querySelector('.player-health > .color-fill'),
    playerAbility:      document.querySelector('.player-ability'),
    playerIcon:         document.querySelector('.player-icon')
  };

  class Knight extends Fighter {
    constructor(damage, health,healthCoefficient){
      super(damage, health);
      this.healthCoefficient = healthCoefficient;

      //-------inner props
      this.defaultHealth = this.healthCoefficient*this.health;
      this.currentHealth = this.healthCoefficient*this.health;
    }
    
    setCurrentHealth(health){
      this.currentHealth = this.currentHealth + health;
    }
    getCurrentHealth(){
      return this.currentHealth;
    }

    getCurrentHealthPercentage(){
      return 100 - (this.defaultHealth - this.currentHealth)/this.defaultHealth*100;
    }
    // set defaultHealth(empty){
    //   this.currentHealth = this.defaultHealth;
    // }
    // get defaultHealth(){
    //   return this.defaultHealth;
    // }
  }

  var knight = new Knight(40, 100, 2);
  
  
  playerFrameDom.playerAbility.addEventListener('click',function(){
    knight.setCurrentHealth(-10);
    playerFrameDom.playerHealthNumber.innerHTML = knight.getCurrentHealth();
    playerFrameDom.playerHealthFill.style.maxWidth = knight.getCurrentHealthPercentage() + '%';
  },false);
  
    

  var gameConfig = new GameConfig(true, 'Игрок', 'female', 0, 0);
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
      console.log(localStorage.getItem('princessSex'));        
      
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

        console.log(sex);
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
      console.log(gameConfig.getUserScore());
      
      console.log('win');
     
      newScore();
    }
  }

  function showWinMessage(userChoice, computerChoice){
    switch(userChoice + computerChoice){
      case "knightdragon":
        return 'Ваш Рыцарь ловко побеждает дракона!';
      case "mageknight":
        return 'Ваше заклинание размазало вражеского рыцаря по стенке..';
       case "dragonmage":
        return 'Вражеский маг оказался не таким вкусным, Ваш дракон закопал его где-то под камнем.';
      default:
        return '';
    }
  }

  function showLoseMessage(userChoice, computerChoice){
    switch(userChoice + computerChoice){
      case "knightmage":
        return 'Ваш Рыцарь повержен подлым магом!';
      case "magedragon":
       return 'Вражеский дракон выплюнул Вас не дожевав...';
      case "dragonknight":
       return 'Ваш дракон оказался неповоротлив, он буквально застрял в пещере.';
      default:
        return '';
    }
  }

  function showDrawMessage(userChoice, computerChoice){
    switch(userChoice + computerChoice){
      case "knightknight":
        return 'Рыцари решили, что лучше выпить в таверне, чем бадаться из-за "прынцессы"!';
      case "magemage":
        return 'Маги не поделили магический ресурс и оба пали в безде.'
      case "dragondragon":
        return 'Драконы ушли размножаться.'
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
  
  function win(userChoice, computerChoice){
    gameConfig.increaseUserScore();
    userScore_span.innerHTML = gameConfig.getUserScore();
    result_p.innerHTML = showWinMessage(userChoice, computerChoice);
    result_p.style.color = '#bff1bf'; //
    clearColorFrame();
    colorFrame(userChoice, 'green-glow');
    colorFrame(computerChoice, 'azufar-glow');

    checkOnWin();
  }

  function lose(userChoice, computerChoice){
    gameConfig.increaseComputerScore();
    computerScore_span.innerHTML = gameConfig.getComputerScore();
    result_p.innerHTML = showLoseMessage(userChoice, computerChoice);
    result_p.style.color = '#f1bfbf';
    clearColorFrame();
    colorFrame(userChoice, 'red-glow');
    colorFrame(computerChoice, 'azufar-glow');

    checkOnWin();
  }

  function draw(userChoice, computerChoice){
    result_p.innerHTML = showDrawMessage(userChoice, computerChoice);
    result_p.style.color = '#f1efbf';
    clearColorFrame();
    colorFrame(userChoice, 'yellow-glow');
    // colorFrame(computerChoice, 'half-glow');
  }

  function game(userChoice){
    const computerChoice = getComputerChoice();

    switch(userChoice + computerChoice){
      case "knightdragon":
      case "mageknight":
      case "dragonmage":
        win(userChoice, computerChoice);   
        showActionMessage(userChoice, computerChoice);
        break;
      case "knightmage":
      case "magedragon":
      case "dragonknight":
        lose(userChoice, computerChoice);
        showActionMessage(userChoice, computerChoice);
        break;
      default: 
        draw(userChoice, computerChoice);
        showActionMessage(userChoice, computerChoice);
        break;
        
        
    }
    
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
  
  function main(){
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

  //-----MENU ----
    const MENU_BUTTON = document.querySelector('.toggle-mnu');
    const MENU = document.querySelector('.hidden-mnu');
    MENU_BUTTON.addEventListener('click', function(e){
      e.preventDefault();
      MENU_BUTTON.classList.toggle('on');
      MENU.classList.toggle('show');
    }, false);
  //---- MENU-end----



});

$(document).ready(function(){

  
    function gameIsLoaded(){

      let loader = document.querySelector('.loader');
      loader.style.display = "none";
    }
  
    setTimeout(gameIsLoaded, 2200);
  



});