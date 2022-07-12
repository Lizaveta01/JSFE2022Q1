import './style.scss'
import { slider } from './components/slider'
import { draw } from './components/createcard'
import { cards } from './components/cards_info'
import { sort } from './components/sorting'
import { searchItem } from './components/search_item'
import { getCheckedCheckBoxes } from './components/checked_checkbox'
// import { buttonColor } from './components/colorfilter'

slider();
draw(cards);



//SEARCH
let inputSearch = document.querySelector('#input-search') as HTMLInputElement;
inputSearch.oninput = searchItem
  
//HIDE FILTERS 
const buttonHide = document.querySelector('#hide-filter') as HTMLElement;
const filter = document.querySelector('.filter') as HTMLElement;
buttonHide.onclick = function (){
filter.classList.toggle('hiden');
}

//SORTING
const sortInput = document.getElementById('section__sort') as HTMLSelectElement;
sortInput.onchange = sort

//CHECKBOX FILTER
const checkboxCategory = document.querySelector('#checkbox__category') as HTMLElement;
checkboxCategory.addEventListener('click', getCheckedCheckBoxes);

//ADD TO BASKET
const notify = document.querySelector('.notify') as HTMLElement;
const catalog = document.querySelector('.catalog') as HTMLElement;
const counterBasket = document.querySelector('.counter-products') as HTMLElement;
let counter = 0;
const inBasket = document.querySelectorAll('.shoes-card');

inBasket.forEach(item => item.addEventListener('click', function(){
  console.log('222')
  const status = item.querySelector('.basket-status') as HTMLElement;
 
  counter >= 21 ? seeNotify (): addToBasket() ;

  //Позволяет удалить элемент, который уже находится в корзине если в корзине больше 20 товаров 
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
//======================================================
//FILTER BY SLIDER
// * Есть идея создать объект в котором будут хранится данные обо всех выбранных значениях фильтра. Если значения переменных внутри объекта будут пустыми, будут видны все карточки

interface Filter {
  category: string[],
  price:Record<string, number>,
  color: string[],
  size: string[],
  brand: string,
  material:string[]
}
const filterObj: Filter ={
  category: [],
  price:{
    min:0,
    max:300
  },
  color:[],
  size:[],
  brand:'',
  material:[]
}
//========================================================
//CHANGE COLOR
const buttonColor = document.querySelectorAll(".color-btn");

buttonColor.forEach(el => el.addEventListener('click', function(){
  const color:string = el.getAttribute('data-color')!;
  if(el.classList.contains('color__active')){
    el.classList.remove('color__active');
    let index= filterObj.color.findIndex(el => el == color)
    filterObj.color.splice(index, 1)
  }else{
    el.classList.add('color__active');
    filterObj.color.push(color);
  }
  foundMatchColor()
}))

function foundMatchColor(){
  console.log(filterObj);
  const items = document.querySelectorAll('.shoes-card');
  let counterColor = 0;
  items.forEach((el) => {
    el.classList.add('hiden')
    const colorAtr = el.getAttribute('data-color')?.split(',');
    for(let i =0; i < filterObj.color.length; i++){
      if(colorAtr?.indexOf(filterObj.color[i])! >= 0){
        el.classList.remove('hiden')
      }
    }
  })
}






function foundMatch(){
  let counter = 0; //6
  if (!filterObj.color){
    return counter++
  } else{
    //функция сравнения цвета, если есть цвет, возвращает counter, если нет counter-- Карточка будет выводится только в точ случае, если будет после всего прохождения counter = 6
  }
 if (counter = 6){
 }
}



//*?  Вопросы: хотела вынести из getCheckedCheckBoxes() чтобы элементы пушились в filterObj.category но возникает ошибка, что при одном клике добавляется сразу несколько строк одной категории. Когда массив, например  checkboxesChecked находится в функции - все в порядке





//*!  BUG: при активации сортировки по цене перестает работать функции добавления в корзину и фильтр по чекбоксам. Возможно это из-за того, что при сортировке отрисовываются новые карточки. но как это исправить?

//*!  BUG: нет взаимодействия фильтра price и category