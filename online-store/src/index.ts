import './style.scss';
import { slider } from './components/slider';
import { draw } from './components/createcard';
import { cards } from './components/cards_info';
import { create } from 'nouislider';


slider();
draw(cards);




//================================================================SEARCH
  let formSearch = document.querySelector('form');
  let inputSearch = document.querySelector('#input-search') as HTMLInputElement;
  let cardName = document.querySelectorAll('#shoes__name');
  
  

    const noRes = document.createElement('div');
    noRes.classList.add ('noresult')
    noRes.innerHTML= `Sorry, we couldn't find the page you're looking for`;
    const main = document.querySelector('main');
    main?.appendChild(noRes);


  inputSearch.oninput = function () {
    let text = inputSearch.value.trim()

    const products = document.querySelector('.products') as HTMLElement;
    products.innerHTML = "";
    const catalog = document.querySelector('.catalog');

    

    if(text != ''){
      cards.forEach((el) => {
        if(el.name.toLowerCase().search(text.toLowerCase()) == -1){
          catalog?.classList.add('hiden');
          noRes.classList.remove('hiden');
          
        } else {
          catalog?.classList.remove('hiden');
          noRes.classList.add('hiden');
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
      catalog?.classList.remove('hiden');
      noRes.classList.add('hiden');
    }

  }
  
//==========================================================

