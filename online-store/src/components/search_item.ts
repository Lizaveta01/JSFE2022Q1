let inputSearch = document.querySelector('#input-search') as HTMLInputElement;
const notify = document.querySelector('.notify') as HTMLElement;
const catalog = document.querySelector('.catalog') as HTMLElement;


export function searchItem() {
const items = document.querySelectorAll('.shoes-card');
let text = inputSearch.value.trim();
let count = items.length;
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
  items.forEach((el) => el.classList.remove('hiden'))
}
}

// * если выношу const items = document.querySelectorAll('.shoes-card'); функция не видит items и не работает