import { ICards } from '../models/inrefaces';

class SortCard {
  sortInput!: HTMLOptionElement;
  constructor(elem:string) {
    this.sortInput = document.querySelector(elem) as HTMLOptionElement;
    this.init();
  }

  init() {
    const checkedSort = localStorage.getItem('sort');
    if (checkedSort) {
      this.sortInput.value = checkedSort;
    }
  }

  sort(data: ICards[]) {
    switch (this.sortInput.value) {
      case 'releaseON':
        return this.sortByDateOld(data);
      case 'releaseNO':
        return this.sortByDateNew(data);
      case 'priceHL':
        return this.sortByPriceHightLow(data);
      case 'priceLH':
        return this.sortByPriceLowHight(data);
      case 'none':
        return data;
    }
  }

  sortByPriceHightLow(data: ICards[]) {
    return data.sort((a, b) => +b.price - +a.price);
  }
  sortByPriceLowHight(data: ICards[]) {
    return data.sort((a, b) => +a.price - +b.price);
  }
  sortByDateNew(data: ICards[]) {
    return data.sort((a, b) => +b.release - +a.release);
  }
  sortByDateOld(data: ICards[]) {
    return data.sort((a, b) => +a.release - +b.release);
  }
  sortReset() {
    this.sortInput.value = 'releaseNO';
    localStorage.removeItem('sort');
  }
}
 
export default SortCard;