const filterCategory: string[] = [];
const filterCountry: string[] = [];
const filterLanguage: string[] = [];


const sectionCategory = <HTMLSelectElement>document.getElementById('section__category');
const sectionCountry = <HTMLSelectElement>document.getElementById('section__country');
const sectionLanguage = <HTMLSelectElement>document.getElementById('section__language');
const sectionNumber = <HTMLSelectElement>document.getElementById('section__news');

const form = document.querySelector('form') as HTMLElement;

function createOption(text:string, select: HTMLSelectElement) {
    const option: HTMLOptionElement = document.createElement('option');
    option.value = text;
    option.innerText = text;
    select.appendChild(option);
}


export function addOptions(category:string, country: string, language: string) {
    if (filterCategory.indexOf(category) == -1){
        filterCategory.push(category);
        createOption(category, sectionCategory);
    }
    if (filterCountry.indexOf(country) == -1){
        filterCountry.push(country);
        createOption(country, sectionCountry);
    }
    if (filterLanguage.indexOf(language) == -1){
        filterLanguage.push(language);
        createOption(language, sectionLanguage);
    }
}



document.addEventListener('DOMContentLoaded', function(){
	const categoryValue = localStorage.getItem('category');
    const countryValue = localStorage.getItem('country');
    const languageValue = localStorage.getItem('language');
    const numberValue = localStorage.getItem('numberNews');
    if(categoryValue && countryValue && languageValue && numberValue) {
        sectionCategory.value = categoryValue;
        sectionCountry.value = countryValue;
        sectionLanguage.value = languageValue;
        sectionNumber.value = numberValue;
    }

});


 function submitForm(){
    const categoryValue = sectionCategory.options[sectionCategory.selectedIndex].value;
    const countryValue = sectionCountry.options[sectionCountry.selectedIndex].value;
    const languageValue = sectionLanguage.options[sectionLanguage.selectedIndex].value;
    const numberValue = sectionNumber.options[sectionNumber.selectedIndex].value;
 	localStorage.setItem('category', categoryValue);
    localStorage.setItem('country', countryValue);
    localStorage.setItem('language', languageValue);
    localStorage.setItem('numberNews', numberValue);
 }


form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm()
  })

