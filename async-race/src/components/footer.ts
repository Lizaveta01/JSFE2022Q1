import Button from '../pages/garage/buttons';
import BaseElement from './base-element';

export default class Footer extends BaseElement<HTMLElement> {
  buttonRev: Button;
  buttonNext: Button;
  
  constructor() {
    super('footer', ['footer']);
    this.buttonRev = new Button(['button-prev'], 'prev');
    this.buttonNext = new Button(['button-next'], 'next');
    this.container.appendChild(this.buttonRev.container);
    this.container.appendChild(this.buttonNext.container);
  }

  render() {
    return this.container;
  }
}