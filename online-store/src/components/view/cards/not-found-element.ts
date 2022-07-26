export default class NotFoundElement {
  container: HTMLElement;

  constructor() {
    this.container = document.createElement('p');
    this.container.classList.add('notify');
    this.container.innerText = 'Sorry, we could not find the page you are looking for';
  }
 
}