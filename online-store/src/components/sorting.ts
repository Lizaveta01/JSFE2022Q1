import { cards } from './cards_info'
import { draw } from './createcard';
const sortInput = document.getElementById('section__sort') as HTMLSelectElement;

export function sort(){
  const indexSelected = sortInput.selectedIndex;
  let option = sortInput.querySelectorAll('option')[indexSelected];
  let selectedId = option.getAttribute('id');

  if(selectedId == '1') sortByDateOld();
  if(selectedId == '2') sortByDateNew();
  if(selectedId == '3') sortByPriceHightLow();
  if(selectedId == '4') sortByPriceLowHight();
}

function sortByPriceHightLow() {
  cards.sort((a,b) => +b.price - +a.price);
  draw(cards)
}
function sortByPriceLowHight() {
  cards.sort((a,b) => +a.price - +b.price);
  draw(cards)
}
function sortByDateNew() {
  cards.sort((a,b) => +b.release - +a.release);
  draw(cards)
}
function sortByDateOld() {
  cards.sort((a,b) => +a.release - +b.release);
  draw(cards)
}

//*? Не уверена что это правильно - при сортировке перерисовывать карточки