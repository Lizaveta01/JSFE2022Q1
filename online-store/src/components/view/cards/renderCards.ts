/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ICards } from '../../models/inrefaces';
import { selectors } from '../../models/selectors';
import Basket from '../basket/basket';
import CardElement from './card';
import NotFoundElement from './not-found-element';
export default class RenderCards {
  cardsContainer: HTMLElement;
  private notFoundElement?: NotFoundElement;
  private cards: CardElement[] = [];

  constructor() {
    this.cardsContainer = document.querySelector(selectors.catalogProducts) as HTMLElement;
  }      

  draw(data: ICards[], basket:Basket) {
    this.cardsContainer.innerHTML = '';
    if (!data.length) {
      this.createNotFoundMessage();
    } else {
      const cards = data.map(cardData => new CardElement(cardData, basket));
      this.cards = cards;
      this.cards.forEach((card) => this.addCard(card));
    }
  }

  createNotFoundMessage() {
    const notFoundElement = new NotFoundElement();
    this.cardsContainer.appendChild(notFoundElement.container);
    this.notFoundElement?.container.addEventListener('click', () => {
      this.cardsContainer.removeChild(this.notFoundElement!.container);
    });
  }

  addCard(card: CardElement) {
    this.cardsContainer.appendChild(card.container);
  }
}
