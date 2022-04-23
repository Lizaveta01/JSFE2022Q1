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
const BTN_LEFT = document.querySelector('#btn-left');
const BTN_RIGHT = document.querySelector('#btn-right');
const sliderCards = document.querySelector('.content-slider__cards');

const moveLeft = () => {
  sliderCards.classList.add('transition-left');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
}
const moveRight = () => {
  sliderCards.classList.add('transition-right');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
}

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

sliderCards.addEventListener('animationend', (animationEvent) => {
  sliderCards.classList.remove('transition-left');
  sliderCards.classList.remove('transition-right');
  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);
})



//реализация POPUP
