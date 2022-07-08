import './style.scss';
import { slider } from './components/slider';
import { draw } from './components/createcard';
import { cards } from './components/cards_info';


slider();
draw(cards);



//================================================================SEARCH
  
  let inputSearch = document.querySelector('#input-search') as HTMLInputElement;
   const products = document.querySelector('.products') as HTMLElement;
  
  inputSearch.oninput = function () {
  let text = inputSearch.value.trim();
 
  products.innerHTML = "";
  const notify = document.querySelector('.notify') as HTMLElement;
  const catalog = document.querySelector('.catalog') as HTMLElement;

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
  status.classList.toggle('active');
  if(status.classList.contains('active')){
    counter++
  } else {
    counter = counter -1;
  }
  counterBasket.innerHTML = counter.toString();
  console.log(status);
}));
//=======================================================