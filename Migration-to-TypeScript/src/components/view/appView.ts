import News from './news/news';
import Sources from './sources/sources';
import { ISources } from './sources/sources';
import { INews } from './news/news';

export interface IAppSource {
    status: string,
    sources: ISources[]
}

export interface IAppNews {
    status: string,
    totalResults: number,
    articles: INews[]
}


export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IAppNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IAppSource) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
