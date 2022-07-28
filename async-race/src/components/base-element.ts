export default class BaseElement <T extends HTMLElement> {
  container: T;
  innerText: string | undefined;

  constructor(selector: string, classes: string[], innerText = '') {
    this.container = document.createElement(selector) as T;
    this.container.classList.add(...classes);
    this.container.innerText = innerText;
  }
 
}