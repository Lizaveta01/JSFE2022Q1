import AppController from '../controller/controller';
import { AppView, IAppNews, IAppSource } from '../view/appView';

class App {
    controller: AppController
    view: AppView

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {

       const source = document.querySelector('.sources') as HTMLTemplateElement;
       source.addEventListener('click', (e) => this.controller.getNews(e, (data: IAppNews) => this.view.drawNews(data )));
       this.controller.getSources((data: IAppSource ) => this.view.drawSources(data));
    //    this.controller.getSources((data) => console.log(data));
    }
}

export default App;
