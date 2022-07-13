export function slider() {
  
  let sliderOne = document.getElementById("slider-1") as HTMLInputElement;
  let sliderTwo = document.getElementById("slider-2") as HTMLInputElement;
  let displayValOne = document.getElementById("range1") as HTMLInputElement;
  let displayValTwo = document.getElementById("range2") as HTMLInputElement;
  let sliderTrack = document.querySelector(".slider-track") as HTMLElement;
  let sliderMaxValue = sliderOne.max;

  let minGap: number = 5;

  sliderOne.oninput = function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = String(parseInt(sliderTwo.value) - minGap);
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
    filterPrice()
  }

  sliderTwo.oninput = function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = String(parseInt(sliderOne.value) + minGap);
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
    filterPrice()
  }

  function fillColor(){
    const persent1: number = (+sliderOne.value / +sliderMaxValue) * 100;
    const persent2: number = (+sliderTwo.value / +sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, rgb(226, 226, 226) ${persent1}%, #3264fe ${persent1}%, #3264fe ${persent2}%, rgb(226, 226, 226) ${persent2}%) `
  }

  function filterPrice(){
    const items = document.querySelectorAll('.shoes-card');
    const max = +sliderTwo.value;
    const min = +sliderOne.value;
    
    items.forEach((el) => {
      const val = Number(el.getAttribute('data-price'));
      if (min < val && val < max){
        el.classList.remove('hiden')
      } else {
        el.classList.add('hiden')
      }
    })
  }
}