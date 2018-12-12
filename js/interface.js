  //-----MENU ----
  const MENU_BUTTON = document.querySelector('.toggle-mnu');
  const MENU = document.querySelector('.hidden-mnu');
  MENU_BUTTON.addEventListener('click', function(e){
    e.preventDefault();
    MENU_BUTTON.classList.toggle('on');
    MENU.classList.toggle('show');
  }, false);
//---- MENU-end----

$(document).ready(function(){

  
  function gameIsLoaded(){

    let loader = document.querySelector('.loader');
    loader.style.display = "none";
  }
  gameIsLoaded();
  //setTimeout(gameIsLoaded, 2200);




});