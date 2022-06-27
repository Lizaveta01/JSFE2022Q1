import News from './news/news';
import Sources from './sources/sources';
import { ISources } from './sources/sources';
import { INews } from './news/news';

export interface IAppSourceNews {
    status: string,
    sources?: ISources[],
    totalResults?: number,
    articles?: INews[]
}

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IAppSourceNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IAppSourceNews) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
