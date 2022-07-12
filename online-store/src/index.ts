import './style.scss';
import { slider } from './components/slider';
import { draw } from './components/createcard';
import { cards, ICards } from './components/cards_info';


slider();
draw(cards);



//================================================================SEARCH
  let inputSearch = document.querySelector('#input-search') as HTMLInputElement;
  const products = document.querySelector('.products') as HTMLElement;
  const notify = document.querySelector('.notify') as HTMLElement;
  const catalog = document.querySelector('.catalog') as HTMLElement;

  const items = document.querySelectorAll('.shoes-card');
  inputSearch.oninput = function () {
  let text = inputSearch.value.trim();
  let count = items.length;
  // products.innerHTML = "";
  if(text != ''){
    items.forEach((el) => {
    
      if(el.children[1].innerHTML.toLowerCase().search(text.toLowerCase()) == -1){
        el.classList.add('hiden') 
        count--
        } else {
        notify.classList.add('hiden');
        catalog.classList.remove('catalog__hiden');
        el.classList.remove('hiden')}   
      if(count == 0){
        notify.classList.remove('hiden');
        catalog.classList.add('catalog__hiden');
      }
    });
  } else {
    notify.classList.add('hiden');
    catalog.classList.remove('catalog__hiden');
  }
}

//=======================================================HIDE FILTERS 
const buttonHide = document.querySelector('#hide-filter') as HTMLElement;
const filter = document.querySelector('.filter') as HTMLElement;
buttonHide.onclick = function (){
filter.classList.toggle('hiden');
}

//======================================================ADD TO BASKET
const counterBasket = document.querySelector('.counter-products') as HTMLElement;
let counter = 0;
const inBasket = document.querySelectorAll('.shoes-card');

inBasket.forEach(item => item.addEventListener('click', function(){
  const status = item.querySelector('.basket-status') as HTMLElement;
 
  counter >= 21 ? seeNotify (): addToBasket() ;

  //Позволяет удалить элемент, который уже находится в корзинеб если в корзине больше 20 товаров 
  if (counter > 20 && status.classList.contains('active')){
    seeNotify ();
    status.classList.remove('active');
    counter --;
    counterBasket.innerHTML = counter.toString();
  }
 //Показывает уведомление, что корзина переполнена и не позволяет добавлять в корзину новые товары
  function seeNotify () {
    notify.innerText = 'Sorry, basket is full. \r\n Please, remove something'
    notify.classList.remove('hiden');
    catalog.classList.add('catalog__hiden');
    setTimeout(function(){
      notify.classList.add('hiden');
      catalog.classList.remove('catalog__hiden');
      notify.innerText = "Sorry, we couldn't find the page you're looking for";
    }, 2000);  
  }
  //Добавляет в корзину новые товары
  function addToBasket(){
    status.classList.toggle('active');
    status.classList.contains('active') ? counter++ : counter --;
    counterBasket.innerHTML = counter.toString();
  }
}));
//=======================================================SORTING

const sortInput = document.getElementById('section__sort') as HTMLSelectElement;

// при нажатии определяет на каком option был сделан клик
sortInput.onchange = function (){
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

//*?  Вопросы: почему я не могу вынести фунцкию sortInput.onchange = sort() и ниже прописать саму функцию sort, выходит ошибка на (property) GlobalEventHandlers.onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null  (Fires when the contents of the object or selection have changed.@param ev — The event.)

//======================================================CHECKBOX FILTER
 
const checkboxCategory = document.querySelector('#checkbox__category') as HTMLElement;
interface Filter {
  category: string[],
  gender:string[],
  material:string[]
}
//*?  Вопросы: хотела вынести из getCheckedCheckBoxes() чтобы элементы пушились в filterObj.category но возникает ошибка, что при одном клике добавляется сразу несколько строк одной категории. Когда массив, например  checkboxesChecked находится в функции - все в порядке
const filterObj: Filter ={
  category: [],
  gender:[],
  material:[]
}
//Определяет какой чекбокс выбран
function getCheckedCheckBoxes(){
    const checkboxes = document.getElementsByClassName('custom-checkbox');
    const checkboxesChecked: string[] = []; 
    for (var index = 0; index < checkboxes.length; index++) {
      let numberInput: any = checkboxes[index];
       if (numberInput.checked) {
        checkboxesChecked.push(numberInput.name); 
       }
    }
    console.log(checkboxesChecked)
    contains(checkboxesChecked);  
}
//скрывает элементы, которые не выбраны
function contains (arr: string[]){
  items.forEach((el) => {
    
    if (arr.indexOf(el.children[2].innerHTML) == -1){
      el.classList.add('hiden') 
      console.log(el.children[2].innerHTML)
    } else {
      el.classList.remove('hiden')
    }
  })
  if(arr.length == 0){
    items.forEach((el) => el.classList.remove('hiden'))
  }
}    
//вызывает отслеживание кликнутых чекбоксов
checkboxCategory.addEventListener('click', getCheckedCheckBoxes);

//*?  Вопросы: почему если делать так: const checkboxCategory: HTMLElement появляется ошибка Type 'HTMLElement | null' is not assignable to type 'HTMLElement'.Type 'null' is not assignable to type 'HTMLElement'.ts(2322), а если прописать через as - все в порядке

//*?  Вопросы: возникает ошибка, которую я не могу побороть и поэтому использую any let numberInput: any

//*!  BUG: при активации сортировки по цене перестает работать функции добавления в корзину и фильтр по чекбоксам