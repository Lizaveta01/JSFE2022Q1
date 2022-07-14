import Slider from "../controller/slider";
import Basket from "../controller/basket";
import RenderCards from "../view/renderCards";
import { ICards } from "../models/inrefaces";
import Filter from "../controller/filter";
import SortCard from "../controller/sortCard";
import { cards } from "../controller/cardsInfo";
import { selectors } from "../models/selectors";
class App{
  private data: any;
  private readonly shopCards: RenderCards;
  private basket: Basket;
  priceSlicer: Slider;
  counterBasket: HTMLElement;
  sort: SortCard;
  filter: Filter;
  
  constructor(){
    this.shopCards = new RenderCards();
    this.data ;
    this.basket = new Basket();
    this.priceSlicer = new Slider();
    this.counterBasket = document.querySelector('.counter-products') as HTMLElement;
    this.sort = new SortCard('.form-select');
    this.filter = new Filter();
  }

  start(){
    this.redraw()
    // this.sort.sortInput.addEventListener('change', () => {
    //   localStorage.setItem('sort', this.sort.sortInput.value)
    //   this.redraw()
    // })
    this.filterData()
  }

  search(){
    const searchInput = document.querySelector('#input-search') as HTMLInputElement;
    searchInput.addEventListener('input', ()=> {
    })
  }

  filterData(){
    const filterContainer =document.querySelector('.filter') as HTMLElement;
    filterContainer.addEventListener('click', (e) => {
      const targetElement = e.target as HTMLElement;
      console.log(e.target);
      if(targetElement.classList.contains('custom-checkbox')){
        const checkboxesChecked: boolean[] = [];
        this.filter.categoryList.forEach((checkbox, i) => {
          checkboxesChecked[i] = checkbox.checked;
        })
        localStorage.setItem('category', JSON.stringify(checkboxesChecked));
        this.redraw();
      }
      if(targetElement.classList.contains('checkbox-color')){
        const checkboxesChecked: boolean[] = [];
        this.filter.colorList.forEach((checkbox, i) => {
          checkboxesChecked[i] = checkbox.checked;
        })
        localStorage.setItem('color', JSON.stringify(checkboxesChecked));
        this.redraw();
      }
    })
  }
  redraw(){
    this.data = this.filter.filterAll(cards);
    const sortData = this.sort.sort(this.data);
    this.shopCards.draw(sortData!, this.basket.basketStorage);
    this.basket.basketCounter ? this.counterBasket.classList.add('has-item') : this.counterBasket.classList.remove('has-item')
    this.counterBasket.innerText = String(this.basket.basketCounter);
  }
}
export default App