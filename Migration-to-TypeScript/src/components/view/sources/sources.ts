import './sources.css';
import { addOptions } from './filter'
export interface ISources {
    category: string,
    country: string,
    description: string,
    id: string,
    language: string,
    name: string,
    url: string
}

class Sources {
    draw(data: ISources []) {
        
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const sourceName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            sourceName.textContent = item.name;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
            addOptions(item.category, item.country, item.language);

        });
        
        const sources = document.querySelector('.sources') as HTMLElement;
        sources.append(fragment);
    }
}

export default Sources;

