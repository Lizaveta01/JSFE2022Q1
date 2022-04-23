//реализация меню бургер
const hamburger = document.querySelector('.header-burger');
const header__nav = document.querySelector('.header__nav');
const background = document.querySelector('.background');
const body = document.querySelector('.scroll');


function toggleMenu() {
  hamburger.classList.toggle('open');
  header__nav.classList.toggle('open');
  background.classList.toggle('visible');
  body.classList.toggle('block');
}

hamburger.addEventListener('click', toggleMenu);
background.addEventListener('click', toggleMenu);


//сворачивание меню при клике по ссылке
document.querySelector('.header__list').addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "A") {
      console.log("ok");
      toggleMenu();
    }
  });


//реализация CAROUSEL


//реализация POPUP
