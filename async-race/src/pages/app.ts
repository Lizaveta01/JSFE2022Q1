import Page from '../components/page';
import Header from '../components/header';
import GaragePage from './garage/garage';
import { PageIds } from '../components/store-for-elements';
import WinnersPage from './winners/winners';
import Footer from '../components/footer';
import BaseElement from '../components/base-element';



export default class App{
  private main: BaseElement<HTMLElement>;
  private footer: Footer;
  private container: HTMLElement = document.body; 
  private defaultPageId: string;
  private initialPage: GaragePage;
  private header: Header;

  constructor(){
    this.initialPage = new GaragePage('garage-page');
    this.header = new Header();
    this.footer = new Footer();
    this.main = new BaseElement<HTMLElement>('main', ['main']);
    this.defaultPageId = 'current-page';
  }

  renderNewPage(idPage:string) {
    console.log(idPage);
    let page: Page | null = null;
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`);
    // очистка окна перед загрузкой новой страницы
    if (currentPageHTML) {
      currentPageHTML.remove()
    }
    
    if (idPage === PageIds.garagePage) {
      page = new GaragePage(idPage);
    } else if (idPage === PageIds.winnersPage) {
      page = new WinnersPage(idPage);
    }   

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = this.defaultPageId;
      this.main.container.append(pageHTML);
    }
  }

  //запускает генерацию страницы при клике по кнопкам
  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    })
  }
  //запускает генерацию страницы
  run() {
    this.container.append(this.header.render());
    this.container.append(this.main.container);
    this.container.append(this.footer.render());
    this.renderNewPage(window.location.hash.slice(1));
    this.enableRouteChange();
    
  }
}