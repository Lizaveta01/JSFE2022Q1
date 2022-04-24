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

//----------ПОЛУЧЕНИЕ ОБЪЕКТОВ ИЗ JSON-----------------//
const sliderCards = document.querySelector('.content-slider__cards');
const BTN_LEFT = document.querySelector('#btn-left');
const BTN_RIGHT = document.querySelector('#btn-right');


function createNewCard () {
  let i = Math.floor(Math.random() * 8);

  console.log(i);
  sliderCards.innerHTML += `<div class="content-slider__card" id="card-${i}">
  <div class="card-image">
    <img src=${pets[i].img} alt="dog">
  </div>
  <p class="card-title">${pets[i].name}</p>
  <button class="card__button">Learn more</button>
  </div>
  `
  i = Math.floor(Math.random() * 8);
  sliderCards.innerHTML += `<div class="content-slider__card" id="card-${i}">
  <div class="card-image">
    <img src=${pets[i].img} alt="dog">
  </div>
  <p class="card-title">${pets[i].name}</p>
  <button class="card__button">Learn more</button>
  </div>
  `
  i = Math.floor(Math.random() * 8);
  sliderCards.innerHTML += `<div class="content-slider__card" id="card-${i}">
  <div class="card-image">
    <img src=${pets[i].img} alt="dog">
  </div>
  <p class="card-title">${pets[i].name}</p>
  <button class="card__button">Learn more</button>
  </div>
  `
}

let pets = [];
let url = 'pets.json';
async function getPets() {
  async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  pets = await getData();
  createNewCard();
  // console.log(pets[1].img);
}
document.addEventListener('DOMContentLoaded', getPets);
//---------------------------------------------------------------------//


//реализация CAROUSEL
let index = 0;
function Scroll(increase) {
  let elementWidth = document.querySelector('.carousel-wrapper').clientWidth;
  console.log(elementWidth);
  let elementGap = elementWidth > 900 ? 90 : elementWidth > 500 ? 40 : 40;
  index = index + increase;
  getPets();
    if (index === -1) {
      sliderCards.style.transition = 'none';
      index = elementWidth > 900 ? 12 : elementWidth > 500 ? 11 : 15;
      sliderCards.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`
      Scroll(-1);
    }
    else if (index === (elementWidth > 900 ? 13 : elementWidth > 500 ? 12 : 16)) {
      sliderCards.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`
      sliderCards.style.transition = 'none';
      index = 0;
      sliderCards.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`
      Scroll(1);
    }
    else
    sliderCards.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`
    sliderCards.style.transition = 'transform 0.5s ease';
}
BTN_LEFT.addEventListener('click', e => Scroll(-1));
BTN_RIGHT.addEventListener('click', e => Scroll(1));

//---------------------------------------------------//

// const moveLeft = () => {
//   sliderCards.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`;
//   // sliderCards.classList.add('transition-left');
//    //делает недоступным нажатие на кнопку при вращении карусели
//   BTN_LEFT.removeEventListener('click', moveLeft);
//   BTN_RIGHT.removeEventListener('click', moveRight);
// }
// const moveRight = () => {
//   sliderCards.classList.add('transition-right');
//   //делает недоступным нажатие на кнопку при вращении карусели
//   BTN_LEFT.removeEventListener('click', moveLeft);
//   BTN_RIGHT.removeEventListener('click', moveRight);
// }

// BTN_LEFT.addEventListener('click', moveLeft);
// BTN_RIGHT.addEventListener('click', moveRight);



// sliderCards.addEventListener('animationend', (animationEvent) => {
//   //обнуление класса, который установили ранее
//   sliderCards.classList.remove('transition-left');
//   sliderCards.classList.remove('transition-right');
//   //добавление слушателя для кнопок
//   BTN_LEFT.addEventListener('click', moveLeft);
//   BTN_RIGHT.addEventListener('click', moveRight);
// })


//реализация POPUP
