import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '8a0c446e37a14e469e683932db32fed2', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
