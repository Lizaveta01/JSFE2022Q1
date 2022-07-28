import BaseElement from "./base-element";

export default class Page {
  container:HTMLElement;

  constructor (id: string) {
    this.container = document.createElement('section');
    this.container.classList.add(id);
  }

  createHeaderTitle(textTitle: string, classTitle: string, classCountCars: string) {
    const headerContainer = new BaseElement('div',['title-container']);
    const headerTitle = new BaseElement('h1',[classTitle], textTitle);
    const headerCount = new BaseElement('h1',[classCountCars], '()');
    headerContainer.container.appendChild(headerTitle.container);
    headerContainer.container.appendChild(headerCount.container);
    this.container.append(headerContainer.container);
  }

  createPageNumberContainer(){
    const pageContainer = new BaseElement('div', ['page']);
    const pageName = new BaseElement('p', ['page-name'], 'Page');
    const pageCount = new BaseElement('p', ['page-number'], '#');
    pageContainer.container.appendChild(pageName.container);
    pageContainer.container.appendChild(pageCount.container);
    this.container.appendChild(pageContainer.container);
  }
  
  render(){
    return this.container;
  } 
}