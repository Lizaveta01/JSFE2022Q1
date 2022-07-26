import BaseElement from '../../common/base-element';
import { ICards } from '../../models/inrefaces';
import { selectors } from '../../models/selectors';
import Basket from '../basket/basket';

export default class CardElement extends BaseElement<HTMLDivElement> {
  
  cardData: ICards;
  basketElem: Basket; 

  constructor(cardData:ICards, basketElem: Basket) {
    super('div', [selectors.shoesCard], '');

    this.cardData = cardData;
    this.basketElem = basketElem;
    this.initImg(cardData.img);   
    this.initName(cardData.name);
    this.initDescription(this.cardData);
  }

  initImg(src:string) {
    const img = new BaseElement<HTMLImageElement>('img', [selectors.shoesCardImage]);
    img.container.src = src;
    this.container.appendChild(img.container);
  }

  initName(cardName:string) {
    const name = new BaseElement<HTMLElement>('h2', [selectors.shoesCardName], cardName);
    this.container.appendChild(name.container);
  }

  initDescription(cardData:ICards) {
    const descriptionElem = new BaseElement<HTMLElement>('div', ['shoes-card-info']);
    descriptionElem.container.innerHTML = `
      <p class="shoes-card__category">${cardData.category}</p>
      <p class="shoes-card__brand">${cardData.brand}</p>
      <div class="shoes-card__appearence">
        <p class="shoes-card__material">${cardData.material}</p>
        <p class="shoes-card__colors">${cardData.color}</p>
      </div>
      <p class="shoes-card__price">$${cardData.price}</p>
    `;
    this.initBtnContainer(descriptionElem.container);
    this.container.appendChild(descriptionElem.container);
  }


  initBtnContainer(container:HTMLElement) {
    const btnContainer = new BaseElement<HTMLElement>('div', ['shoes-card__basket']);
    this.initStoke(btnContainer.container);
    this.initBtn(btnContainer.container);
    container.appendChild(btnContainer.container);
  }

  initStoke(container:HTMLElement) {
    const inStoke = new BaseElement<HTMLElement>('p', ['basket__stock']);
    inStoke.container.innerHTML = this.cardData.stock ? 'In stock' : 'On request';
    this.cardData.stock 
      ? inStoke.container.classList.add('shoes-in-stock')
      : inStoke.container.classList.add('shoes-out-of-stock');
    container.appendChild(inStoke.container);
  }

  initBtn(container:HTMLElement) {
    const addBtn = new BaseElement<HTMLButtonElement>('button', ['basket__stock-button']);
    addBtn.container.innerHTML = 'Add to basket';
    container.appendChild(addBtn.container);
    addBtn.container.innerHTML = this.basketElem.basketStorage[this.cardData.name] ? 'In the basket' : 'Add to basket';
    this.basketElem.basketStorage[this.cardData.name] ? addBtn.container.classList.add('added') : addBtn.container.classList.remove('added');
  }
  
}