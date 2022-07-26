export default class NotFoundElement {
  container: HTMLElement;

  constructor(){
    this.container = document.createElement('p');
    this.container.classList.add('notify');
    this.container.innerText = `Sorry, we couldn't find the page you're looking for`;
  }
 
}