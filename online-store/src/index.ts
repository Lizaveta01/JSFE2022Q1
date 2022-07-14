import './style.scss'

import App from './components/app/app'

const app = new App();
app.start();

// import Slider from "./components/controller/slider";
// import Basket from "./components/controller/basket";
// import RenderCards from "./components/view/renderCards";
// import Filter from "./components/controller/filter";
// import SortCard from "./components/controller/sortCard";
// import { cards } from "./components/controller/cardsInfo";
// import { ICards } from './components/models/inrefaces';

// const shopCards = new RenderCards();
// let data: any;
// const basket = new Basket();
// const priceSlicer = new Slider();
// const counterBasket = document.querySelector('.counter-products') as HTMLElement;
// const sort = new SortCard('.form-select');
// const filter = new Filter();



// redraw()
// const searchInput = document.querySelector('#input-search') as HTMLInputElement;
//     searchInput.addEventListener('input', ()=> {
//       redraw()
//     })


// const filterContainer =document.querySelector('.filter') as HTMLElement;
// filterContainer.addEventListener('click', (e) => {
//     const targetElement = e.target as HTMLElement;
//     console.log(targetElement)
//     if(targetElement.classList.contains('custom-checkbox')){
//       const checkboxesChecked: boolean[] = [];
//       filter.categoryList.forEach((checkbox, i) => {
//         checkboxesChecked[i] = checkbox.checked;
//       })
//       localStorage.setItem('category', JSON.stringify(checkboxesChecked));
//       redraw();
//     }
//   })



// function redraw(){
//   console.log(data)
//   data = filter.filterAll(cards);
//   const sortData = sort.sort(data);
//   shopCards.draw(sortData!, basket.basketStorage);
//   basket.basketCounter ? counterBasket.classList.add('has-item') : counterBasket.classList.remove('has-item')
//   counterBasket.innerText = String(basket.basketCounter);
// }