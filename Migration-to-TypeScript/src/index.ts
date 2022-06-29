import App from './components/app/app';
import { writeLocalStorage } from './components/view/sources/filter';
import './global.css';

const form = document.querySelector('form') as HTMLElement;
const app = new App();


form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm()
})

function submitForm(){
  writeLocalStorage();
  app.start();
}
   
   

