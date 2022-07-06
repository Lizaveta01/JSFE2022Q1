export function slider() {
  
let sliderOne = document.getElementById("slider-1") as HTMLInputElement;
let sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
let displayValOne = document.getElementById("range1") as HTMLInputElement;
let displayValTwo = document.getElementById("range2") as HTMLInputElement;

let minGap: number = 5;

sliderOne.oninput = function slideOne(){
  if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = String(parseInt(sliderTwo.value) - minGap);
  }
  displayValOne.textContent = sliderOne.value;
}

sliderTwo.oninput = function slideTwo(){
  if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = String(parseInt(sliderOne.value) + minGap);
  }
  displayValTwo.textContent = sliderTwo.value;
}

}