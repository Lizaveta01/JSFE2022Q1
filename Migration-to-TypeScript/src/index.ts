import App from './components/app/app';
import './global.css';

const app = new App();
;








//TODO: НАйди куда это привязать в отдельный файл


enum Cate {
  categoryValue,


}

const filterCategory: string[] = ["general","business", "technology", "sports", "entertainment","health","science"]
const filterCountry: string[] = ['us','au','no', 'it','sa', 'pk', 'gb', 'de', 'br', 'ca', 'es', 'ar', 'fr', 'in', 'is', 'ru', 'se', 'za', 'ie', 'nl', 'zh'];
const filterLanguage: string[] = ['en', 'no', 'it', 'ar', 'ud', 'de', 'pt', 'es', 'fr', 'he', 'ru', 'sv', 'nl', 'zh'];

const sectionCategory = <HTMLSelectElement>document.getElementById('section__category');
const sectionCountry = <HTMLSelectElement>document.getElementById('section__country');
const sectionLanguage = <HTMLSelectElement>document.getElementById('section__language');
const sectionNumber = <HTMLSelectElement>document.getElementById('section__news');
const form = document.querySelector('form') as HTMLElement;


function createOption(text:string[], select: HTMLSelectElement) {
    text.forEach((item) => {
        const option: HTMLOptionElement = document.createElement('option');
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
    }
     )}
     createOption(filterCategory, sectionCategory);
     createOption(filterCountry, sectionCountry );
     createOption(filterLanguage, sectionLanguage);

export function submitForm(){
      const categoryValue = sectionCategory.options[sectionCategory.selectedIndex].value;
      const countryValue = sectionCountry.options[sectionCountry.selectedIndex].value;
      const languageValue = sectionLanguage.options[sectionLanguage.selectedIndex].value;
      // const numberValue = sectionNumber.options[sectionNumber.selectedIndex].value;
     localStorage.setItem('category', categoryValue);
      localStorage.setItem('country', countryValue);
      localStorage.setItem('language', languageValue);
      // localStorage.setItem('numberNews', numberValue);
      app.start()

   }
   
document.addEventListener('DOMContentLoaded', function(){
       const categoryValue = localStorage.getItem('category');
       const countryValue = localStorage.getItem('country');
       const languageValue = localStorage.getItem('language');
      //  const numberValue = localStorage.getItem('numberNews');
       
       
       if(categoryValue && countryValue && languageValue) {
           sectionCategory.value = categoryValue;
           sectionCountry.value = countryValue;
           sectionLanguage.value = languageValue;
          //  sectionNumber.value = numberValue;
       }
   });
   
form.addEventListener('submit', (e) => {
       e.preventDefault();
       submitForm()
   
     })
