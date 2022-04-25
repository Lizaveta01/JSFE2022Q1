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


//______________________________________________//

document.addEventListener('DOMContentLoaded', async () => {
const sliderCards = document.querySelector('.content-slider__cards');
// const BTN_LEFT = document.querySelector('#btn-left');
// const BTN_RIGHT = document.querySelector('#btn-right');

//get pets data
let pets = [];
  let url = 'pets.json';
  async function getPets() {
    async function getData() {
      const res = await fetch(url);
      const data = await res.json();

      for (let i = data.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
      return data;
    }
    pets = await getData();
    console.log (pets);

  }
  getPets()
  console.log (pets);

  function generateData(pets) {
    let arr = []

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < pets.length; j++) {
            arr.push(pets[i + j < 8 ? i + j : i + j - 8]);
        }
    }
    return arr;
}

getPets().then(() => {
  const pets48 = generateData(pets);

  //для страницы pet-------------------------------------------------
  let windowSize = window.innerWidth;
  const cardsContainer = document.querySelectorAll('.cards-container');
  window.addEventListener('resize', function (event) {
      if ((windowSize >= 1280 && window.innerWidth < 1280)
          || (windowSize < 1280 && window.innerWidth >= 1280)
          || (windowSize >= 768 && window.innerWidth < 768)
          || (windowSize < 768 && window.innerWidth >= 768)) {
          if (cardsContainer.length > 0) {
              cardsContainer[1].innerHTML = '';
              windowSize = window.innerWidth;
              generateDataPagination();
          }
          windowSize = window.innerWidth;
      }
      windowSize = window.innerWidth;
  }, true);
//---------------------------------------------------------------------


//-------------------popup--------------------------------------------
  let cards;
  let modalWindow = document.querySelector('.modal-window');

  let pets_copy = Array.from(pets);
  let scroll_pets = document.body.clientWidth >= 1280 ? Array.from(pets) : document.body.clientWidth >= 768 ? pets_copy.splice(0, 6) : pets_copy.splice(0, 3);
  if (document.body.clientWidth >= 1280) scroll_pets.push(scroll_pets[0]);
//---------------------------------------------------------------------

  const scrollWindow = document.querySelector('.content-slider__cards');
  if (scrollWindow) scroll_pets.forEach((pet, index) => {
      scrollWindow.innerHTML += 
      `<div class="content-slider__card" id="card-${index}">
          <div class="card-image"><img src=${pet.img} alt="dog"></div>
          <p class="card-title">${pet.name}</p>
          <button class="card__button">Learn more</button>
        </div>`
  })

 

  //Scroll on main page
  let index = 1;
  let elementWidth;
  if (document.querySelector('.carousel-wrapper')) {
    elementWidth = document.querySelector('.carousel-wrapper').clientWidth;
  }

  let elementGap = elementWidth > 900 ? 90 : elementWidth > 500 ? 40 : 40;

  if (scrollWindow) {
    scrollWindow.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`;
  }

  function Scroll(increase) {
      index = index + increase;

       scrollWindow.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`;
      setTimeout(() => {
          scrollWindow.style.transition = 'none';
          index = 1;

          scrollInnerHtmlReplacement(scroll_pets, pets, increase, elementWidth);
          scrollWindow.style.transform = `translateX(${-(elementWidth + elementGap) * index}px)`;
  
          cards = document.querySelectorAll('.content-slider__card');
          cards.forEach((card, index) => {
              card.addEventListener('click', e => popUpCard(index, scroll_pets))
          })
          
      }, 500);
      scrollWindow.style.transition = 'transform 0.5s ease';
  }


// BTN_LEFT.addEventListener('click', e => Scroll(-1));
// BTN_RIGHT.addEventListener('click', e => Scroll(1));


function scrollInnerHtmlReplacement(scroll_pets, pets, increase, elementWidth) {
  let visible_cards = increase < 0 ? (
      elementWidth > 900 ? scroll_pets.slice(0, 3) : elementWidth > 500 ? scroll_pets.slice(0, 2) : scroll_pets.slice(0, 1)
  ) :
      (elementWidth > 900 ? scroll_pets.slice(6, 9) : elementWidth > 500 ? scroll_pets.slice(4, 6) : scroll_pets.slice(1, 2));

  let push_cards = pets.filter(pet=>!visible_cards.includes(pet))
  

  shuffleArray(push_cards);

  if (elementWidth > 900) {
      if (increase < 0) {
        scrollWindow.children[8].remove();
        scrollWindow.children[7].remove();
        scrollWindow.children[6].remove();
          scroll_pets.splice(6, 3);
      }
      else {
        scrollWindow.children[0].remove();
        scrollWindow.children[0].remove();
        scrollWindow.children[0].remove();
          scroll_pets.splice(0, 3);
      }
  }
  else if (elementWidth > 500) {
      if (increase < 0) {
        scrollWindow.children[5].remove();
        scrollWindow.children[4].remove();
          scroll_pets.splice(4, 2);
      }
      else {
        scrollWindow.children[0].remove();
        scrollWindow.children[0].remove();
          scroll_pets.splice(0, 2);
      }
  }
  else
      if (increase < 0) {
        scrollWindow.children[2].remove();
          scroll_pets.splice(2, 1);
      }
      else {
        scrollWindow.children[0].remove();     
      }


  let new_innerHtml = '';
  push_cards.splice(elementWidth > 900 ? 3 : elementWidth > 500 ? 2 : 1, push_cards.length - 1);
  push_cards.forEach((pet, index) => {
      new_innerHtml +=  
      `<div class="content-slider__card" id="card-${index}">
          <div class="card-image"><img src=${pet.img} alt="dog"></div>
          <p class="card-title">${pet.name}</p>
          <button class="card__button">Learn more</button>
      </div>`
  })
  increase > 0?push_cards.forEach(card=>{scroll_pets.splice(scroll_pets.length, 0, card)}):push_cards.reverse().forEach(card => scroll_pets.splice(0, 0, card));

  scrollWindow.innerHTML = increase > 0 ? scrollWindow.innerHTML + new_innerHtml : new_innerHtml + scrollWindow.innerHTML;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

//________________popup________________________________

 //находим все карточки
 cards = document.querySelectorAll('.content-slider__card');
 //запускаем функцию popup 
 cards.forEach((card, index) => {
    card.addEventListener('click', e => popUpCard(index, scroll_pets))
 })


function popUpCard(index, pets_arr) {
  {
      modalWindow.innerHTML = `
      <div class="modal-window__content">
      <div class="button-arrow" id="btn-close"></div>
        <div class="modal__image">
          <img class="modal__img" src=${pets_arr[index].img} alt="${pets_arr[index].name}">
        </div>	
        <div class="text-wrapper">
          <h3 class="content-text " id="name"> ${pets_arr[index].name}</h3>
          <h4 class="content-text" id="subname">${pets_arr[index].type} - ${pets_arr[index].breed}</h4>
          <p class="content-text"  id="info-pet"> ${pets_arr[index].description}</p>
          <ul class="list-info">
            <li class="list-item">
              <button class="dot"></button>
              <p class="parametr"><strong>Age: </strong>${pets_arr[index].age}</p>
            </li>
            <li class="list-item">
              <button class="dot"></button>
              <p class="parametr"><strong>Inoculations: </strong>${pets_arr[index].inoculations}</p>
            </li>
            <li class="list-item">
              <button class="dot"></button>
              <p class="parametr"><strong>Diseases: </strong>${pets_arr[index].diseases}</p>
            </li>
            <li class="list-item">
              <button class="dot"></button>
              <p class="parametr"><strong>Parasites: </strong>${pets_arr[index].parasites}</p>
            </li>
          </ul>
          </div>
      </div>
  `;
      modalWindow.classList.add('active');
      document.body.classList.add('block');
      background.classList.add('visible');


      const closeBtn = document.getElementById('btn-close');

      background.addEventListener('click', e => {
          closeBtn.click();
      });
      // background.addEventListener('mouseenter', e => {
      //     closeBtn.classList.toggle('close_hover');
      // })
      // background.addEventListener('mouseout', e => {
      //     closeBtn.classList.toggle('close_hover');
      // })
      closeBtn.addEventListener('click', e => {
          modalWindow.style.opacity = 0;
          setTimeout(() => {
              modalWindow.style.opacity = '';
              modalWindow.classList.remove('active');
              document.body.classList.remove('block');
              background.classList.remove('visible');
          }, 300);
      });
      console.log("++")
  }
}







})
})
