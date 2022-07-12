import './style.scss'
import { slider } from './components/slider'
import { draw } from './components/createcard'
import { cards } from './components/cards_info'
import { sort } from './components/sorting'
import { searchItem } from './components/search_item'
import { getCheckedCheckBoxes } from './components/checked_checkbox'


slider();
draw(cards);


//SEARCH
let inputSearch = document.querySelector('#input-search') as HTMLInputElement;
inputSearch.oninput = searchItem
  
//HIDE FILTERS 
const buttonHide = document.querySelector('#hide-filter') as HTMLElement;
const filter = document.querySelector('.filter') as HTMLElement;
buttonHide.onclick = function (){
filter.classList.toggle('hiden');
}

//SORTING
const sortInput = document.getElementById('section__sort') as HTMLSelectElement;
sortInput.onchange = sort

//CHECKBOX FILTER
const checkboxCategory = document.querySelector('#checkbox__category') as HTMLElement;
checkboxCategory.addEventListener('click', getCheckedCheckBoxes);

//ADD TO BASKET
const notify = document.querySelector('.notify') as HTMLElement;
const catalog = document.querySelector('.catalog') as HTMLElement;
const counterBasket = document.querySelector('.counter-products') as HTMLElement;
let counter = 0;
const inBasket = document.querySelectorAll('.shoes-card');

inBasket.forEach(item => item.addEventListener('click', function(){
  console.log('222')
  const status = item.querySelector('.basket-status') as HTMLElement;
 
  counter >= 21 ? seeNotify (): addToBasket() ;

  //Позволяет удалить элемент, который уже находится в корзине если в корзине больше 20 товаров 
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
//======================================================

//*!  BUG: при активации сортировки по цене перестает работать функции добавления в корзину и фильтр по чекбоксам. Возможно это из-за того, что при сортировке отрисовываются новые карточки. но как это исправить?