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


  inputSearch.oninput = function () {
  let text = inputSearch.value.trim();
 
  products.innerHTML = "";
  

  if(text != ''){
    cards.forEach((el) => {
      if(el.name.toLowerCase().search(text.toLowerCase()) == -1){
        notify.classList.remove('hiden');
        catalog.classList.add('catalog__hiden');
      } else {
        notify.classList.add('hiden');
        catalog.classList.remove('catalog__hiden');
        const shoesCard = document.createElement('div');
        shoesCard.classList.add('shoes-card');
        shoesCard.innerHTML = `
        <img src="${el.image}" alt="img">
        <p id="shoes__name">${el.name}</p>
        <p id="shoes__category">${el.category}</p>
        <p id="shoes__colors">${el.color.length} colors</p>
        <p id="shoes__price">$${el.price}</p>
        <div class="basket-status"></div>`;
        products.appendChild(shoesCard);
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
const products1 = document.querySelector('.products') as HTMLElement;



sortInput.onchange = function(){
  const indexSelected = sortInput.selectedIndex;
  let option = sortInput.querySelectorAll('option')[indexSelected];

  let selectedId = option.getAttribute('id');

  if(selectedId == '1') console.log('1');
  if(selectedId == '2') console.log('2');
  if(selectedId == '3') console.log('3');
  if(selectedId == '4') sortByPriceHightLow();
}

function sortByPriceHightLow() {
  console.log(products1.children.length)
  for (let i = 0; i < products1.children.length; i++){
    for(let j = 1; j < products1.children.length; j++){
      if (Number(products1.children[i].getAttribute('data-price')) > Number(products1.children[j].getAttribute('data-price'))){
      const replacedNode = products1.replaceChildren(products1.children[i], products1.children[j]);
      //  insertAfter(replacedNode, products1.children[i]);
      }
      console.log(products1.children.length)
      console.log(i, products1.children[i]);
       console.log(products1.children[i]);
       console.log(Number(products1.children[i].getAttribute('data-price')))
    }
  }
}

function insertAfter(elem: any, refElem: any) :HTMLElement{
  return refElem.parentNode?.insertBefore(elem, refElem.nextSibling);
}