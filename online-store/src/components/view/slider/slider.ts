import { selectors } from "../../models/selectors";

class Slider {
  sliderOne: HTMLInputElement;
  sliderTwo: HTMLInputElement;
  displayValOne: HTMLInputElement;
  displayValTwo: HTMLInputElement;
  sliderTrack: HTMLElement;
  sliderMaxValue: string;
  minGap: number;

  constructor(){
    this.sliderOne = document.getElementById(selectors.sliderPointRight) as HTMLInputElement;
    this.sliderTwo = document.getElementById(selectors.sliderPointLeft) as HTMLInputElement;
    this.displayValOne = document.getElementById(selectors.sliderValueRight) as HTMLInputElement;
    this.displayValTwo = document.getElementById(selectors.sliderValueLeft) as HTMLInputElement;
    this.sliderTrack = document.querySelector(selectors.sliderTrack) as HTMLElement;
    this.sliderMaxValue = this.sliderOne.max;
    this.minGap = 5;
    this.start()
  }
 
  start(){

    this.sliderOne.addEventListener('click', () => {
      if(parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <= this.minGap) {
        this.sliderOne.value = String(parseInt(this.sliderTwo.value) - this.minGap);
        
      }
      this.displayValOne.textContent = this.sliderOne.value;
      localStorage.setItem('minPrice', this.sliderOne.value) 
      this.fillColor();

    })
    this.sliderTwo.addEventListener('click', () => {
      if(parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <= this.minGap) {
        this.sliderTwo.value = String(parseInt(this.sliderOne.value) + this.minGap);
      }
      this.displayValTwo.textContent = this.sliderTwo.value;
      localStorage.setItem('maxPrice', this.sliderTwo.value) 
      this.fillColor();
  })
  }

  fillColor(){
    const persent1: number = (+this.sliderOne.value / +this.sliderMaxValue) * 100;
    const persent2: number = (+this.sliderTwo.value / +this.sliderMaxValue) * 100;
    this.sliderTrack.style.background = `linear-gradient(to right, rgb(226, 226, 226) ${persent1}%, #3264fe ${persent1}%, #3264fe ${persent2}%, rgb(226, 226, 226) ${persent2}%) `
  }
}

export default Slider