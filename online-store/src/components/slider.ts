import { selectors } from "../models/selectors";

export function slider() {
  
  let sliderOne = document.getElementById(selectors.sliderPointRight) as HTMLInputElement;
  let sliderTwo = document.getElementById(selectors.sliderPointLeft) as HTMLInputElement;
  let displayValOne = document.getElementById(selectors.sliderValueRight) as HTMLInputElement;
  let displayValTwo = document.getElementById(selectors.sliderValueLeft) as HTMLInputElement;
  let sliderTrack = document.querySelector(selectors.sliderTrack) as HTMLElement;
  let sliderMaxValue = sliderOne.max;

  let minGap: number = 5;

  sliderOne.oninput = function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = String(parseInt(sliderTwo.value) - minGap);
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
  }

  sliderTwo.oninput = function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = String(parseInt(sliderOne.value) + minGap);
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
  }

  function fillColor(){
    const persent1: number = (+sliderOne.value / +sliderMaxValue) * 100;
    const persent2: number = (+sliderTwo.value / +sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, rgb(226, 226, 226) ${persent1}%, #3264fe ${persent1}%, #3264fe ${persent2}%, rgb(226, 226, 226) ${persent2}%) `
  }
}