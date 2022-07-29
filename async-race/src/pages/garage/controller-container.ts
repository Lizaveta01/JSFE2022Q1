import BaseElement from "../../components/base-element";
import Button from "./buttons";

export default class Controller extends BaseElement<HTMLDivElement>{
  containerCreateCar: BaseElement<HTMLFormElement>;
  inputText: BaseElement<HTMLInputElement>;

  constructor(){
    super('div', ['controllers-container']);
       
    this.containerCreateCar = new BaseElement<HTMLFormElement>('form', ['car-create']);
    this.inputText = new BaseElement<HTMLInputElement> ('input', ['input-text']);
    this.inputText.container.type = 'text';
    this.inputColor = new BaseElement<HTMLInputElement>('input', ['input-color']);
    this.inputColor.container.type = 'color';
    this.buttonCreate =  new Button( ['button-create'], 'create');
    this.buttonCreate.container.type = 'submit';
    this.containerCreateCar.container.appendChild(this.inputText.container);
    this.containerCreateCar.container.appendChild(this.inputColor.container);
    this.containerCreateCar.container.appendChild(buttonCreate.container);
    this.container.appendChild(containerCreateCar.container);

    const containerUpdateCar = new BaseElement<HTMLFormElement>('form', ['car-create']);
    const inputTextUpdate = new BaseElement<HTMLInputElement> ('input', ['input-text']);
    inputText.container.type = 'text';
    const inputColorUpdate = new BaseElement<HTMLInputElement>('input', ['input-color']);
    inputColor.container.type = 'color';
    const buttonUpdate =  new Button( ['button-create'], 'create');
    buttonUpdate.container.type = 'submit';
    containerUpdateCar.container.appendChild(inputTextUpdate.container);
    containerUpdateCar.container.appendChild(inputColorUpdate.container);
    containerUpdateCar.container.appendChild(buttonUpdate.container);
    this.container.appendChild(containerCreateCar.container);



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