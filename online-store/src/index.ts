import './style.scss';
import { slider } from './components/slider';
import { draw } from './components/createcard';
import { cards } from './components/cards_info';


slider();
draw(cards);



//================================================================SEARCH
  
  let inputSearch = document.querySelector('#input-search') as HTMLInputElement;
  const products = document.querySelector('.products') as HTMLElement;
  const notify = document.querySelector('.notify') as HTMLElement;
  const catalog = document.querySelector('.catalog') as HTMLElement;

  const items = document.querySelectorAll('.shoes-card');
  inputSearch.oninput = function () {
  let text = inputSearch.value.trim();
  let count = items.length;
  // products.innerHTML = "";
  if(text != ''){
    items.forEach((el) => {
    
      if(el.children[1].innerHTML.toLowerCase().search(text.toLowerCase()) == -1){
        el.classList.add('hiden') 
        count--
        } else {
        notify.classList.add('hiden');
        catalog.classList.remove('catalog__hiden');
        el.classList.remove('hiden')}   
      if(count == 0){
        notify.classList.remove('hiden');
        catalog.classList.add('catalog__hiden');
      }
    });
  } else {
    notify.classList.add('hiden');
    catalog.classList.remove('catalog__hiden');
  }
}

//=======================================================HIDE FILTERS 
const buttonHide = document.querySelector('#hide-filter') as HTMLElement;
const filter = document.querySelector('.filter') as HTMLElement;
buttonHide.onclick = function (){
filter.classList.toggle('hiden');
}

//======================================================ADD TO BASKET
const counterBasket = document.querySelector('.counter-products') as HTMLElement;
let counter = 0;
const inBasket = document.querySelectorAll('.shoes-card');

inBasket.forEach(item => item.addEventListener('click', function(){
  const status = item.querySelector('.basket-status') as HTMLElement;
 
  counter >= 21 ? seeNotify (): addToBasket() ;

  //Позволяет удалить элемент, который уже находится в корзинеб если в корзине больше 20 товаров 
  if (counter > 20 && status.classList.contains('active')){
    seeNotify ();
    status.classList.remove('active');
    counter --;
    counterBasket.innerHTML = counter.toString();
  }
 //Показывает уведомление, что корзина переполнена и не позволяет добавлять в корзину новые товары
  function seeNotify () {
    notify.innerText = 'Sorry, basket is full. \r\n Please, remove something'
    notify.classList.remove('hiden');
    catalog.classList.add('catalog__hiden');
    setTimeout(function(){
      notify.classList.add('hiden');
      catalog.classList.remove('catalog__hiden');
      notify.innerText = "Sorry, we couldn't find the page you're looking for";
    }, 2000);  
  }
  //Добавляет в корзину новые товары
  function addToBasket(){
    status.classList.toggle('active');
    status.classList.contains('active') ? counter++ : counter --;
    counterBasket.innerHTML = counter.toString();
  }
}));
//=======================================================SORTING

const sortInput = document.getElementById('section__sort') as HTMLSelectElement;

// при нажатии определяет на каком option был сделан клик
sortInput.onchange = function(){
  const indexSelected = sortInput.selectedIndex;
  let option = sortInput.querySelectorAll('option')[indexSelected];
  let selectedId = option.getAttribute('id');

  if(selectedId == '1') sortByDateOld();
  if(selectedId == '2') sortByDateNew();
  if(selectedId == '3') sortByPriceHightLow();
  if(selectedId == '4') sortByPriceLowHight();
}

function sortByPriceHightLow() {
  cards.sort((a,b) => +b.price - +a.price);
  draw(cards)
}
function sortByPriceLowHight() {
  cards.sort((a,b) => +a.price - +b.price);
  draw(cards)
}
function sortByDateNew() {
  cards.sort((a,b) => +b.release - +a.release);
  draw(cards)
}
function sortByDateOld() {
  cards.sort((a,b) => +a.release - +b.release);
  draw(cards)
}
//=======================================================SORTING
