import AppLoader from './appLoader';
import { IAppSourceNews } from '../view/appView';

class AppController extends AppLoader {
    
    callback: (data: IAppSourceNews) => void = () =>{
        console.error('No callback for GET response');
    }

    getSources(callback: (data: IAppSourceNews) => void) {
        super.getResp(
            { endpoint: 'sources',
            options: {
                'category': localStorage.getItem('category'),
                'country': localStorage.getItem('country'),
                'language': localStorage.getItem('language')
            }},
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: IAppSourceNews) => void) {

        let target: Element | null | ParentNode = e.target instanceof Element ? e.target : null;
        const newsContainer = e.currentTarget instanceof Element ? e.currentTarget : null;

        while (target !== newsContainer) {
            if (target instanceof Element && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer instanceof Element && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId ? sourceId : '');
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId as string ,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target instanceof Element ? target.parentNode : null; ;
        }
    }
}

export default AppController;
