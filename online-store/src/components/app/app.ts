import Slider from "../view/slider/slider";
import Basket from "../view/basket/basket";
import RenderCards from "../view/cards/renderCards";
import Filter from "../controller/filter";
import SortCard from "../controller/sortCard";
import { cards } from "../view/cards/cardsInfo";
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
    this.redraw();
    this.search();
    this.sortCard();
    this.filterData();
    this.seeBasket();
    this.reset();
    this.resetAll();
  }

  search(){
    const searchInput = document.querySelector('#input-search') as HTMLInputElement;
    searchInput.addEventListener('input', ()=> {
      this.redraw()
    })
  }

  filterData(){
    const filterContainer =document.querySelector('.filter') as HTMLElement;
    filterContainer.addEventListener('click', (e) => {
      const targetElement = e.target as HTMLElement;

      if(targetElement.classList.contains('custom-checkbox')){
        const checkboxesChecked: boolean[] = [];
        this.filter.categoryList.forEach((checkbox, i) => {
          checkboxesChecked[i] = checkbox.checked;
        })
        localStorage.setItem('category', JSON.stringify(checkboxesChecked));
      }

      if(targetElement.classList.contains('checkbox-size')){
        console.log(targetElement)
        const checkboxesChecked: boolean[] = [];
        this.filter.sizeList.forEach((checkbox, i) => {
          checkboxesChecked[i] = checkbox.checked;
        })
        localStorage.setItem('size', JSON.stringify(checkboxesChecked));
      }

      if(targetElement.classList.contains('checkbox-color')){
        const checkboxesChecked: boolean[] = [];
        this.filter.colorList.forEach((checkbox, i) => {
          checkboxesChecked[i] = checkbox.checked;
        })
        localStorage.setItem('color', JSON.stringify(checkboxesChecked));
      }

      if(targetElement.classList.contains('custom-radio')){
        const checkboxesChecked: boolean[] = [];
        this.filter.materialList.forEach((checkbox, i) => {
          checkboxesChecked[i] = checkbox.checked;
        })
        localStorage.setItem('material', JSON.stringify(checkboxesChecked));
      }

      if(targetElement.classList.contains('brands')){
        const checkboxesChecked: boolean[] = [];
        this.filter.brandList.forEach((checkbox, i) => {
          checkboxesChecked[i] = checkbox.selected;
        })
        localStorage.setItem('brand', JSON.stringify(checkboxesChecked));
      }

      this.redraw()
    })
  }

  reset(){
    const cleanFilters = document.querySelector('#clear-filter')
    cleanFilters?.addEventListener('click', () => {
      this.filter.filterReset();
      this.redraw();
    })
  }

  resetAll(){
    const cleanFilters = document.querySelector('#clear-settings');
    cleanFilters?.addEventListener('click', () => {
      this.filter.filterResetAll();
      this.basket.clear();
      this.redraw();
    })
  }


  sortCard(){
    this.sort.sortInput.addEventListener('change', ()=> {
      console.log(this.sort.sortInput);
      localStorage.setItem('sort', this.sort.sortInput.value)
      this.redraw();
    })
  }

  seeBasket(){
    const catalog = document.querySelector('.products') as HTMLElement;
    catalog.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const targetElement =target.closest('.shoes-card') as HTMLElement;
      if(targetElement){
        this.basket.toggle(targetElement.children[1].innerHTML);
        this.redraw();
      }
    })
  }

  redraw(){
    this.data = this.filter.filterAll(cards);
    const sortData = this.sort.sort(this.data);
    this.shopCards.draw(sortData!, this.basket.basketStorage);
    this.basket.basketCounter ? this.counterBasket.classList.add('has-item') : this.counterBasket.classList.remove('has-item');
    this.counterBasket.innerText = String(this.basket.basketCounter);
  }
}

export default App