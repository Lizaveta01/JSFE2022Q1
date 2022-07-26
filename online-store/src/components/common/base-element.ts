export default class BaseElement <T extends HTMLElement> {
  container: T;

  constructor(selector: string, classes: string[], inner = '') {
    this.container = document.createElement(selector) as T;
    this.container.classList.add(...classes);
    this.container.innerText = inner;
  }
 
}