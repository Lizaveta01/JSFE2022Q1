import './sources.css';
export interface ISources {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

class Sources {
    draw(data: ISources[]) {
        const sources = document.querySelector('.sources') as HTMLElement;
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        sources.innerHTML = '';

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const sourceName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            sourceName.textContent = item.name;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        sources.append(fragment);
    }
}

export default Sources;
