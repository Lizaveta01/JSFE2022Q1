import { addListeners, garageUpdate, PageButtonsUpdate, render } from "./components/app";
import './style.scss';

async function init() {
  await garageUpdate();
  await render();
  PageButtonsUpdate();
  addListeners();
}

init();

