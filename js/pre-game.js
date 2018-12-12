$(document).ready(function(){
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
});