import BaseElement from "../../components/base-element";
import Button from "./buttons";

export default class Controller extends BaseElement<HTMLDivElement>{

  constructor(){
    super('div', ['controllers-container'])
    this.createInputControllercontainer( 'car-create', 'input-text', 'input-color', 'button-create', 'create');
    this.createInputControllercontainer( 'car-update', 'input-text-update', 'input-color-update', 'button-update', 'update');
    this.createButtonsContainer();



  }

  createInputControllercontainer(divClass: string, textClass: string, colorClass: string, buttonClass: string, buttonText: string){
    const containerCreateCar = new BaseElement<HTMLFormElement>('form', [divClass]);
    const inputText = new BaseElement<HTMLInputElement> ('input', [textClass]);
    inputText.container.type = 'text';
    const inputColor = new BaseElement<HTMLInputElement>('input', [colorClass]);
    inputColor.container.type = 'color';
    const button =  new Button( [buttonClass], buttonText);
    button.container.type = 'submit';
    containerCreateCar.container.appendChild(inputText.container);
    containerCreateCar.container.appendChild(inputColor.container);
    containerCreateCar.container.appendChild(button.container);
    this.container.appendChild(containerCreateCar.container);
  }

  createButtonsContainer(){
    const container = new BaseElement<HTMLDivElement>('div', ['controllers__buttons']);
    const buttonStartRace = new Button(['button-race'], 'race');
    const buttonReset = new Button(['button-reset'], 'reset');
    const buttonGenerateCars = new Button(['button-generate'], 'generate cars');
    container.container.appendChild(buttonStartRace.container);
    container.container.appendChild(buttonReset.container);
    container.container.appendChild(buttonGenerateCars.container);
    this.container.appendChild(container.container);
  }

}