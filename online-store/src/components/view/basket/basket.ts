import { selectors } from '../../models/selectors';
class Basket {
  basketStorage: Record<string, number>;
  basketCounter: number;
  modalWindow: HTMLElement;
  modalButton: HTMLElement;

  constructor() {
    this.basketStorage = {};
    this.basketCounter = 0;
    this.modalWindow = document.querySelector(selectors.modalWindow) as HTMLElement;
    this.modalButton = document.querySelector(selectors.popupButton) as HTMLElement;
    this.init();
  }

  init() {
    const basket = localStorage.getItem('basketStorage');
    if (basket) {
      this.basketStorage = JSON.parse(basket);
      this.basketCounter = Object.keys(this.basketStorage).length;
    }
    this.modalWindow.addEventListener('click', (e) => {
      if (e.target === this.modalWindow)
        this.modalWindow.classList.remove('visible');
    });
    this.modalButton.addEventListener('click', () => {
      this.modalWindow.classList.remove('visible');
    });
  }

  add(name:string) {
    if (this.basketStorage[name]) {
      this.basketStorage[name] += 1;
    } else {
      this.basketStorage[name] = 1;
    }
    this.basketCounter += 1;
    localStorage.setItem('basketStorage', JSON.stringify(this.basketStorage));
  }


  remove(name:string) {
    if (this.basketStorage[name]) {
      this.basketStorage[name] -= 1;
      this.basketCounter -= 1;
    }
    if (this.basketStorage[name] <= 0)
      delete this.basketStorage[name];
    localStorage.setItem('basketStorage', JSON.stringify(this.basketStorage));
  }
  toggle(name:string) {
    if (this.basketStorage[name]) {
      delete this.basketStorage[name];
      this.basketCounter -= 1;
    } else if (this.basketCounter >= 20) {
      this.showModal();
      return;
    } else {
      this.basketStorage[name] = 1;
      this.basketCounter += 1;
    }
    localStorage.setItem('basketStorage', JSON.stringify(this.basketStorage));
  }
  clear() {
    this.basketStorage = {};
    this.basketCounter = 0;
    localStorage.removeItem('basketStorage');
  }
  showModal() {
    this.modalWindow.classList.add('visible');
  }
}

export default Basket;