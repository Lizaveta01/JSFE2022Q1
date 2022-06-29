const sectionCategory = <HTMLSelectElement>document.getElementById('section__category');
const sectionCountry = <HTMLSelectElement>document.getElementById('section__country');
const sectionLanguage = <HTMLSelectElement>document.getElementById('section__language');


const filterCategory: string[] = ["general","business", "technology", "sports", "entertainment","health","science"]
const filterCountry: string[] = ['us','au','no', 'it','sa', 'pk', 'gb', 'de', 'br', 'ca', 'es', 'ar', 'fr', 'in', 'is', 'ru', 'se', 'za', 'ie', 'nl', 'zh'];
const filterLanguage: string[] = ['en', 'no', 'it', 'ar', 'ud', 'de', 'pt', 'es', 'fr', 'he', 'ru', 'sv', 'nl', 'zh'];

createOption(filterCategory, sectionCategory);
createOption(filterCountry, sectionCountry );
createOption(filterLanguage, sectionLanguage);

//load data to LocalStorage
export function writeLocalStorage() {
    const categoryValue = sectionCategory.options[sectionCategory.selectedIndex].value;
    const countryValue = sectionCountry.options[sectionCountry.selectedIndex].value;
    const languageValue = sectionLanguage.options[sectionLanguage.selectedIndex].value;
    localStorage.setItem('category', categoryValue);
    localStorage.setItem('country', countryValue);
    localStorage.setItem('language', languageValue);
  }

//make additional option to select
export function createOption(text:string[], select: HTMLSelectElement) {
    text.forEach((item) => {
        const option: HTMLOptionElement = document.createElement('option');
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
    }
     )}

// help save information after click 'show' and reload page
document.addEventListener('DOMContentLoaded', function(){
    const categoryValue = localStorage.getItem('category');
    const countryValue = localStorage.getItem('country');
    const languageValue = localStorage.getItem('language');
    if(categoryValue && countryValue && languageValue) {
        sectionCategory.value = categoryValue;
        sectionCountry.value = countryValue;
        sectionLanguage.value = languageValue;
    }
});