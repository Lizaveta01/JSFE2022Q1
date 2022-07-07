import { cards } from './cards_info'

 export function draw(){
    const products = document.querySelector('.products') as HTMLElement;
    const fragment = document.createDocumentFragment();

    cards.forEach((el) => {
      const shoesCard = document.createElement('div');
      shoesCard.classList.add('shoes-card');
      shoesCard.innerHTML = `
      <img src="${el.image}" alt="img">
      <p id="shoes__name">${el.name}</p>
      <p id="shoes__category">${el.category}</p>
      <p id="shoes__colors">${el.color.length} colors</p>
      <p id="shoes__price">$${el.price}</p>`;

      fragment.append(shoesCard);
    });
    products.appendChild(fragment);
}

