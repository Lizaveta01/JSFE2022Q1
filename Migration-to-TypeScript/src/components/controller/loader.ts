import { IAppSourceNews } from '../view/appView';

enum ErrorTypes {
    Error_404 = 404,
    Error_401 = 401,
}
class Loader {
    baseLink: string;
    options: Record<string, string>;

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options}: {endpoint: string, options?: Record<string, string | null>},
        callback: (data: IAppSourceNews) => void = () =>{
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === ErrorTypes.Error_401 || res.status === ErrorTypes.Error_404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options?: Record<string, string | null>, endpoint?: string) {
        const urlOptions = { ...this.options, ...options };
        console.log(urlOptions);
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }
    
    load(method: string, endpoint: string, callback: (data: IAppSourceNews) => void , options?: Record<string, string | null>) {
        console.log(options)
        fetch(this.makeUrl(options, endpoint), { method }) 
            .then(this.errorHandler)
            .then((res) => res.json()) 
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
