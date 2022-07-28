/* eslint-disable @typescript-eslint/no-useless-constructor */
import BaseElement from '../../components/base-element';
import Page from '../../components/page';
import { selectors } from '../../components/selectors';
import Car from './cars-contaier';
import Controller from './controller-container';

export default class GaragePage extends Page {
  car: Car;
  carsContainer: BaseElement<HTMLElement>;
  controllers: Controller;
  
  constructor (id: string) {
    super(id);
    this.controllers = new Controller();
    this.container.appendChild(this.controllers.container);
    this.createHeaderTitle(selectors.garagePageTitle,'garage-page-title', 'garage-count-cars');
    this.createPageNumberContainer();
    this.carsContainer = new BaseElement<HTMLElement>('div', ['cars-container']);
    this.car = new Car();
    this.carsContainer.container.appendChild(this.car.container);
    this.container.appendChild(this.carsContainer.container);
  }


  render(){
    return this.container;
  } 
}