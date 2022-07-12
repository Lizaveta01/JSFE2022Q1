interface Filter {
  category: string[],
  gender:string[],
  material:string[]
}
const filterObj: Filter ={
  category: [],
  gender:[],
  material:[]
}
//*?  Вопросы: хотела вынести из getCheckedCheckBoxes() чтобы элементы пушились в filterObj.category но возникает ошибка, что при одном клике добавляется сразу несколько строк одной категории. Когда массив, например  checkboxesChecked находится в функции - все в порядке


//определяет какой чекбокс выбран
export function getCheckedCheckBoxes(){
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
  const items = document.querySelectorAll('.shoes-card');
  items.forEach((el) => {
    if (arr.indexOf(el.children[2].innerHTML) == -1){
      el.classList.add('hiden') 
    } else {
      el.classList.remove('hiden')
    }
  })
  //если не выбран не один чекбокс то видны все эелементы
  if(arr.length == 0){
    items.forEach((el) => el.classList.remove('hiden'))
  }
}    

//*?  Вопросы: почему если делать так: const checkboxCategory: HTMLElement появляется ошибка Type 'HTMLElement | null' is not assignable to type 'HTMLElement'.Type 'null' is not assignable to type 'HTMLElement'.ts(2322), а если прописать через as - все в порядке

//*?  Вопросы: возникает ошибка, которую я не могу побороть и поэтому использую any let numberInput: any

// * если выношу const items = document.querySelectorAll('.shoes-card'); функция не видит items и не работает