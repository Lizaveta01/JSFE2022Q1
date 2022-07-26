/* eslint-disable @typescript-eslint/no-unused-expressions */
import Slider from '../view/slider/slider';
import Basket from '../view/basket/basket';
import RenderCards from '../view/cards/renderCards';
import Filter from '../controller/filter';
import SortCard from '../controller/sortCard';
import { cards } from '../view/cards/cardsInfo';
import { ICards } from '../models/inrefaces';
class App {
  private data: ICards[];
  private readonly shopCards: RenderCards;
  private basket: Basket;
  priceSlicer: Slider;
  counterBasket: HTMLElement;
  sort: SortCard;
  filter: Filter;
  
  constructor() {
    this.shopCards = new RenderCards();
    this.data = cards;
    this.basket = new Basket();
    this.priceSlicer = new Slider();
    this.counterBasket = document.querySelector('.counter-products') as HTMLElement;
    this.sort = new SortCard('.form-select');
    this.filter = new Filter();
  }

  start() {
    this.redraw();
    this.search();
    this.sortCard();
    this.filterData();
    this.seeBasket();
    this.reset();
    this.resetAll();
  }

  search() {
    const searchInput = document.querySelector('#input-search') as HTMLInputElement;
    searchInput.addEventListener('input', ()=> {
      this.redraw();
    });
  }

  filterData() {
    const categoryContainer = document.querySelector('.category') as HTMLElement;
    categoryContainer.addEventListener('click', () => {
      this.setItemInLocalStorage('category', this.filter.categoryList);
    });

    const sizeContainer = document.querySelector('.size') as HTMLElement;
    sizeContainer.addEventListener('click', () => {
      this.setItemInLocalStorage('size', this.filter.sizeList);
    });

    const colorContainer = document.querySelector('.color') as HTMLElement;
    colorContainer.addEventListener('click', () => {
      this.setItemInLocalStorage('color', this.filter.colorList);
    });

    const materialContainer = document.querySelector('.material') as HTMLElement;
    materialContainer.addEventListener('click', () => {
      this.setItemInLocalStorage('material', this.filter.materialList);
    });

    const brandContainer = document.querySelector('.brand') as HTMLElement;
    brandContainer.addEventListener('click', () => {
      this.setItemInLocalStorage('brand', this.filter.brandList);
    });
    
    const priceContainer = document.querySelector('.price') as HTMLElement;
    priceContainer.addEventListener('click', () => {
      this.redraw();
    });
  }
  
  setItemInLocalStorage(type:string, list: NodeListOf<HTMLInputElement>) {
    const checkboxesChecked: boolean[] = [];
    list.forEach((checkbox, i) => {
      checkboxesChecked[i] = checkbox.checked;
    });
    localStorage.setItem(type, JSON.stringify(checkboxesChecked));
    this.redraw();
  }

  reset() {
    const cleanFilters = document.querySelector('#clear-filter');
    cleanFilters?.addEventListener('click', () => {
      this.filter.filterReset();
      this.redraw();
    });
  }

  resetAll() {
    const cleanFilters = document.querySelector('#clear-settings');
    cleanFilters?.addEventListener('click', () => {
      this.filter.filterResetAll();
      this.basket.clear();
      this.redraw();
    });
  }

  sortCard() {
    this.sort.sortInput.addEventListener('change', ()=> {
      console.log(this.sort.sortInput);
      localStorage.setItem('sort', this.sort.sortInput.value);
      this.redraw();
    });
  }

  seeBasket() {
    const catalog = document.querySelector('.products') as HTMLElement;
    catalog.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const targetElement = target.closest('.shoes-card') as HTMLElement;
      if (targetElement) {
        this.basket.toggle(targetElement.children[1].innerHTML);
        this.redraw();
      }
    });
  }

  redraw() {
    this.data = this.filter.filterAll(cards);
    const sortData = this.sort.sort(this.data);
    this.shopCards.draw(sortData!, this.basket);
    this.basket.basketCounter ? this.counterBasket.classList.add('has-item') : this.counterBasket.classList.remove('has-item');
    this.counterBasket.innerText = String(this.basket.basketCounter);
  }
}

export default App;