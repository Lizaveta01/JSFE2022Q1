import { PageIds } from './store-for-elements';
import BaseElement from './base-element';

const Buttons = [
  {
    id: PageIds.garagePage,
    text: 'TO GARAGE',
  },
  {
    id: PageIds.winnersPage,
    text: 'TO WINNERS',
  }
]

export default class Header extends BaseElement<HTMLElement> {
  
  constructor() {
    super('header', ['header'])
  }

 renderPageButtons(){
    const pageButtons = document.createElement('div');
    pageButtons.classList.add('header-buttons');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement ('button');
      const buttonLink = document.createElement ('a');
      buttonLink.href = `#${button.id}`;
      buttonLink.innerText = button.text;
      buttonHTML.append(buttonLink);
      pageButtons.append(buttonHTML);
    });

    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}
