enum ErrorTypes {
    Error_404 = 404,
    Error_401 = 401,
}

interface IResponce {
    body: ReadableStream,
    bodyUsed: boolean,
    headers: Headers,
    ok: boolean,
    redirected: false,
    status: number,
    statusText: string,
    type: string,
    url: string
}

class Loader {
    private baseLink: string;
    private options: {[prop:string]: string};

    constructor(baseLink: string, options: {[prop:string]: string}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options}: {endpoint: string, options?: Record<string, string>},
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: IResponce) {
        if (!res.ok) {
            if (res.status === ErrorTypes.Error_401 || res.status === ErrorTypes.Error_404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options, endpoint: string) {
console.log(options)
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method, endpoint: string, callback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
