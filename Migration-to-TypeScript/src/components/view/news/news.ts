import './news.css';

class News {
    draw(data) {
        const news = data.length >= 10 ? data.filter((_item: {}, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            const newsItem = newsClone.querySelector('.news__item') as HTMLElement;

            if (idx % 2) newsItem.classList.add('alt');

            const newsPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            
            newsPhoto.style.backgroundImage = `url(${ item.urlToImage || 'img/news_placeholder.jpg'})`;

            const author = newsClone.querySelector('.news__meta-author') as HTMLElement;
            author.textContent = item.author || item.source.name;

            const newsDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
            newsDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            descriptionTitle.textContent = item.title;
            
            const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
            descriptionSource.textContent = item.source.name;

            const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
            descriptionContent.textContent = item.description;

            const readMore = newsClone.querySelector('.news__read-more a') as HTMLElement;
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLElement;
        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
