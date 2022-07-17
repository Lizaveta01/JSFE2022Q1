/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/app/app.ts":
/*!***********************************!*\
  !*** ./src/components/app/app.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const slider_1 = __importDefault(__webpack_require__(/*! ../controller/slider */ "./src/components/controller/slider.ts"));
const basket_1 = __importDefault(__webpack_require__(/*! ../controller/basket */ "./src/components/controller/basket.ts"));
const renderCards_1 = __importDefault(__webpack_require__(/*! ../view/renderCards */ "./src/components/view/renderCards.ts"));
const filter_1 = __importDefault(__webpack_require__(/*! ../controller/filter */ "./src/components/controller/filter.ts"));
const sortCard_1 = __importDefault(__webpack_require__(/*! ../controller/sortCard */ "./src/components/controller/sortCard.ts"));
const cardsInfo_1 = __webpack_require__(/*! ../controller/cardsInfo */ "./src/components/controller/cardsInfo.ts");
class App {
    constructor() {
        this.shopCards = new renderCards_1.default();
        this.data;
        this.basket = new basket_1.default();
        this.priceSlicer = new slider_1.default();
        this.counterBasket = document.querySelector('.counter-products');
        this.sort = new sortCard_1.default('.form-select');
        this.filter = new filter_1.default();
    }
    start() {
        this.redraw();
        this.search();
        this.sortCard();
        this.filterData();
        this.seeBasket();
        this.reset();
    }
    search() {
        const searchInput = document.querySelector('#input-search');
        searchInput.addEventListener('input', () => {
            this.redraw();
        });
    }
    filterData() {
        const filterContainer = document.querySelector('.filter');
        filterContainer.addEventListener('click', (e) => {
            const targetElement = e.target;
            console.log(e.target);
            if (targetElement.classList.contains('custom-checkbox')) {
                const checkboxesChecked = [];
                this.filter.categoryList.forEach((checkbox, i) => {
                    checkboxesChecked[i] = checkbox.checked;
                });
                localStorage.setItem('category', JSON.stringify(checkboxesChecked));
            }
            if (targetElement.classList.contains('checkbox-size')) {
                console.log(targetElement);
                const checkboxesChecked = [];
                this.filter.sizeList.forEach((checkbox, i) => {
                    checkboxesChecked[i] = checkbox.checked;
                });
                localStorage.setItem('size', JSON.stringify(checkboxesChecked));
            }
            if (targetElement.classList.contains('checkbox-color')) {
                const checkboxesChecked = [];
                this.filter.colorList.forEach((checkbox, i) => {
                    checkboxesChecked[i] = checkbox.checked;
                });
                localStorage.setItem('color', JSON.stringify(checkboxesChecked));
            }
            if (targetElement.classList.contains('custom-radio')) {
                const checkboxesChecked = [];
                this.filter.materialList.forEach((checkbox, i) => {
                    checkboxesChecked[i] = checkbox.checked;
                });
                localStorage.setItem('material', JSON.stringify(checkboxesChecked));
            }
            const brandInput = document.querySelector('#brands');
            brandInput.addEventListener('change', () => {
                const checkboxesChecked = [];
                this.filter.brandList.forEach((checkbox, i) => {
                    checkboxesChecked[i] = checkbox.selected;
                });
                console.log(checkboxesChecked);
                localStorage.setItem('brand', JSON.stringify(checkboxesChecked));
                this.redraw();
            });
            this.redraw();
        });
    }
    reset() {
        const cleanFilters = document.querySelector('.clear-button');
        cleanFilters === null || cleanFilters === void 0 ? void 0 : cleanFilters.addEventListener('click', () => {
            this.filter.filterReset();
            this.redraw();
        });
    }
    sortCard() {
        this.sort.sortInput.addEventListener('change', () => {
            console.log(this.sort.sortInput);
            localStorage.setItem('sort', this.sort.sortInput.value);
            this.redraw();
        });
    }
    seeBasket() {
        const catalog = document.querySelector('.products');
        catalog.addEventListener('click', (e) => {
            const target = e.target;
            const targetElement = target.closest('.shoes-card');
            if (targetElement) {
                this.basket.toggle(targetElement.children[1].innerHTML);
                this.redraw();
            }
        });
    }
    redraw() {
        this.data = this.filter.filterAll(cardsInfo_1.cards);
        const sortData = this.sort.sort(this.data);
        this.shopCards.draw(sortData, this.basket.basketStorage);
        this.basket.basketCounter ? this.counterBasket.classList.add('has-item') : this.counterBasket.classList.remove('has-item');
        this.counterBasket.innerText = String(this.basket.basketCounter);
    }
}
exports["default"] = App;


/***/ }),

/***/ "./src/components/controller/basket.ts":
/*!*********************************************!*\
  !*** ./src/components/controller/basket.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const selectors_1 = __webpack_require__(/*! ../models/selectors */ "./src/components/models/selectors.ts");
class Basket {
    constructor() {
        this.basketStorage = {};
        this.basketCounter = 0;
        this.modalWindow = document.querySelector(selectors_1.selectors.modalWindow);
        this.modalButton = document.querySelector(selectors_1.selectors.popupButton);
        this.init();
    }
    init() {
        const basket = localStorage.getItem('basketStorage');
        if (basket) {
            this.basketStorage = JSON.parse(basket);
            this.basketCounter = Object.keys(this.basketStorage).length;
        }
        this.modalWindow.addEventListener('click', (e) => {
            if (e.target === this.modalWindow)
                this.modalWindow.classList.remove('visible');
        });
        this.modalButton.addEventListener('click', () => {
            this.modalWindow.classList.remove('visible');
        });
    }
    add(name) {
        if (this.basketStorage[name]) {
            this.basketStorage[name] += 1;
        }
        else {
            this.basketStorage[name] = 1;
        }
        this.basketCounter += 1;
        localStorage.setItem('basketStorage', JSON.stringify(this.basketStorage));
    }
    remove(name) {
        if (this.basketStorage[name]) {
            this.basketStorage[name] -= 1;
            this.basketCounter -= 1;
        }
        if (this.basketStorage[name] <= 0)
            delete this.basketStorage[name];
        localStorage.setItem('basketStorage', JSON.stringify(this.basketStorage));
    }
    toggle(name) {
        if (this.basketStorage[name]) {
            delete this.basketStorage[name];
            this.basketCounter -= 1;
        }
        else if (this.basketCounter >= 20) {
            this.showModal();
            return;
        }
        else {
            this.basketStorage[name] = 1;
            this.basketCounter += 1;
        }
        localStorage.setItem('basketStorage', JSON.stringify(this.basketStorage));
    }
    clear() {
        this.basketStorage = {};
        this.basketCounter = 0;
        localStorage.removeItem('basketStorage');
    }
    showModal() {
        this.modalWindow.classList.add('visible');
    }
}
exports["default"] = Basket;


/***/ }),

/***/ "./src/components/controller/cardsInfo.ts":
/*!************************************************!*\
  !*** ./src/components/controller/cardsInfo.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cards = void 0;
exports.cards = [
    {
        name: 'Nike Waffle One SE',
        category: 'Basketball',
        price: '89',
        gender: 'Mens Shoes',
        color: 'black',
        size: '4.5',
        brand: 'Nike By You',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/29082110-583d-4021-9ff0-57d2cff36c9b/waffle-one-se-shoes-mT3CQN.png',
        release: '2021',
        stock: true
    },
    {
        name: 'Nike Air Force 1',
        category: 'Running',
        price: '115',
        gender: 'Mens Shoes',
        color: 'red',
        size: '7.5',
        brand: 'Jordan',
        material: 'Leather',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/05aeb54f-ca86-48d9-a60f-57d798e3935d/air-max-95-shoes-TJLLsB.png',
        release: '2021',
        stock: true
    },
    {
        name: 'Nike Air Force 2',
        category: 'Jordan',
        price: '100',
        gender: 'Mens Shoes',
        color: 'white',
        size: '5.0',
        brand: 'Nike Sportwear',
        material: 'Leather',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/358b5ffe-0704-4c5a-89fd-0fa5b2b1f99b/air-max-plus-iii-shoe-3BSBtx.png',
        release: '2020',
        stock: true
    },
    {
        name: 'Nike Air Force 3',
        category: 'Lifestyle',
        price: '198',
        gender: 'Mens Shoes',
        color: 'red',
        size: '4.0',
        brand: 'NikeLab',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/312e0df6-a0c6-4a5d-ba01-e837b3d8ee49/jordan-delta-3-sp-shoes.png',
        release: '2019',
        stock: false
    },
    {
        name: 'Nike Air Force 4',
        category: 'Football',
        price: '156',
        gender: 'Mens Shoes',
        color: 'pink',
        size: '6.0',
        brand: 'Jordan',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4180e725-4966-463b-8c22-71e3ca6a9a55/air-jordan-2-retro-sp-shoes.png',
        release: '2022',
        stock: false
    },
    {
        name: 'Nike Air Force 5',
        category: 'Training',
        price: '178',
        gender: 'Mens Shoes',
        color: 'green',
        size: '5.5',
        brand: 'Nike By You',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0db30447-d199-4373-bf36-6cbb439e96c2/air-max-terrascape-90-shoes-wdBkKH.png',
        release: '2020',
        stock: false
    },
    {
        name: 'Nike Air Force 6',
        category: 'Skateboarding',
        price: '260',
        gender: 'Mens Shoes',
        color: 'green',
        size: '3.5',
        brand: 'ACG',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e6b5dd64-1a32-45f8-8f19-8f421a1cdd6d/air-max-terrascape-90-shoes-CRn0XW.png',
        release: '2021',
        stock: true
    },
    {
        name: 'Nike Air Force 7',
        category: 'Golf',
        price: '240',
        gender: 'Mens Shoes',
        color: 'red',
        size: '3.0',
        brand: 'NikeLab',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/271371f3-0f5c-47c7-b4b4-f840e8b488c1/air-pegasus-83-shoes-hq200x.png',
        release: '2020',
        stock: false
    },
    {
        name: 'Nike Air Force 8',
        category: 'Tennis',
        price: '222',
        gender: 'Mens Shoes',
        color: 'blue',
        size: '8.0',
        brand: 'ACG',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b00a5170-20ed-4cda-9c69-6c1e0a04276e/air-force-1-07-shoes-KprQCr.png',
        release: '2022',
        stock: false
    },
    {
        name: 'Nike Waff SE',
        category: 'Basketball',
        price: '289',
        gender: 'Mens Shoes',
        color: 'black',
        size: '4.5',
        brand: 'Nike By You',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6ae95951-4abe-455c-8962-42cbadebfbb7/zoom-freak-3-basketball-shoes-MZpJZF.png',
        release: '2021',
        stock: true
    },
    {
        name: 'Nike Air Force 1 07 LV8',
        category: 'Running',
        price: '139',
        gender: 'Mens Shoes',
        color: 'red',
        size: '4.5',
        brand: 'Jordan',
        material: 'Leather',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/45289cb4-2ae6-4165-be6c-88237d42c819/zoomx-streakfly-road-racing-shoes-Zv8Jbg.png',
        release: '2022',
        stock: true
    },
    {
        name: 'Nike x Stüssy Air Force 1 07 Mid',
        category: 'Jordan',
        price: '111',
        gender: 'Mens Shoes',
        color: 'white',
        size: '8.5',
        brand: 'Nike Sportwear',
        material: 'Leather',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e1c1290c-5314-47dd-ba1b-20ae4780897e/kyrie-low-5-community-jewell-loyd-basketball-shoes-zwtk0S.png',
        release: '2020',
        stock: true
    },
    {
        name: 'Nike Air Max 97',
        category: 'Lifestyle',
        price: '167',
        gender: 'Mens Shoes',
        color: 'red',
        size: '3.5',
        brand: 'NikeLab',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8a3bab79-6c98-4a03-a8a5-1ca70bbd2362/zion-2-basketball-shoes-khWbrw.png',
        release: '2019',
        stock: false
    },
    {
        name: 'Air Jordan 1 Retro High OG',
        category: 'Football',
        price: '103',
        gender: 'Mens Shoes',
        color: 'pink',
        size: '6.0',
        brand: 'Jordan',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/51fe0926-f146-4bde-9f3c-fefc0f0107ff/ispa-link-shoes.png',
        release: '2022',
        stock: false
    },
    {
        name: 'Nike Air Max 95 Essential',
        category: 'Training',
        price: '154',
        gender: 'Mens Shoes',
        color: 'green',
        size: '6.5',
        brand: 'Nike By You',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e58ac538-a815-46ad-a14d-132f3d2cc3bb/zoomx-vaporfly-next-2-road-racing-shoes-821S4F.png',
        release: '2020',
        stock: false
    },
    {
        name: 'Nike x ACRONY Blazer Low',
        category: 'Skateboarding',
        price: '299',
        gender: 'Mens Shoes',
        color: 'green',
        size: '7.0',
        brand: 'ACG',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f2635aab-deeb-443b-a5cf-59419e6e663b/air-max-95-essential-shoes-Zgg3pn.png',
        release: '2021',
        stock: true
    },
    {
        name: 'Nike Air Max Plus',
        category: 'Golf',
        price: '201',
        gender: 'Mens Shoes',
        color: 'red',
        size: '8.0',
        brand: 'NikeLab',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/506a05c7-eea4-4405-af12-bba32bd0e48c/air-jordan-1-retro-high-og-shoes-79vGWV.png',
        release: '2020',
        stock: true
    },
    {
        name: 'Nike Pegasus Trail 3 GORE-TEX',
        category: 'Tennis',
        price: '267',
        gender: 'Mens Shoes',
        color: 'blue',
        size: '3.0',
        brand: 'ACG',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ee2a1e79-4626-46c7-b181-6fadbc2351a4/stussy-air-force-1-07-mid-shoes-bdsfmH.png',
        release: '2022',
        stock: true
    },
    {
        name: 'KD15',
        category: 'Jordan',
        price: '111',
        gender: 'Mens Shoes',
        color: 'white',
        size: '5.5',
        brand: 'Nike Sportwear',
        material: 'Leather',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8d584e3e-e2b5-4d19-9e73-174d599055eb/air-max-plus-shoes-x37n30.png',
        release: '2020',
        stock: true
    },
    {
        name: 'Nike Zoom Alphafly Next Nature',
        category: 'Lifestyle',
        price: '167',
        gender: 'Mens Shoes',
        color: 'red',
        size: '6.5',
        brand: 'NikeLab',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f4ea7019-b9a5-434d-9753-976cae67049b/air-max-97-shoes.png',
        release: '2019',
        stock: false
    },
    {
        name: 'Air Jordan 1 Retro High OG',
        category: 'Football',
        price: '103',
        gender: 'Mens Shoes',
        color: 'pink',
        size: '6.0',
        brand: 'Jordan',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1641853f-5265-467d-96dc-8a1c14ce76ca/kd15-basketball-shoes-0H8pmQ.png',
        release: '2022',
        stock: false
    },
    {
        name: 'NikeCourt Zoom Pro',
        category: 'Training',
        price: '154',
        gender: 'Mens Shoes',
        color: 'green',
        size: '6.5',
        brand: 'Nike By You',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5eb6df1b-20f1-48a9-b94a-b9b494a79636/zoom-alphafly-next-nature-road-racing-shoe-3mk9g2.png',
        release: '2020',
        stock: false
    },
    {
        name: 'Nike x ACRONYM® Blazer Low',
        category: 'Skateboarding',
        price: '299',
        gender: 'Mens Shoes',
        color: 'green',
        size: '7.0',
        brand: 'ACG',
        material: 'Sustainable Materials',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f2423f7a-95a7-40c5-a2b5-bc3eea2bd953/nikecourt-zoom-pro-clay-court-tennis-shoes-qJFxc8.png',
        release: '2021',
        stock: true
    },
    {
        name: 'Air Jordan 1 Low FlyEase',
        category: 'Golf',
        price: '201',
        gender: 'Mens Shoes',
        color: 'red',
        size: '8.0',
        brand: 'NikeLab',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b3db3acb-3a16-479e-8aea-49f8e3aef01b/air-zoom-flight-95-shoes-j7MRhz.png',
        release: '2020',
        stock: true
    },
    {
        name: 'Nike Air Zoom Tempo NEXT%',
        category: 'Tennis',
        price: '267',
        gender: 'Mens Shoes',
        color: 'blue',
        size: '8.5',
        brand: 'ACG',
        material: 'Canvas',
        img: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/2b21b6be-2e24-4c7f-abe3-70fb409bf231/revolution-6-next-nature-road-running-shoes-DvtXMX.png',
        release: '2022',
        stock: true
    }
];


/***/ }),

/***/ "./src/components/controller/filter.ts":
/*!*********************************************!*\
  !*** ./src/components/controller/filter.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const selectors_1 = __webpack_require__(/*! ../models/selectors */ "./src/components/models/selectors.ts");
const slider_1 = __importDefault(__webpack_require__(/*! ./slider */ "./src/components/controller/slider.ts"));
class Filter {
    constructor() {
        this.searchField = document.querySelector(selectors_1.selectors.searchField);
        this.categoryListName = document.querySelector(selectors_1.selectors.categoryListName);
        this.categoryList = this.categoryListName.querySelectorAll(selectors_1.selectors.checkboxList);
        this.priceSlider = document.querySelector(selectors_1.selectors.priceSlider);
        this.sliderOne = document.getElementById(selectors_1.selectors.sliderPointRight);
        this.sliderTwo = document.getElementById(selectors_1.selectors.sliderPointLeft);
        this.colorListName = document.querySelector(selectors_1.selectors.colorListName);
        this.colorList = this.colorListName.querySelectorAll(selectors_1.selectors.colorList);
        this.sizeListName = document.querySelector(selectors_1.selectors.sizeListName);
        this.sizeList = this.sizeListName.querySelectorAll(selectors_1.selectors.sizeList);
        this.brandListName = document.querySelector(selectors_1.selectors.brandListName);
        this.brandList = this.brandListName.querySelectorAll(selectors_1.selectors.option);
        this.materialListName = document.querySelector(selectors_1.selectors.materialListName);
        this.materialList = this.materialListName.querySelectorAll(selectors_1.selectors.radioButton);
        this.cleanFiltersButton = document.querySelector(selectors_1.selectors.cleanFiltersButton);
        this.newPriceFilter = new slider_1.default();
        this.init();
    }
    init() {
        this.hideFilter();
        const checkedCategoryOption = JSON.parse(localStorage.getItem('category'));
        const checkedColorOption = JSON.parse(localStorage.getItem('color'));
        const checkedSizeOption = JSON.parse(localStorage.getItem('size'));
        const checkedBrandOption = JSON.parse(localStorage.getItem('brand'));
        const checkedMaterialOption = JSON.parse(localStorage.getItem('material'));
        if (checkedCategoryOption) {
            this.categoryList.forEach((chbox, idx) => {
                chbox.checked = checkedCategoryOption[idx];
            });
        }
        if (checkedColorOption) {
            this.colorList.forEach((chbox, idx) => {
                chbox.checked = checkedColorOption[idx];
            });
        }
        if (checkedSizeOption) {
            this.sizeList.forEach((chbox, idx) => {
                chbox.checked = checkedSizeOption[idx];
            });
        }
        if (checkedBrandOption) {
            this.brandList.forEach((chbox, idx) => {
                chbox.selected = checkedBrandOption[idx];
            });
        }
        if (checkedMaterialOption) {
            this.materialList.forEach((chbox, idx) => {
                chbox.checked = checkedMaterialOption[idx];
            });
        }
        let minValue = '0';
        let maxValue = '300';
        if (localStorage.getItem('minPrice')) {
            minValue = localStorage.getItem('minPrice');
        }
        if (localStorage.getItem('maxPrice')) {
            maxValue = localStorage.getItem('maxPrice');
        }
        this.sliderOne.value = minValue;
        this.sliderTwo.value = maxValue;
        this.newPriceFilter.displayValOne.textContent = minValue;
        this.newPriceFilter.displayValTwo.textContent = maxValue;
        this.newPriceFilter.fillColor();
    }
    searchShoesName(data) {
        console.log(this.searchField.value);
        if (!this.searchField.value) {
            return data;
        }
        return data.filter((item) => item.name.toLowerCase().indexOf(this.searchField.value.toLowerCase()) != -1);
    }
    filterByCategory(data) {
        const checkedBox = [];
        this.categoryList.forEach((checkbox) => {
            if (checkbox.checked) {
                checkedBox.push(checkbox.name);
            }
        });
        if (!checkedBox.length) {
            return data;
        }
        else {
            return data.filter((item) => checkedBox.indexOf(item.category) != -1);
        }
    }
    filterByPrice(data) {
        if (+this.sliderOne.value == 0 && +this.sliderTwo.value == 300) {
            return data;
        }
        else {
            return data.filter((item) => +item.price >= +this.sliderOne.value && +item.price <= +this.sliderTwo.value);
        }
    }
    filterByColor(data) {
        const checkedBox = [];
        this.colorList.forEach((checkbox) => {
            if (checkbox.checked) {
                checkedBox.push(checkbox.name);
            }
        });
        if (!checkedBox.length) {
            return data;
        }
        else {
            return data.filter((item) => checkedBox.indexOf(item.color) != -1);
        }
    }
    filterBySize(data) {
        const checkedSize = [];
        this.sizeList.forEach((size) => {
            if (size.checked) {
                checkedSize.push(size.name);
            }
        });
        if (!checkedSize.length) {
            return data;
        }
        else {
            return data.filter((item) => checkedSize.indexOf(item.size) != -1);
        }
    }
    filterByBrand(data) {
        const checkedBrand = [];
        this.brandList.forEach((brand) => {
            if (brand.selected) {
                checkedBrand.push(brand.value);
            }
        });
        if (checkedBrand[0] == 'Select brand') {
            return data;
        }
        else {
            return data.filter((item) => checkedBrand.indexOf(item.brand) != -1);
        }
    }
    filterByMaterial(data) {
        const checkedBox = [];
        this.materialList.forEach((checkbox) => {
            if (checkbox.checked) {
                checkedBox.push(checkbox.value);
            }
        });
        if (!checkedBox.length) {
            return data;
        }
        else {
            return data.filter((item) => checkedBox.indexOf(item.material) != -1);
        }
    }
    filterReset() {
        this.categoryList.forEach((checkbox) => checkbox.checked = false);
        this.newPriceFilter.sliderOne.value = '0';
        this.newPriceFilter.sliderTwo.value = '300';
        this.newPriceFilter.displayValOne.textContent = '0';
        this.newPriceFilter.displayValTwo.textContent = '300';
        this.newPriceFilter.fillColor();
        this.colorList.forEach((color) => color.classList.remove(selectors_1.selectors.selectedColor));
        this.sizeList.forEach((size) => size.checked = false);
        this.brandList.forEach((brand) => {
            const brandInput = document.querySelector('#brands');
            brandInput.value = 'Select brand';
            brand.selected = false;
        });
        this.materialList.forEach((material) => material.checked = false);
        localStorage.removeItem('category');
        localStorage.removeItem('material');
        localStorage.removeItem('brand');
        localStorage.removeItem('size');
        localStorage.removeItem('color');
        localStorage.removeItem('minPrice');
        localStorage.removeItem('maxPrice');
    }
    filterAll(data) {
        let filterData = data;
        filterData = this.searchShoesName(filterData);
        filterData = this.filterByCategory(filterData);
        filterData = this.filterByPrice(filterData);
        filterData = this.filterByColor(filterData);
        filterData = this.filterBySize(filterData);
        filterData = this.filterByBrand(filterData);
        filterData = this.filterByMaterial(filterData);
        return filterData;
    }
    hideFilter() {
        const buttonHide = document.querySelector('#hide-filter');
        const filter = document.querySelector('.filter');
        buttonHide.onclick = function () {
            filter.classList.toggle('hiden');
        };
    }
}
exports["default"] = Filter;


/***/ }),

/***/ "./src/components/controller/slider.ts":
/*!*********************************************!*\
  !*** ./src/components/controller/slider.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const selectors_1 = __webpack_require__(/*! ../models/selectors */ "./src/components/models/selectors.ts");
class Slider {
    constructor() {
        this.sliderOne = document.getElementById(selectors_1.selectors.sliderPointRight);
        this.sliderTwo = document.getElementById(selectors_1.selectors.sliderPointLeft);
        this.displayValOne = document.getElementById(selectors_1.selectors.sliderValueRight);
        this.displayValTwo = document.getElementById(selectors_1.selectors.sliderValueLeft);
        this.sliderTrack = document.querySelector(selectors_1.selectors.sliderTrack);
        this.sliderMaxValue = this.sliderOne.max;
        this.minGap = 5;
        this.start();
    }
    start() {
        console.log(this.sliderOne.value);
        console.log('yes');
        this.sliderOne.addEventListener('click', () => {
            if (parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <= this.minGap) {
                this.sliderOne.value = String(parseInt(this.sliderTwo.value) - this.minGap);
            }
            this.displayValOne.textContent = this.sliderOne.value;
            console.log(this.sliderOne.value);
            localStorage.setItem('minPrice', this.sliderOne.value);
            this.fillColor();
        });
        this.sliderTwo.addEventListener('click', () => {
            if (parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <= this.minGap) {
                this.sliderTwo.value = String(parseInt(this.sliderOne.value) + this.minGap);
            }
            this.displayValTwo.textContent = this.sliderTwo.value;
            localStorage.setItem('maxPrice', this.sliderTwo.value);
            this.fillColor();
        });
    }
    fillColor() {
        const persent1 = (+this.sliderOne.value / +this.sliderMaxValue) * 100;
        const persent2 = (+this.sliderTwo.value / +this.sliderMaxValue) * 100;
        this.sliderTrack.style.background = `linear-gradient(to right, rgb(226, 226, 226) ${persent1}%, #3264fe ${persent1}%, #3264fe ${persent2}%, rgb(226, 226, 226) ${persent2}%) `;
    }
}
exports["default"] = Slider;


/***/ }),

/***/ "./src/components/controller/sortCard.ts":
/*!***********************************************!*\
  !*** ./src/components/controller/sortCard.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class SortCard {
    constructor(elem) {
        this.sortInput = document.querySelector(elem);
        this.init();
    }
    init() {
        const checkedSort = localStorage.getItem('sort');
        if (checkedSort) {
            this.sortInput.value = checkedSort;
        }
    }
    sort(data) {
        switch (this.sortInput.value) {
            case 'releaseON':
                return this.sortByDateOld(data);
            case 'releaseNO':
                return this.sortByDateNew(data);
            case 'priceHL':
                return this.sortByPriceHightLow(data);
            case 'priceLH':
                return this.sortByPriceLowHight(data);
            case 'none':
                return data;
        }
    }
    sortByPriceHightLow(data) {
        return data.sort((a, b) => +b.price - +a.price);
    }
    sortByPriceLowHight(data) {
        return data.sort((a, b) => +a.price - +b.price);
    }
    sortByDateNew(data) {
        return data.sort((a, b) => +b.release - +a.release);
    }
    sortByDateOld(data) {
        return data.sort((a, b) => +a.release - +b.release);
    }
    sortReset() {
        this.sortInput.value = 'releaseNO';
        localStorage.removeItem('sort');
    }
}
exports["default"] = SortCard;


/***/ }),

/***/ "./src/components/models/selectors.ts":
/*!********************************************!*\
  !*** ./src/components/models/selectors.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectors = void 0;
exports.selectors = {
    catalogProducts: '.products',
    shoesTemplate: '.shoes-card-template',
    shoesCardImage: '.shoes-card__image',
    shoesCardName: '.shoes-card__name',
    shoesCardCategory: '.shoes-card__category',
    shoesCardBrand: '.shoes-card__brand',
    shoesCardMaterial: '.shoes-card__material',
    shoesCardPrice: '.shoes-card__price',
    shoesCardColor: '.shoes-card__colors',
    shoesCardStock: '.basket__stock',
    shoesCardBasketButton: '.basket__stock-button',
    modalWindow: '.modal-window-overlay',
    popupButton: '.popup__button',
    searchField: '#input-search',
    categoryListName: '#checkbox__category',
    checkboxList: '.custom-checkbox',
    priceSlider: '.slider',
    colorListName: '.colors',
    colorList: '.checkbox-color',
    sizeListName: '.sizes',
    sizeList: '.checkbox-size',
    brandListName: '#brands',
    option: 'option',
    materialListName: '.material__radio-buttons',
    radioButton: '.custom-radio',
    cleanFiltersButton: '.clear-button',
    sliderPointRight: 'slider-1',
    sliderPointLeft: 'slider-2',
    sliderValueRight: 'range1',
    sliderValueLeft: 'range2',
    sliderTrack: '.slider-track',
    selectedColor: 'color__active',
    selectedSize: 'size__active',
};


/***/ }),

/***/ "./src/components/view/renderCards.ts":
/*!********************************************!*\
  !*** ./src/components/view/renderCards.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const selectors_1 = __webpack_require__(/*! ../models/selectors */ "./src/components/models/selectors.ts");
class RenderCards {
    // shoesItemTemp: HTMLTemplateElement;
    // fragment:DocumentFragment;
    // cardClone: HTMLElement;
    // img: HTMLImageElement;
    // cardName: HTMLElement;
    // cardCategory: HTMLElement;
    // cardBrand: HTMLElement ;
    // cardMaterial: HTMLElement;
    // cardPrice: HTMLElement;
    // cardColor: HTMLElement;
    // cardStock: HTMLElement;
    // cardBasketButton: HTMLElement;
    constructor() {
        // this.shoesItemTemp = document.querySelector(selectors.shoesTemplate) as HTMLTemplateElement;
        // this.fragment = document.createDocumentFragment();
        // this.cardClone = this.shoesItemTemp?.content.cloneNode(true) as HTMLElement;
        // this.img = this.cardClone?.querySelector(selectors.shoesCardImage) as HTMLImageElement;
        // this.cardName = this.cardClone.querySelector(selectors.shoesCardName) as HTMLElement;
        // this.cardCategory =this.cardClone.querySelector(selectors.shoesCardCategory) as HTMLElement;
        // this.cardBrand =this.cardClone.querySelector(selectors.shoesCardBrand) as HTMLElement;
        // this.cardMaterial = this.cardClone.querySelector(selectors.shoesCardMaterial) as HTMLElement;
        // this.cardPrice = this.cardClone.querySelector(selectors.shoesCardPrice) as HTMLElement;
        // this.cardColor = this.cardClone.querySelector(selectors.shoesCardColor) as HTMLElement;
        // this.cardStock = this.cardClone.querySelector(selectors.shoesCardStock) as HTMLElement;
        // this.cardBasketButton = this.cardClone.querySelector(selectors.shoesCardBasketButton) as HTMLElement;
        this.products = document.querySelector(selectors_1.selectors.catalogProducts);
    }
    draw(data, basket) {
        const shoesItemTemp = document.querySelector(selectors_1.selectors.shoesTemplate);
        const fragment = document.createDocumentFragment();
        if (!data.length) {
            const text = document.createElement('p');
            text.textContent = "Sorry, we couldn't find the page you're looking for";
            text.classList.add('notify');
            fragment.append(text);
        }
        else {
            data.forEach((item) => {
                const cardClone = shoesItemTemp === null || shoesItemTemp === void 0 ? void 0 : shoesItemTemp.content.cloneNode(true);
                const img = cardClone === null || cardClone === void 0 ? void 0 : cardClone.querySelector(selectors_1.selectors.shoesCardImage);
                const cardName = cardClone.querySelector(selectors_1.selectors.shoesCardName);
                const cardCategory = cardClone.querySelector(selectors_1.selectors.shoesCardCategory);
                const cardBrand = cardClone.querySelector(selectors_1.selectors.shoesCardBrand);
                const cardMaterial = cardClone.querySelector(selectors_1.selectors.shoesCardMaterial);
                const cardPrice = cardClone.querySelector(selectors_1.selectors.shoesCardPrice);
                const cardColor = cardClone.querySelector(selectors_1.selectors.shoesCardColor);
                const cardStock = cardClone.querySelector(selectors_1.selectors.shoesCardStock);
                const cardBasketButton = cardClone.querySelector(selectors_1.selectors.shoesCardBasketButton);
                img.src = item.img;
                cardName.innerText = item.name;
                cardCategory.textContent = item.category;
                cardBrand.textContent = item.brand;
                cardMaterial.textContent = item.material;
                cardColor.textContent = `${item.color} color`;
                cardPrice.textContent = `$${item.price}`;
                cardStock.textContent = item.stock ? 'In stock' : 'On request';
                item.stock
                    ? cardStock.classList.add('shoes-in-stock')
                    : cardStock.classList.add('shoes-out-of-stock');
                cardBasketButton.textContent = basket[item.name] ? 'In the basket' : 'Add to basket';
                basket[item.name]
                    ? cardBasketButton.classList.add('added')
                    : cardBasketButton.classList.remove('added');
                fragment.append(cardClone);
            });
        }
        this.products.innerHTML = '';
        this.products.appendChild(fragment);
    }
}
exports["default"] = RenderCards;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./style.scss */ "./src/style.scss");
const app_1 = __importDefault(__webpack_require__(/*! ./components/app/app */ "./src/components/app/app.ts"));
const app = new app_1.default();
app.start();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSwySEFBMEM7QUFDMUMsMkhBQTBDO0FBQzFDLDhIQUE4QztBQUU5QywySEFBMEM7QUFDMUMsaUlBQThDO0FBQzlDLG1IQUFnRDtBQUVoRCxNQUFNLEdBQUc7SUFTUDtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBRTtRQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQWdCLENBQUM7UUFDaEYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGtCQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQXFCLENBQUM7UUFDaEYsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNmLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxlQUFlLEdBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQWdCLENBQUM7UUFDeEUsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlDLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFxQixDQUFDO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLElBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBQztnQkFDckQsTUFBTSxpQkFBaUIsR0FBYyxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0MsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDMUMsQ0FBQyxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2FBRXJFO1lBQ0QsSUFBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBQztnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7Z0JBQzFCLE1BQU0saUJBQWlCLEdBQWMsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQzFDLENBQUMsQ0FBQztnQkFDRixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUVqRTtZQUNELElBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBQztnQkFDcEQsTUFBTSxpQkFBaUIsR0FBYyxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDMUMsQ0FBQyxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2FBRWxFO1lBQ0QsSUFBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBQztnQkFDbEQsTUFBTSxpQkFBaUIsR0FBYyxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDL0MsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDMUMsQ0FBQyxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2FBQ3JFO1lBRUQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQXNCLENBQUM7WUFDMUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFFLEVBQUU7Z0JBQ3hDLE1BQU0saUJBQWlCLEdBQWMsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzVDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQzNDLENBQUMsQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2dCQUM5QixZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUs7UUFDSCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQztRQUM1RCxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFFLEVBQUU7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVM7UUFDUCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBZ0IsQ0FBQztRQUNuRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQXFCLENBQUM7WUFDdkMsTUFBTSxhQUFhLEdBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQWdCLENBQUM7WUFDbEUsSUFBRyxhQUFhLEVBQUM7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQUssQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNGO0FBQ0QscUJBQWUsR0FBRzs7Ozs7Ozs7Ozs7OztBQ3BJbEIsMkdBQStDO0FBQy9DLE1BQU0sTUFBTTtJQU1WO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsV0FBVyxDQUFnQixDQUFDO1FBQ2hGLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLFdBQVcsQ0FBZ0IsQ0FBQztRQUNoRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVDLElBQUk7UUFDQSxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUM1QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsR0FBRyxDQUFDLElBQVc7UUFDWCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7UUFDeEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVc7UUFDZCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM3QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQVc7UUFDZCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1NBQzNCO2FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTztTQUNWO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUNELFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUNELEtBQUs7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixZQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQUVELHFCQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDdkVSLGFBQUssR0FBYTtJQUM3QjtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsUUFBUSxFQUFFLFlBQVk7UUFDdEIsS0FBSyxFQUFFLElBQUk7UUFDWCxNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLGFBQWE7UUFDcEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsR0FBRyxFQUFFLHdJQUF3STtRQUM3SSxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRDtRQUNFLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRLEVBQUUsU0FBUztRQUNuQixHQUFHLEVBQUMscUlBQXFJO1FBQ3pJLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLElBQUk7S0FDWjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLEtBQUssRUFBQyxPQUFPO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLEdBQUcsRUFBQywwSUFBMEk7UUFDOUksT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsSUFBSTtLQUNaO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxTQUFTO1FBQ2hCLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsR0FBRyxFQUFDLHFJQUFxSTtRQUN6SSxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxLQUFLO0tBQ2I7SUFDRDtRQUNFLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUUsTUFBTTtRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLFFBQVE7UUFDZixRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLEdBQUcsRUFBRSx5SUFBeUk7UUFDOUksT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsS0FBSztLQUNiO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFHLE9BQU87UUFDZixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsR0FBRyxFQUFFLGdKQUFnSjtRQUNySixPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxLQUFLO0tBQ2I7SUFDRDtRQUNFLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsUUFBUSxFQUFFLGVBQWU7UUFDekIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLEtBQUs7UUFDWixRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLEdBQUcsRUFBRSxnSkFBZ0o7UUFDckosT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsSUFBSTtLQUNaO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxTQUFTO1FBQ2hCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEdBQUcsRUFBRSx5SUFBeUk7UUFDOUksT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsS0FBSztLQUNiO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFFLE1BQU07UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxLQUFLO1FBQ1osUUFBUSxFQUFFLFFBQVE7UUFDbEIsR0FBRyxFQUFFLHlJQUF5STtRQUM5SSxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxLQUFLO0tBQ2I7SUFDRDtRQUNFLElBQUksRUFBRSxjQUFjO1FBQ3BCLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFFLE9BQU87UUFDZCxJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxhQUFhO1FBQ3BCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEdBQUcsRUFBRSxrSkFBa0o7UUFDdkosT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsSUFBSTtLQUNaO0lBQ0Q7UUFDRSxJQUFJLEVBQUUseUJBQXlCO1FBQy9CLFFBQVEsRUFBRSxTQUFTO1FBQ25CLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxRQUFRO1FBQ2YsUUFBUSxFQUFFLFNBQVM7UUFDbkIsR0FBRyxFQUFDLHNKQUFzSjtRQUMxSixPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRDtRQUNFLElBQUksRUFBRSxrQ0FBa0M7UUFDeEMsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUMsT0FBTztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLGdCQUFnQjtRQUN2QixRQUFRLEVBQUUsU0FBUztRQUNuQixHQUFHLEVBQUMsdUtBQXVLO1FBQzNLLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLElBQUk7S0FDWjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixRQUFRLEVBQUUsV0FBVztRQUNyQixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsU0FBUztRQUNoQixRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLEdBQUcsRUFBQyw0SUFBNEk7UUFDaEosT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsS0FBSztLQUNiO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsNEJBQTRCO1FBQ2xDLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFFLE1BQU07UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxRQUFRO1FBQ2YsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxHQUFHLEVBQUUsNkhBQTZIO1FBQ2xJLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNEO1FBQ0UsSUFBSSxFQUFFLDJCQUEyQjtRQUNqQyxRQUFRLEVBQUUsVUFBVTtRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLEtBQUssRUFBRyxPQUFPO1FBQ2YsSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsYUFBYTtRQUNwQixRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLEdBQUcsRUFBRSw0SkFBNEo7UUFDakssT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsS0FBSztLQUNiO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsNEJBQTRCO1FBQ2xDLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFFLE9BQU87UUFDZCxJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxLQUFLO1FBQ1osUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxHQUFHLEVBQUUsK0lBQStJO1FBQ3BKLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLElBQUk7S0FDWjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsU0FBUztRQUNoQixRQUFRLEVBQUUsUUFBUTtRQUNsQixHQUFHLEVBQUUscUpBQXFKO1FBQzFKLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLElBQUk7S0FDWjtJQUNEO1FBQ0UsSUFBSSxFQUFFLCtCQUErQjtRQUNyQyxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLEtBQUssRUFBRSxNQUFNO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEdBQUcsRUFBRSxvSkFBb0o7UUFDekosT0FBTyxFQUFFLE1BQU07UUFDZixLQUFLLEVBQUUsSUFBSTtLQUNaO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLFlBQVk7UUFDcEIsS0FBSyxFQUFDLE9BQU87UUFDYixJQUFJLEVBQUUsS0FBSztRQUNYLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsR0FBRyxFQUFDLHVJQUF1STtRQUMzSSxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRDtRQUNFLElBQUksRUFBRSxnQ0FBZ0M7UUFDdEMsUUFBUSxFQUFFLFdBQVc7UUFDckIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLFNBQVM7UUFDaEIsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxHQUFHLEVBQUMsOEhBQThIO1FBQ2xJLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNEO1FBQ0UsSUFBSSxFQUFFLDRCQUE0QjtRQUNsQyxRQUFRLEVBQUUsVUFBVTtRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLEtBQUssRUFBRSxNQUFNO1FBQ2IsSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsUUFBUTtRQUNmLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsR0FBRyxFQUFFLDBJQUEwSTtRQUMvSSxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxLQUFLO0tBQ2I7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUcsT0FBTztRQUNmLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLGFBQWE7UUFDcEIsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxHQUFHLEVBQUUsK0pBQStKO1FBQ3BLLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLEtBQUs7S0FDYjtJQUNEO1FBQ0UsSUFBSSxFQUFFLDRCQUE0QjtRQUNsQyxRQUFRLEVBQUUsZUFBZTtRQUN6QixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxZQUFZO1FBQ3BCLEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLEtBQUs7UUFDWCxLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsR0FBRyxFQUFFLCtKQUErSjtRQUNwSyxPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRDtRQUNFLElBQUksRUFBRSwwQkFBMEI7UUFDaEMsUUFBUSxFQUFFLE1BQU07UUFDaEIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLFNBQVM7UUFDaEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsR0FBRyxFQUFFLDZJQUE2STtRQUNsSixPQUFPLEVBQUUsTUFBTTtRQUNmLEtBQUssRUFBRSxJQUFJO0tBQ1o7SUFDRDtRQUNFLElBQUksRUFBRSwyQkFBMkI7UUFDakMsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLEtBQUs7UUFDWixNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUUsTUFBTTtRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsS0FBSyxFQUFFLEtBQUs7UUFDWixRQUFRLEVBQUUsUUFBUTtRQUNsQixHQUFHLEVBQUUsZ0tBQWdLO1FBQ3JLLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLElBQUk7S0FDWjtDQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDdlVELDJHQUErQztBQUMvQywrR0FBOEI7QUFFOUIsTUFBTSxNQUFNO0lBa0JWO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsV0FBVyxDQUFxQixDQUFDO1FBQ3JGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsZ0JBQWdCLENBQWUsQ0FBQztRQUN6RixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLFdBQVcsQ0FBZSxDQUFDO1FBQy9FLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBUyxDQUFDLGdCQUFnQixDQUFxQixDQUFDO1FBQ3pGLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBUyxDQUFDLGVBQWUsQ0FBcUIsQ0FBQztRQUN4RixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQVMsQ0FBQyxhQUFhLENBQWUsQ0FBQztRQUNuRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMscUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQVMsQ0FBQyxZQUFZLENBQWUsQ0FBQztRQUNqRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMscUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQVMsQ0FBQyxhQUFhLENBQWUsQ0FBQztRQUNuRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMscUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLGdCQUFnQixDQUFlLENBQUM7UUFDekYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMscUJBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLGtCQUFrQixDQUFlLENBQUM7UUFDN0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUEsSUFBSTtRQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixNQUFNLHFCQUFxQixHQUFjLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sa0JBQWtCLEdBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUM7UUFDakYsTUFBTSxpQkFBaUIsR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQztRQUMvRSxNQUFNLGtCQUFrQixHQUFjLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDO1FBQ2pGLE1BQU0scUJBQXFCLEdBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxDQUFDLENBQUM7UUFFdkYsSUFBSSxxQkFBcUIsRUFBRTtZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDdkMsS0FBSyxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBRyxrQkFBa0IsRUFBQztZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDcEMsS0FBSyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBRyxpQkFBaUIsRUFBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDbkMsS0FBSyxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxDQUFDLENBQUM7U0FDRjtRQUNELElBQUcsa0JBQWtCLEVBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3BDLEtBQUssQ0FBQyxRQUFRLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUcscUJBQXFCLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3ZDLEtBQUssQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksUUFBUSxHQUFFLEdBQUcsQ0FBQztRQUNsQixJQUFJLFFBQVEsR0FBRSxLQUFLLENBQUM7UUFDcEIsSUFBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBQ2xDLFFBQVEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxDQUFDO1NBQzlDO1FBQ0QsSUFBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBQ2xDLFFBQVEsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7SUFDaEMsQ0FBQztJQUVGLGVBQWUsQ0FBQyxJQUFjO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDbkMsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFDO1lBQ3pCLE9BQU8sSUFBSTtTQUNaO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFjO1FBQzdCLE1BQU0sVUFBVSxHQUFZLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUcsUUFBUSxDQUFDLE9BQU8sRUFBQztnQkFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsSUFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUM7WUFDcEIsT0FBTyxJQUFJO1NBQ1o7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQWM7UUFDMUIsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFBQztZQUM1RCxPQUFPLElBQUk7U0FDWjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUMzRztJQUNILENBQUM7SUFFRCxhQUFhLENBQUMsSUFBYztRQUMxQixNQUFNLFVBQVUsR0FBWSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsQyxJQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQztRQUNGLElBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDO1lBQ3BCLE9BQU8sSUFBSTtTQUNaO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ25FO0lBQ0gsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFjO1FBQ3pCLE1BQU0sV0FBVyxHQUFZLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztnQkFDZCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUM7UUFDRixJQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQztZQUNyQixPQUFPLElBQUk7U0FDWjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDaEU7U0FDRjtJQUNILENBQUM7SUFFRCxhQUFhLENBQUMsSUFBYztRQUMxQixNQUFNLFlBQVksR0FBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQixJQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUM7Z0JBQ2hCLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQztRQUNGLElBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsRUFBQztZQUNuQyxPQUFPLElBQUk7U0FDWjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFjO1FBQzdCLE1BQU0sVUFBVSxHQUFZLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUcsUUFBUSxDQUFDLE9BQU8sRUFBQztnQkFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsSUFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUM7WUFDcEIsT0FBTyxJQUFJO1NBQ1o7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQXNCLENBQUM7WUFDMUUsVUFBVSxDQUFDLEtBQUssR0FBRyxjQUFjO1lBQ2pDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFjO1FBQ3RCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBZ0IsQ0FBQztRQUN6RSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBZ0IsQ0FBQztRQUNoRSxVQUFVLENBQUMsT0FBTyxHQUFHO1lBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxxQkFBZSxNQUFNOzs7Ozs7Ozs7Ozs7O0FDL05yQiwyR0FBZ0Q7QUFFaEQsTUFBTSxNQUFNO0lBU1Y7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBcUIsQ0FBQztRQUN6RixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMscUJBQVMsQ0FBQyxlQUFlLENBQXFCLENBQUM7UUFDeEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsZ0JBQWdCLENBQXFCLENBQUM7UUFDN0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsZUFBZSxDQUFxQixDQUFDO1FBQzVGLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLFdBQVcsQ0FBZ0IsQ0FBQztRQUNoRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUU7SUFDZCxDQUFDO0lBRUQsS0FBSztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzVDLElBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDakYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUU3RTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUN0RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFbkIsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzlDLElBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDakYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3RTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ3RELFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ3RELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUM7SUFDRixDQUFDO0lBRUQsU0FBUztRQUNQLE1BQU0sUUFBUSxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUUsTUFBTSxRQUFRLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM5RSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsZ0RBQWdELFFBQVEsY0FBYyxRQUFRLGNBQWMsUUFBUSx5QkFBeUIsUUFBUSxLQUFLO0lBQ2hMLENBQUM7Q0FDRjtBQUVELHFCQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7QUNwRHJCLE1BQU0sUUFBUTtJQUVaLFlBQVksSUFBVztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFzQixDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLEVBQUU7SUFDYixDQUFDO0lBRUQsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBRyxXQUFXLEVBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDcEM7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQWM7UUFDakIsUUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQztZQUMxQixLQUFLLFdBQVc7Z0JBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLEtBQUssV0FBVztnQkFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsS0FBSyxTQUFTO2dCQUNaLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLEtBQUssU0FBUztnQkFDWixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxJQUFJO1NBQ2Q7SUFDSCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBYztRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELG1CQUFtQixDQUFDLElBQWM7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxhQUFhLENBQUMsSUFBYztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELGFBQWEsQ0FBQyxJQUFjO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsU0FBUztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQUVELHFCQUFlLFFBQVE7Ozs7Ozs7Ozs7Ozs7O0FDakRULGlCQUFTLEdBQUc7SUFDeEIsZUFBZSxFQUFFLFdBQVc7SUFDNUIsYUFBYSxFQUFDLHNCQUFzQjtJQUNwQyxjQUFjLEVBQUMsb0JBQW9CO0lBQ25DLGFBQWEsRUFBQyxtQkFBbUI7SUFDakMsaUJBQWlCLEVBQUMsdUJBQXVCO0lBQ3pDLGNBQWMsRUFBQyxvQkFBb0I7SUFDbkMsaUJBQWlCLEVBQUMsdUJBQXVCO0lBQ3pDLGNBQWMsRUFBQyxvQkFBb0I7SUFDbkMsY0FBYyxFQUFDLHFCQUFxQjtJQUNwQyxjQUFjLEVBQUMsZ0JBQWdCO0lBQy9CLHFCQUFxQixFQUFDLHVCQUF1QjtJQUM3QyxXQUFXLEVBQUMsdUJBQXVCO0lBQ25DLFdBQVcsRUFBQyxnQkFBZ0I7SUFDNUIsV0FBVyxFQUFDLGVBQWU7SUFDM0IsZ0JBQWdCLEVBQUMscUJBQXFCO0lBQ3RDLFlBQVksRUFBQyxrQkFBa0I7SUFDL0IsV0FBVyxFQUFDLFNBQVM7SUFDckIsYUFBYSxFQUFFLFNBQVM7SUFDeEIsU0FBUyxFQUFFLGlCQUFpQjtJQUM1QixZQUFZLEVBQUUsUUFBUTtJQUN0QixRQUFRLEVBQUMsZ0JBQWdCO0lBQ3pCLGFBQWEsRUFBRSxTQUFTO0lBQ3hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLGdCQUFnQixFQUFFLDBCQUEwQjtJQUM1QyxXQUFXLEVBQUMsZUFBZTtJQUMzQixrQkFBa0IsRUFBQyxlQUFlO0lBQ2xDLGdCQUFnQixFQUFDLFVBQVU7SUFDM0IsZUFBZSxFQUFDLFVBQVU7SUFDMUIsZ0JBQWdCLEVBQUMsUUFBUTtJQUN6QixlQUFlLEVBQUMsUUFBUTtJQUN4QixXQUFXLEVBQUMsZUFBZTtJQUMzQixhQUFhLEVBQUUsZUFBZTtJQUM5QixZQUFZLEVBQUUsY0FBYztDQUM3Qjs7Ozs7Ozs7Ozs7OztBQ2pDRCwyR0FBK0M7QUFDL0MsTUFBTSxXQUFXO0lBRWYsc0NBQXNDO0lBQ3RDLDZCQUE2QjtJQUM3QiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0IsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3QiwwQkFBMEI7SUFDMUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixpQ0FBaUM7SUFFakM7UUFDRSwrRkFBK0Y7UUFDL0YscURBQXFEO1FBQ3JELCtFQUErRTtRQUMvRSwwRkFBMEY7UUFDMUYsd0ZBQXdGO1FBQ3hGLCtGQUErRjtRQUMvRix5RkFBeUY7UUFDekYsZ0dBQWdHO1FBQ2hHLDBGQUEwRjtRQUMxRiwwRkFBMEY7UUFDMUYsMEZBQTBGO1FBQzFGLHdHQUF3RztRQUN4RyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQVMsQ0FBQyxlQUFlLENBQWdCLENBQUM7SUFDckYsQ0FBQztJQUVDLElBQUksQ0FBQyxJQUFjLEVBQUUsTUFBNEI7UUFDL0MsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLGFBQWEsQ0FBd0IsQ0FBQztRQUM3RixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUVuRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcscURBQXFELENBQUM7WUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNwQixNQUFNLFNBQVMsR0FBRyxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLENBQUM7Z0JBQ3hFLE1BQU0sR0FBRyxHQUFHLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxhQUFhLENBQUMscUJBQVMsQ0FBQyxjQUFjLENBQXFCLENBQUM7Z0JBQ25GLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMscUJBQVMsQ0FBQyxhQUFhLENBQWdCLENBQUM7Z0JBQ2pGLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMscUJBQVMsQ0FBQyxpQkFBaUIsQ0FBZ0IsQ0FBQztnQkFDekYsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLGNBQWMsQ0FBZ0IsQ0FBQztnQkFDbkYsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLGlCQUFpQixDQUFnQixDQUFDO2dCQUN6RixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsY0FBYyxDQUFnQixDQUFDO2dCQUNuRixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsY0FBYyxDQUFnQixDQUFDO2dCQUNuRixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsY0FBYyxDQUFnQixDQUFDO2dCQUNuRixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMscUJBQVMsQ0FBQyxxQkFBcUIsQ0FBZ0IsQ0FBQztnQkFFakcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNuQixRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDekMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxLQUFLO29CQUNOLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0MsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ3BELGdCQUFnQixDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztnQkFDckYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ2IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO29CQUN6QyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDRjtBQUVELHFCQUFlLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzlFM0IsNERBQXFCO0FBRXJCLDhHQUFzQztBQUV0QyxNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO0FBQ3RCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7OztVQ0xaO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9zdHlsZS5zY3NzP2JjM2IiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvYXBwL2FwcC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL2Jhc2tldC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL2NhcmRzSW5mby50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL2ZpbHRlci50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL3NsaWRlci50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL3NvcnRDYXJkLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9jb21wb25lbnRzL21vZGVscy9zZWxlY3RvcnMudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvdmlldy9yZW5kZXJDYXJkcy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgU2xpZGVyIGZyb20gXCIuLi9jb250cm9sbGVyL3NsaWRlclwiO1xyXG5pbXBvcnQgQmFza2V0IGZyb20gXCIuLi9jb250cm9sbGVyL2Jhc2tldFwiO1xyXG5pbXBvcnQgUmVuZGVyQ2FyZHMgZnJvbSBcIi4uL3ZpZXcvcmVuZGVyQ2FyZHNcIjtcclxuaW1wb3J0IHsgSUNhcmRzIH0gZnJvbSBcIi4uL21vZGVscy9pbnJlZmFjZXNcIjtcclxuaW1wb3J0IEZpbHRlciBmcm9tIFwiLi4vY29udHJvbGxlci9maWx0ZXJcIjtcclxuaW1wb3J0IFNvcnRDYXJkIGZyb20gXCIuLi9jb250cm9sbGVyL3NvcnRDYXJkXCI7XHJcbmltcG9ydCB7IGNhcmRzIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXIvY2FyZHNJbmZvXCI7XHJcbmltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gXCIuLi9tb2RlbHMvc2VsZWN0b3JzXCI7XHJcbmNsYXNzIEFwcHtcclxuICBwcml2YXRlIGRhdGE6IGFueTtcclxuICBwcml2YXRlIHJlYWRvbmx5IHNob3BDYXJkczogUmVuZGVyQ2FyZHM7XHJcbiAgcHJpdmF0ZSBiYXNrZXQ6IEJhc2tldDtcclxuICBwcmljZVNsaWNlcjogU2xpZGVyO1xyXG4gIGNvdW50ZXJCYXNrZXQ6IEhUTUxFbGVtZW50O1xyXG4gIHNvcnQ6IFNvcnRDYXJkO1xyXG4gIGZpbHRlcjogRmlsdGVyO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLnNob3BDYXJkcyA9IG5ldyBSZW5kZXJDYXJkcygpO1xyXG4gICAgdGhpcy5kYXRhIDtcclxuICAgIHRoaXMuYmFza2V0ID0gbmV3IEJhc2tldCgpO1xyXG4gICAgdGhpcy5wcmljZVNsaWNlciA9IG5ldyBTbGlkZXIoKTtcclxuICAgIHRoaXMuY291bnRlckJhc2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyLXByb2R1Y3RzJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNvcnQgPSBuZXcgU29ydENhcmQoJy5mb3JtLXNlbGVjdCcpO1xyXG4gICAgdGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5yZWRyYXcoKTtcclxuICAgIHRoaXMuc2VhcmNoKCk7XHJcbiAgICB0aGlzLnNvcnRDYXJkKCk7XHJcbiAgICB0aGlzLmZpbHRlckRhdGEoKTtcclxuICAgIHRoaXMuc2VlQmFza2V0KCk7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2goKXtcclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LXNlYXJjaCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpPT4ge1xyXG4gICAgICB0aGlzLnJlZHJhdygpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRGF0YSgpe1xyXG4gICAgY29uc3QgZmlsdGVyQ29udGFpbmVyID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBmaWx0ZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuICAgICAgaWYodGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2N1c3RvbS1jaGVja2JveCcpKXtcclxuICAgICAgICBjb25zdCBjaGVja2JveGVzQ2hlY2tlZDogYm9vbGVhbltdID0gW107XHJcbiAgICAgICAgdGhpcy5maWx0ZXIuY2F0ZWdvcnlMaXN0LmZvckVhY2goKGNoZWNrYm94LCBpKSA9PiB7XHJcbiAgICAgICAgICBjaGVja2JveGVzQ2hlY2tlZFtpXSA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2F0ZWdvcnknLCBKU09OLnN0cmluZ2lmeShjaGVja2JveGVzQ2hlY2tlZCkpO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIGlmKHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVja2JveC1zaXplJykpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhcmdldEVsZW1lbnQpXHJcbiAgICAgICAgY29uc3QgY2hlY2tib3hlc0NoZWNrZWQ6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyLnNpemVMaXN0LmZvckVhY2goKGNoZWNrYm94LCBpKSA9PiB7XHJcbiAgICAgICAgICBjaGVja2JveGVzQ2hlY2tlZFtpXSA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2l6ZScsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgaWYodGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NoZWNrYm94LWNvbG9yJykpe1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ZXNDaGVja2VkOiBib29sZWFuW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZpbHRlci5jb2xvckxpc3QuZm9yRWFjaCgoY2hlY2tib3gsIGkpID0+IHtcclxuICAgICAgICAgIGNoZWNrYm94ZXNDaGVja2VkW2ldID0gY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb2xvcicsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSk7XHJcbiAgICAgICBcclxuICAgICAgfVxyXG4gICAgICBpZih0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY3VzdG9tLXJhZGlvJykpe1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ZXNDaGVja2VkOiBib29sZWFuW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZpbHRlci5tYXRlcmlhbExpc3QuZm9yRWFjaCgoY2hlY2tib3gsIGkpID0+IHtcclxuICAgICAgICAgIGNoZWNrYm94ZXNDaGVja2VkW2ldID0gY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtYXRlcmlhbCcsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGJyYW5kSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnJhbmRzJykgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICAgIGJyYW5kSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9PiB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3hlc0NoZWNrZWQ6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyLmJyYW5kTGlzdC5mb3JFYWNoKChjaGVja2JveCwgaSkgPT4ge1xyXG4gICAgICAgICAgY2hlY2tib3hlc0NoZWNrZWRbaV0gPSBjaGVja2JveC5zZWxlY3RlZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNoZWNrYm94ZXNDaGVja2VkKVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdicmFuZCcsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSlcclxuICAgICAgICB0aGlzLnJlZHJhdygpXHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMucmVkcmF3KClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXNldCgpe1xyXG4gICAgY29uc3QgY2xlYW5GaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyLWJ1dHRvbicpXHJcbiAgICBjbGVhbkZpbHRlcnM/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmZpbHRlci5maWx0ZXJSZXNldCgpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzb3J0Q2FyZCgpe1xyXG4gICAgdGhpcy5zb3J0LnNvcnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+IHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5zb3J0LnNvcnRJbnB1dCk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0JywgdGhpcy5zb3J0LnNvcnRJbnB1dC52YWx1ZSlcclxuICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzZWVCYXNrZXQoKXtcclxuICAgIGNvbnN0IGNhdGFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNhdGFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9dGFyZ2V0LmNsb3Nlc3QoJy5zaG9lcy1jYXJkJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGlmKHRhcmdldEVsZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuYmFza2V0LnRvZ2dsZSh0YXJnZXRFbGVtZW50LmNoaWxkcmVuWzFdLmlubmVySFRNTCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJlZHJhdygpe1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5maWx0ZXIuZmlsdGVyQWxsKGNhcmRzKTtcclxuICAgIGNvbnN0IHNvcnREYXRhID0gdGhpcy5zb3J0LnNvcnQodGhpcy5kYXRhKTtcclxuICAgIHRoaXMuc2hvcENhcmRzLmRyYXcoc29ydERhdGEhLCB0aGlzLmJhc2tldC5iYXNrZXRTdG9yYWdlKTtcclxuICAgIHRoaXMuYmFza2V0LmJhc2tldENvdW50ZXIgPyB0aGlzLmNvdW50ZXJCYXNrZXQuY2xhc3NMaXN0LmFkZCgnaGFzLWl0ZW0nKSA6IHRoaXMuY291bnRlckJhc2tldC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtaXRlbScpO1xyXG4gICAgdGhpcy5jb3VudGVyQmFza2V0LmlubmVyVGV4dCA9IFN0cmluZyh0aGlzLmJhc2tldC5iYXNrZXRDb3VudGVyKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQXBwIiwiaW1wb3J0IHsgc2VsZWN0b3JzIH0gZnJvbSAnLi4vbW9kZWxzL3NlbGVjdG9ycydcclxuY2xhc3MgQmFza2V0IHtcclxuICBiYXNrZXRTdG9yYWdlOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+O1xyXG4gIGJhc2tldENvdW50ZXI6IG51bWJlcjtcclxuICBtb2RhbFdpbmRvdzogSFRNTEVsZW1lbnQ7XHJcbiAgbW9kYWxCdXR0b246IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYmFza2V0U3RvcmFnZSA9IHt9O1xyXG4gICAgdGhpcy5iYXNrZXRDb3VudGVyID0gMDtcclxuICAgIHRoaXMubW9kYWxXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5tb2RhbFdpbmRvdykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLm1vZGFsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMucG9wdXBCdXR0b24pIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbn1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgICAgY29uc3QgYmFza2V0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Jhc2tldFN0b3JhZ2UnKTtcclxuICAgICAgaWYgKGJhc2tldCkge1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRTdG9yYWdlID0gSlNPTi5wYXJzZShiYXNrZXQpO1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRDb3VudGVyID0gT2JqZWN0LmtleXModGhpcy5iYXNrZXRTdG9yYWdlKS5sZW5ndGg7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5tb2RhbFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMubW9kYWxXaW5kb3cpXHJcbiAgICAgICAgICAgICAgdGhpcy5tb2RhbFdpbmRvdy5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5tb2RhbFdpbmRvdy5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuICBhZGQobmFtZTpzdHJpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSkge1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0gPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYmFza2V0Q291bnRlciArPSAxO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFza2V0U3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYmFza2V0U3RvcmFnZSkpO1xyXG4gIH1cclxuICByZW1vdmUobmFtZTpzdHJpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSkge1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdIC09IDE7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldENvdW50ZXIgLT0gMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdIDw9IDApXHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFza2V0U3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYmFza2V0U3RvcmFnZSkpO1xyXG4gIH1cclxuICB0b2dnbGUobmFtZTpzdHJpbmcpIHtcclxuICAgICAgaWYgKHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSkge1xyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXTtcclxuICAgICAgICAgIHRoaXMuYmFza2V0Q291bnRlciAtPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHRoaXMuYmFza2V0Q291bnRlciA+PSAyMCkge1xyXG4gICAgICAgICAgdGhpcy5zaG93TW9kYWwoKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSA9IDE7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldENvdW50ZXIgKz0gMTtcclxuICAgICAgfVxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYmFza2V0U3RvcmFnZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuYmFza2V0U3RvcmFnZSkpO1xyXG4gIH1cclxuICBjbGVhcigpIHtcclxuICAgICAgdGhpcy5iYXNrZXRTdG9yYWdlID0ge307XHJcbiAgICAgIHRoaXMuYmFza2V0Q291bnRlciA9IDA7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdiYXNrZXRTdG9yYWdlJyk7XHJcbiAgfVxyXG4gIHNob3dNb2RhbCgpIHtcclxuICAgICAgdGhpcy5tb2RhbFdpbmRvdy5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNrZXQiLCJpbXBvcnQgeyBJQ2FyZHMgfSBmcm9tICcuLi9tb2RlbHMvaW5yZWZhY2VzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhcmRzOiBJQ2FyZHNbXSA9IFtcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBXYWZmbGUgT25lIFNFJyxcclxuICAgIGNhdGVnb3J5OiAnQmFza2V0YmFsbCcsXHJcbiAgICBwcmljZTogJzg5JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdibGFjaycsXHJcbiAgICBzaXplOiAnNC41JyxcclxuICAgIGJyYW5kOiAnTmlrZSBCeSBZb3UnLFxyXG4gICAgbWF0ZXJpYWw6ICdDYW52YXMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzI5MDgyMTEwLTU4M2QtNDAyMS05ZmYwLTU3ZDJjZmYzNmM5Yi93YWZmbGUtb25lLXNlLXNob2VzLW1UM0NRTi5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjEnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSAxJyxcclxuICAgIGNhdGVnb3J5OiAnUnVubmluZycsXHJcbiAgICBwcmljZTogJzExNScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncmVkJyxcclxuICAgIHNpemU6ICc3LjUnLFxyXG4gICAgYnJhbmQ6ICdKb3JkYW4nLFxyXG4gICAgbWF0ZXJpYWw6ICdMZWF0aGVyJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzA1YWViNTRmLWNhODYtNDhkOS1hNjBmLTU3ZDc5OGUzOTM1ZC9haXItbWF4LTk1LXNob2VzLVRKTExzQi5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjEnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSAyJyxcclxuICAgIGNhdGVnb3J5OiAnSm9yZGFuJyxcclxuICAgIHByaWNlOiAnMTAwJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6J3doaXRlJyxcclxuICAgIHNpemU6ICc1LjAnLCBcclxuICAgIGJyYW5kOiAnTmlrZSBTcG9ydHdlYXInLFxyXG4gICAgbWF0ZXJpYWw6ICdMZWF0aGVyJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzM1OGI1ZmZlLTA3MDQtNGM1YS04OWZkLTBmYTViMmIxZjk5Yi9haXItbWF4LXBsdXMtaWlpLXNob2UtM0JTQnR4LnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDMnLFxyXG4gICAgY2F0ZWdvcnk6ICdMaWZlc3R5bGUnLFxyXG4gICAgcHJpY2U6ICcxOTgnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICBzaXplOiAnNC4wJyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8zMTJlMGRmNi1hMGM2LTRhNWQtYmEwMS1lODM3YjNkOGVlNDkvam9yZGFuLWRlbHRhLTMtc3Atc2hvZXMucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDE5JyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDQnLFxyXG4gICAgY2F0ZWdvcnk6ICdGb290YmFsbCcsXHJcbiAgICBwcmljZTogJzE1NicsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncGluaycsXHJcbiAgICBzaXplOiAnNi4wJyxcclxuICAgIGJyYW5kOiAnSm9yZGFuJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS80MTgwZTcyNS00OTY2LTQ2M2ItOGMyMi03MWUzY2E2YTlhNTUvYWlyLWpvcmRhbi0yLXJldHJvLXNwLXNob2VzLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMicsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSA1JyxcclxuICAgIGNhdGVnb3J5OiAnVHJhaW5pbmcnLFxyXG4gICAgcHJpY2U6ICcxNzgnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogICdncmVlbicsXHJcbiAgICBzaXplOiAnNS41JyxcclxuICAgIGJyYW5kOiAnTmlrZSBCeSBZb3UnLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzBkYjMwNDQ3LWQxOTktNDM3My1iZjM2LTZjYmI0MzllOTZjMi9haXItbWF4LXRlcnJhc2NhcGUtOTAtc2hvZXMtd2RCa0tILnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSA2JyxcclxuICAgIGNhdGVnb3J5OiAnU2thdGVib2FyZGluZycsXHJcbiAgICBwcmljZTogJzI2MCcsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnZ3JlZW4nLFxyXG4gICAgc2l6ZTogJzMuNScsXHJcbiAgICBicmFuZDogJ0FDRycsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvZTZiNWRkNjQtMWEzMi00NWY4LThmMTktOGY0MjFhMWNkZDZkL2Fpci1tYXgtdGVycmFzY2FwZS05MC1zaG9lcy1DUm4wWFcucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIxJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgNycsXHJcbiAgICBjYXRlZ29yeTogJ0dvbGYnLFxyXG4gICAgcHJpY2U6ICcyNDAnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsICBcclxuICAgIHNpemU6ICczLjAnLFxyXG4gICAgYnJhbmQ6ICdOaWtlTGFiJyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8yNzEzNzFmMy0wZjVjLTQ3YzctYjRiNC1mODQwZThiNDg4YzEvYWlyLXBlZ2FzdXMtODMtc2hvZXMtaHEyMDB4LnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSA4JyxcclxuICAgIGNhdGVnb3J5OiAnVGVubmlzJyxcclxuICAgIHByaWNlOiAnMjIyJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdibHVlJyxcclxuICAgIHNpemU6ICc4LjAnLFxyXG4gICAgYnJhbmQ6ICdBQ0cnLFxyXG4gICAgbWF0ZXJpYWw6ICdDYW52YXMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2IwMGE1MTcwLTIwZWQtNGNkYS05YzY5LTZjMWUwYTA0Mjc2ZS9haXItZm9yY2UtMS0wNy1zaG9lcy1LcHJRQ3IucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgV2FmZiBTRScsXHJcbiAgICBjYXRlZ29yeTogJ0Jhc2tldGJhbGwnLFxyXG4gICAgcHJpY2U6ICcyODknLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgIHNpemU6ICc0LjUnLFxyXG4gICAgYnJhbmQ6ICdOaWtlIEJ5IFlvdScsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvNmFlOTU5NTEtNGFiZS00NTVjLTg5NjItNDJjYmFkZWJmYmI3L3pvb20tZnJlYWstMy1iYXNrZXRiYWxsLXNob2VzLU1acEpaRi5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjEnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSAxIDA3IExWOCcsXHJcbiAgICBjYXRlZ29yeTogJ1J1bm5pbmcnLFxyXG4gICAgcHJpY2U6ICcxMzknLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICBzaXplOiAnNC41JyxcclxuICAgIGJyYW5kOiAnSm9yZGFuJyxcclxuICAgIG1hdGVyaWFsOiAnTGVhdGhlcicsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS80NTI4OWNiNC0yYWU2LTQxNjUtYmU2Yy04ODIzN2Q0MmM4MTkvem9vbXgtc3RyZWFrZmx5LXJvYWQtcmFjaW5nLXNob2VzLVp2OEpiZy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjInLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIHggU3TDvHNzeSBBaXIgRm9yY2UgMSAwNyBNaWQnLFxyXG4gICAgY2F0ZWdvcnk6ICdKb3JkYW4nLFxyXG4gICAgcHJpY2U6ICcxMTEnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjond2hpdGUnLFxyXG4gICAgc2l6ZTogJzguNScsIFxyXG4gICAgYnJhbmQ6ICdOaWtlIFNwb3J0d2VhcicsXHJcbiAgICBtYXRlcmlhbDogJ0xlYXRoZXInLFxyXG4gICAgaW1nOidodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvZTFjMTI5MGMtNTMxNC00N2RkLWJhMWItMjBhZTQ3ODA4OTdlL2t5cmllLWxvdy01LWNvbW11bml0eS1qZXdlbGwtbG95ZC1iYXNrZXRiYWxsLXNob2VzLXp3dGswUy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBNYXggOTcnLFxyXG4gICAgY2F0ZWdvcnk6ICdMaWZlc3R5bGUnLFxyXG4gICAgcHJpY2U6ICcxNjcnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICBzaXplOiAnMy41JyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS84YTNiYWI3OS02Yzk4LTRhMDMtYThhNS0xY2E3MGJiZDIzNjIvemlvbi0yLWJhc2tldGJhbGwtc2hvZXMta2hXYnJ3LnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAxOScsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdBaXIgSm9yZGFuIDEgUmV0cm8gSGlnaCBPRycsXHJcbiAgICBjYXRlZ29yeTogJ0Zvb3RiYWxsJyxcclxuICAgIHByaWNlOiAnMTAzJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdwaW5rJyxcclxuICAgIHNpemU6ICc2LjAnLFxyXG4gICAgYnJhbmQ6ICdKb3JkYW4nLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzUxZmUwOTI2LWYxNDYtNGJkZS05ZjNjLWZlZmMwZjAxMDdmZi9pc3BhLWxpbmstc2hvZXMucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIE1heCA5NSBFc3NlbnRpYWwnLFxyXG4gICAgY2F0ZWdvcnk6ICdUcmFpbmluZycsXHJcbiAgICBwcmljZTogJzE1NCcsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAgJ2dyZWVuJyxcclxuICAgIHNpemU6ICc2LjUnLFxyXG4gICAgYnJhbmQ6ICdOaWtlIEJ5IFlvdScsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvZTU4YWM1MzgtYTgxNS00NmFkLWExNGQtMTMyZjNkMmNjM2JiL3pvb214LXZhcG9yZmx5LW5leHQtMi1yb2FkLXJhY2luZy1zaG9lcy04MjFTNEYucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIwJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgeCBBQ1JPTllNwq4gQmxhemVyIExvdycsXHJcbiAgICBjYXRlZ29yeTogJ1NrYXRlYm9hcmRpbmcnLFxyXG4gICAgcHJpY2U6ICcyOTknLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2dyZWVuJyxcclxuICAgIHNpemU6ICc3LjAnLFxyXG4gICAgYnJhbmQ6ICdBQ0cnLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2YyNjM1YWFiLWRlZWItNDQzYi1hNWNmLTU5NDE5ZTZlNjYzYi9haXItbWF4LTk1LWVzc2VudGlhbC1zaG9lcy1aZ2czcG4ucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIxJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgTWF4IFBsdXMnLFxyXG4gICAgY2F0ZWdvcnk6ICdHb2xmJyxcclxuICAgIHByaWNlOiAnMjAxJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLCAgXHJcbiAgICBzaXplOiAnOC4wJyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvNTA2YTA1YzctZWVhNC00NDA1LWFmMTItYmJhMzJiZDBlNDhjL2Fpci1qb3JkYW4tMS1yZXRyby1oaWdoLW9nLXNob2VzLTc5dkdXVi5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIFBlZ2FzdXMgVHJhaWwgMyBHT1JFLVRFWCcsXHJcbiAgICBjYXRlZ29yeTogJ1Rlbm5pcycsXHJcbiAgICBwcmljZTogJzI2NycsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnYmx1ZScsXHJcbiAgICBzaXplOiAnMy4wJyxcclxuICAgIGJyYW5kOiAnQUNHJyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9lZTJhMWU3OS00NjI2LTQ2YzctYjE4MS02ZmFkYmMyMzUxYTQvc3R1c3N5LWFpci1mb3JjZS0xLTA3LW1pZC1zaG9lcy1iZHNmbUgucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnS0QxNScsXHJcbiAgICBjYXRlZ29yeTogJ0pvcmRhbicsXHJcbiAgICBwcmljZTogJzExMScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOid3aGl0ZScsXHJcbiAgICBzaXplOiAnNS41JywgXHJcbiAgICBicmFuZDogJ05pa2UgU3BvcnR3ZWFyJyxcclxuICAgIG1hdGVyaWFsOiAnTGVhdGhlcicsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS84ZDU4NGUzZS1lMmI1LTRkMTktOWU3My0xNzRkNTk5MDU1ZWIvYWlyLW1heC1wbHVzLXNob2VzLXgzN24zMC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIFpvb20gQWxwaGFmbHkgTmV4dCBOYXR1cmUnLFxyXG4gICAgY2F0ZWdvcnk6ICdMaWZlc3R5bGUnLFxyXG4gICAgcHJpY2U6ICcxNjcnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICBzaXplOiAnNi41JyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9mNGVhNzAxOS1iOWE1LTQzNGQtOTc1My05NzZjYWU2NzA0OWIvYWlyLW1heC05Ny1zaG9lcy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMTknLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnQWlyIEpvcmRhbiAxIFJldHJvIEhpZ2ggT0cnLFxyXG4gICAgY2F0ZWdvcnk6ICdGb290YmFsbCcsXHJcbiAgICBwcmljZTogJzEwMycsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncGluaycsXHJcbiAgICBzaXplOiAnNi4wJyxcclxuICAgIGJyYW5kOiAnSm9yZGFuJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8xNjQxODUzZi01MjY1LTQ2N2QtOTZkYy04YTFjMTRjZTc2Y2Eva2QxNS1iYXNrZXRiYWxsLXNob2VzLTBIOHBtUS5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjInLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZUNvdXJ0IFpvb20gUHJvJyxcclxuICAgIGNhdGVnb3J5OiAnVHJhaW5pbmcnLFxyXG4gICAgcHJpY2U6ICcxNTQnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogICdncmVlbicsXHJcbiAgICBzaXplOiAnNi41JyxcclxuICAgIGJyYW5kOiAnTmlrZSBCeSBZb3UnLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzVlYjZkZjFiLTIwZjEtNDhhOS1iOTRhLWI5YjQ5NGE3OTYzNi96b29tLWFscGhhZmx5LW5leHQtbmF0dXJlLXJvYWQtcmFjaW5nLXNob2UtM21rOWcyLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIHggQUNST05ZTcKuIEJsYXplciBMb3cnLFxyXG4gICAgY2F0ZWdvcnk6ICdTa2F0ZWJvYXJkaW5nJyxcclxuICAgIHByaWNlOiAnMjk5JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdncmVlbicsXHJcbiAgICBzaXplOiAnNy4wJyxcclxuICAgIGJyYW5kOiAnQUNHJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9mMjQyM2Y3YS05NWE3LTQwYzUtYTJiNS1iYzNlZWEyYmQ5NTMvbmlrZWNvdXJ0LXpvb20tcHJvLWNsYXktY291cnQtdGVubmlzLXNob2VzLXFKRnhjOC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjEnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdBaXIgSm9yZGFuIDEgTG93IEZseUVhc2UnLFxyXG4gICAgY2F0ZWdvcnk6ICdHb2xmJyxcclxuICAgIHByaWNlOiAnMjAxJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLCAgXHJcbiAgICBzaXplOiAnOC4wJyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvYjNkYjNhY2ItM2ExNi00NzllLThhZWEtNDlmOGUzYWVmMDFiL2Fpci16b29tLWZsaWdodC05NS1zaG9lcy1qN01SaHoucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIwJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgWm9vbSBUZW1wbyBORVhUJScsXHJcbiAgICBjYXRlZ29yeTogJ1Rlbm5pcycsXHJcbiAgICBwcmljZTogJzI2NycsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnYmx1ZScsXHJcbiAgICBzaXplOiAnOC41JyxcclxuICAgIGJyYW5kOiAnQUNHJyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8yYjIxYjZiZS0yZTI0LTRjN2YtYWJlMy03MGZiNDA5YmYyMzEvcmV2b2x1dGlvbi02LW5leHQtbmF0dXJlLXJvYWQtcnVubmluZy1zaG9lcy1EdnRYTVgucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfVxyXG5dIiwiaW1wb3J0IHsgSUNhcmRzIH0gZnJvbSAnLi4vbW9kZWxzL2lucmVmYWNlcyc7XHJcbmltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gJy4uL21vZGVscy9zZWxlY3RvcnMnXHJcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi9zbGlkZXInO1xyXG5cclxuY2xhc3MgRmlsdGVyIHtcclxuICBzZWFyY2hGaWVsZDogSFRNTElucHV0RWxlbWVudDtcclxuICBjYXRlZ29yeUxpc3ROYW1lOiBIVE1MRWxlbWVudDtcclxuICBjYXRlZ29yeUxpc3Q6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcHJpY2VTbGlkZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNvbG9yTGlzdE5hbWU6IEhUTUxFbGVtZW50O1xyXG4gIGNvbG9yTGlzdDogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBzaXplTGlzdE5hbWU6IEhUTUxFbGVtZW50O1xyXG4gIHNpemVMaXN0OiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGJyYW5kTGlzdE5hbWU6IEhUTUxFbGVtZW50O1xyXG4gIGJyYW5kTGlzdDogTm9kZUxpc3RPZjxIVE1MT3B0aW9uRWxlbWVudD47XHJcbiAgbWF0ZXJpYWxMaXN0TmFtZTogSFRNTEVsZW1lbnQ7XHJcbiAgbWF0ZXJpYWxMaXN0OiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGNsZWFuRmlsdGVyc0J1dHRvbjogSFRNTEVsZW1lbnQ7XHJcbiAgc2xpZGVyT25lOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHNsaWRlclR3bzogSFRNTElucHV0RWxlbWVudDtcclxuICBuZXdQcmljZUZpbHRlcjogU2xpZGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvciAoKXtcclxuICAgIHRoaXMuc2VhcmNoRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zZWFyY2hGaWVsZCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNhdGVnb3J5TGlzdE5hbWUpYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IHRoaXMuY2F0ZWdvcnlMaXN0TmFtZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5jaGVja2JveExpc3QpO1xyXG4gICAgdGhpcy5wcmljZVNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnByaWNlU2xpZGVyKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5zbGlkZXJPbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuc2xpZGVyUG9pbnRSaWdodCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuc2xpZGVyVHdvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLnNsaWRlclBvaW50TGVmdCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuY29sb3JMaXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNvbG9yTGlzdE5hbWUpYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNvbG9yTGlzdCA9IHRoaXMuY29sb3JMaXN0TmFtZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5jb2xvckxpc3QpO1xyXG4gICAgdGhpcy5zaXplTGlzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaXplTGlzdE5hbWUpYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNpemVMaXN0ID0gdGhpcy5zaXplTGlzdE5hbWUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuc2l6ZUxpc3QpO1xyXG4gICAgdGhpcy5icmFuZExpc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuYnJhbmRMaXN0TmFtZSlhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuYnJhbmRMaXN0ID0gdGhpcy5icmFuZExpc3ROYW1lLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLm9wdGlvbik7XHJcbiAgICB0aGlzLm1hdGVyaWFsTGlzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5tYXRlcmlhbExpc3ROYW1lKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5tYXRlcmlhbExpc3QgPSB0aGlzLm1hdGVyaWFsTGlzdE5hbWUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMucmFkaW9CdXR0b24pO1xyXG4gICAgdGhpcy5jbGVhbkZpbHRlcnNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5jbGVhbkZpbHRlcnNCdXR0b24pYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyID0gbmV3IFNsaWRlcigpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAgaW5pdCgpIHtcclxuICAgIHRoaXMuaGlkZUZpbHRlcigpO1xyXG4gICAgY29uc3QgY2hlY2tlZENhdGVnb3J5T3B0aW9uOiBib29sZWFuW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXRlZ29yeScpISk7XHJcbiAgICBjb25zdCBjaGVja2VkQ29sb3JPcHRpb246IGJvb2xlYW5bXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbG9yJykhKTtcclxuICAgIGNvbnN0IGNoZWNrZWRTaXplT3B0aW9uOiBib29sZWFuW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaXplJykhKTtcclxuICAgIGNvbnN0IGNoZWNrZWRCcmFuZE9wdGlvbjogYm9vbGVhbltdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYnJhbmQnKSEpO1xyXG4gICAgY29uc3QgY2hlY2tlZE1hdGVyaWFsT3B0aW9uOiBib29sZWFuW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtYXRlcmlhbCcpISk7XHJcblxyXG4gICAgaWYgKGNoZWNrZWRDYXRlZ29yeU9wdGlvbikge1xyXG4gICAgICB0aGlzLmNhdGVnb3J5TGlzdC5mb3JFYWNoKChjaGJveCwgaWR4KSA9PiB7XHJcbiAgICAgICAgY2hib3guY2hlY2tlZCA9IGNoZWNrZWRDYXRlZ29yeU9wdGlvbltpZHhdO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmKGNoZWNrZWRDb2xvck9wdGlvbil7XHJcbiAgICAgIHRoaXMuY29sb3JMaXN0LmZvckVhY2goKGNoYm94LCBpZHgpID0+IHtcclxuICAgICAgICBjaGJveC5jaGVja2VkID0gY2hlY2tlZENvbG9yT3B0aW9uW2lkeF07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYoY2hlY2tlZFNpemVPcHRpb24pe1xyXG4gICAgICB0aGlzLnNpemVMaXN0LmZvckVhY2goKGNoYm94LCBpZHgpID0+IHtcclxuICAgICAgICBjaGJveC5jaGVja2VkID0gY2hlY2tlZFNpemVPcHRpb25baWR4XTtcclxuICAgICB9KVxyXG4gICAgfVxyXG4gICAgaWYoY2hlY2tlZEJyYW5kT3B0aW9uKXtcclxuICAgICAgdGhpcy5icmFuZExpc3QuZm9yRWFjaCgoY2hib3gsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNoYm94LnNlbGVjdGVkID0gY2hlY2tlZEJyYW5kT3B0aW9uW2lkeF07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYoY2hlY2tlZE1hdGVyaWFsT3B0aW9uKXtcclxuICAgICAgdGhpcy5tYXRlcmlhbExpc3QuZm9yRWFjaCgoY2hib3gsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNoYm94LmNoZWNrZWQgPSBjaGVja2VkTWF0ZXJpYWxPcHRpb25baWR4XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1pblZhbHVlID0nMCc7XHJcbiAgICBsZXQgbWF4VmFsdWUgPSczMDAnO1xyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21pblByaWNlJykpe1xyXG4gICAgICBtaW5WYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtaW5QcmljZScpITtcclxuICAgIH1cclxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtYXhQcmljZScpKXtcclxuICAgICAgbWF4VmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWF4UHJpY2UnKSE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNsaWRlck9uZS52YWx1ZSA9IG1pblZhbHVlO1xyXG4gICAgdGhpcy5zbGlkZXJUd28udmFsdWUgPSBtYXhWYWx1ZTtcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIuZGlzcGxheVZhbE9uZS50ZXh0Q29udGVudCA9IG1pblZhbHVlO1xyXG4gICAgdGhpcy5uZXdQcmljZUZpbHRlci5kaXNwbGF5VmFsVHdvLnRleHRDb250ZW50ID0gbWF4VmFsdWU7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmZpbGxDb2xvcigpXHJcbiAgIH1cclxuXHJcbiAgc2VhcmNoU2hvZXNOYW1lKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc2VhcmNoRmllbGQudmFsdWUpXHJcbiAgICBpZighdGhpcy5zZWFyY2hGaWVsZC52YWx1ZSl7XHJcbiAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hGaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpKSAhPSAtMSlcclxuICB9XHJcblxyXG4gIGZpbHRlckJ5Q2F0ZWdvcnkoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgY29uc3QgY2hlY2tlZEJveDpzdHJpbmdbXSA9IFtdO1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcclxuICAgICAgaWYoY2hlY2tib3guY2hlY2tlZCl7XHJcbiAgICAgICAgY2hlY2tlZEJveC5wdXNoKGNoZWNrYm94Lm5hbWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZighY2hlY2tlZEJveC5sZW5ndGgpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZEJveC5pbmRleE9mKGl0ZW0uY2F0ZWdvcnkpICE9IC0xKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyQnlQcmljZShkYXRhOiBJQ2FyZHNbXSl7XHJcbiAgICBpZigrdGhpcy5zbGlkZXJPbmUudmFsdWUgPT0gMCAmJiArdGhpcy5zbGlkZXJUd28udmFsdWUgPT0gMzAwKXtcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gK2l0ZW0ucHJpY2UgPj0gK3RoaXMuc2xpZGVyT25lLnZhbHVlICYmICtpdGVtLnByaWNlIDw9ICt0aGlzLnNsaWRlclR3by52YWx1ZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckJ5Q29sb3IoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgY29uc3QgY2hlY2tlZEJveDpzdHJpbmdbXSA9IFtdO1xyXG4gICAgdGhpcy5jb2xvckxpc3QuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcclxuICAgICAgaWYoY2hlY2tib3guY2hlY2tlZCl7XHJcbiAgICAgICAgY2hlY2tlZEJveC5wdXNoKGNoZWNrYm94Lm5hbWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZighY2hlY2tlZEJveC5sZW5ndGgpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZEJveC5pbmRleE9mKGl0ZW0uY29sb3IpICE9IC0xKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyQnlTaXplKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnN0IGNoZWNrZWRTaXplOnN0cmluZ1tdID0gW107XHJcbiAgICB0aGlzLnNpemVMaXN0LmZvckVhY2goKHNpemUpID0+IHtcclxuICAgICAgaWYoc2l6ZS5jaGVja2VkKXtcclxuICAgICAgICBjaGVja2VkU2l6ZS5wdXNoKHNpemUubmFtZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmKCFjaGVja2VkU2l6ZS5sZW5ndGgpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZFNpemUuaW5kZXhPZihpdGVtLnNpemUpICE9IC0xXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckJ5QnJhbmQoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgY29uc3QgY2hlY2tlZEJyYW5kOnN0cmluZ1tdID0gW107XHJcbiAgICB0aGlzLmJyYW5kTGlzdC5mb3JFYWNoKChicmFuZCkgPT4ge1xyXG4gICAgICBpZihicmFuZC5zZWxlY3RlZCl7XHJcbiAgICAgICAgY2hlY2tlZEJyYW5kLnB1c2goYnJhbmQudmFsdWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZihjaGVja2VkQnJhbmRbMF0gPT0gJ1NlbGVjdCBicmFuZCcpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZEJyYW5kLmluZGV4T2YoaXRlbS5icmFuZCkgIT0gLTEpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJCeU1hdGVyaWFsKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnN0IGNoZWNrZWRCb3g6c3RyaW5nW10gPSBbXTtcclxuICAgIHRoaXMubWF0ZXJpYWxMaXN0LmZvckVhY2goKGNoZWNrYm94KSA9PiB7XHJcbiAgICAgIGlmKGNoZWNrYm94LmNoZWNrZWQpe1xyXG4gICAgICAgIGNoZWNrZWRCb3gucHVzaChjaGVja2JveC52YWx1ZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmKCFjaGVja2VkQm94Lmxlbmd0aCl7IFxyXG4gICAgICByZXR1cm4gZGF0YVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGRhdGEuZmlsdGVyKChpdGVtKSA9PiBjaGVja2VkQm94LmluZGV4T2YoaXRlbS5tYXRlcmlhbCkgIT0gLTEpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJSZXNldCgpe1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QuZm9yRWFjaCgoY2hlY2tib3ggKT0+IGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZSk7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLnNsaWRlck9uZS52YWx1ZSA9ICcwJztcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIuc2xpZGVyVHdvLnZhbHVlID0gJzMwMCc7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmRpc3BsYXlWYWxPbmUudGV4dENvbnRlbnQgPSAnMCc7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmRpc3BsYXlWYWxUd28udGV4dENvbnRlbnQgPSAnMzAwJztcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIuZmlsbENvbG9yKCk7XHJcbiAgICB0aGlzLmNvbG9yTGlzdC5mb3JFYWNoKChjb2xvcikgPT4gY29sb3IuY2xhc3NMaXN0LnJlbW92ZShzZWxlY3RvcnMuc2VsZWN0ZWRDb2xvcikpO1xyXG4gICAgdGhpcy5zaXplTGlzdC5mb3JFYWNoKChzaXplKSA9PiBzaXplLmNoZWNrZWQgPSBmYWxzZSk7XHJcbiAgICB0aGlzLmJyYW5kTGlzdC5mb3JFYWNoKChicmFuZCkgPT4ge1xyXG4gICAgICBjb25zdCBicmFuZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JyYW5kcycpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICBicmFuZElucHV0LnZhbHVlID0gJ1NlbGVjdCBicmFuZCdcclxuICAgICAgYnJhbmQuc2VsZWN0ZWQgPSBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hdGVyaWFsTGlzdC5mb3JFYWNoKChtYXRlcmlhbCkgPT4gbWF0ZXJpYWwuY2hlY2tlZCA9IGZhbHNlKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjYXRlZ29yeScpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ21hdGVyaWFsJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYnJhbmQnKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzaXplJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY29sb3InKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdtaW5QcmljZScpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ21heFByaWNlJyk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJBbGwoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgbGV0IGZpbHRlckRhdGEgPSBkYXRhO1xyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuc2VhcmNoU2hvZXNOYW1lKGZpbHRlckRhdGEpO1xyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyQnlDYXRlZ29yeShmaWx0ZXJEYXRhKTsgXHJcbiAgICBmaWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJCeVByaWNlKGZpbHRlckRhdGEpO1xyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyQnlDb2xvcihmaWx0ZXJEYXRhKTtcclxuICAgIGZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckJ5U2l6ZShmaWx0ZXJEYXRhKTtcclxuICAgIGZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckJ5QnJhbmQoZmlsdGVyRGF0YSk7XHJcbiAgICBmaWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJCeU1hdGVyaWFsKGZpbHRlckRhdGEpO1xyXG4gICAgcmV0dXJuIGZpbHRlckRhdGE7XHJcbiAgfVxyXG5cclxuICBoaWRlRmlsdGVyKCl7XHJcbiAgICBjb25zdCBidXR0b25IaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGUtZmlsdGVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBmaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBidXR0b25IaWRlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgZmlsdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGVuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXIiLCJpbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tIFwiLi4vbW9kZWxzL3NlbGVjdG9yc1wiO1xyXG5cclxuY2xhc3MgU2xpZGVyIHtcclxuICBzbGlkZXJPbmU6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgc2xpZGVyVHdvOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRpc3BsYXlWYWxPbmU6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgZGlzcGxheVZhbFR3bzogSFRNTElucHV0RWxlbWVudDtcclxuICBzbGlkZXJUcmFjazogSFRNTEVsZW1lbnQ7XHJcbiAgc2xpZGVyTWF4VmFsdWU6IHN0cmluZztcclxuICBtaW5HYXA6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHRoaXMuc2xpZGVyT25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLnNsaWRlclBvaW50UmlnaHQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNsaWRlclR3byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5zbGlkZXJQb2ludExlZnQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmRpc3BsYXlWYWxPbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuc2xpZGVyVmFsdWVSaWdodCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuZGlzcGxheVZhbFR3byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5zbGlkZXJWYWx1ZUxlZnQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNsaWRlclRyYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2xpZGVyVHJhY2spIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5zbGlkZXJNYXhWYWx1ZSA9IHRoaXMuc2xpZGVyT25lLm1heDtcclxuICAgIHRoaXMubWluR2FwID0gNTtcclxuICAgIHRoaXMuc3RhcnQoKVxyXG4gIH1cclxuIFxyXG4gIHN0YXJ0KCl7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuc2xpZGVyT25lLnZhbHVlKVxyXG4gICAgY29uc29sZS5sb2coJ3llcycpXHJcbiAgICB0aGlzLnNsaWRlck9uZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYocGFyc2VJbnQodGhpcy5zbGlkZXJUd28udmFsdWUpIC0gcGFyc2VJbnQodGhpcy5zbGlkZXJPbmUudmFsdWUpIDw9IHRoaXMubWluR2FwKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJPbmUudmFsdWUgPSBTdHJpbmcocGFyc2VJbnQodGhpcy5zbGlkZXJUd28udmFsdWUpIC0gdGhpcy5taW5HYXApO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZGlzcGxheVZhbE9uZS50ZXh0Q29udGVudCA9IHRoaXMuc2xpZGVyT25lLnZhbHVlO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnNsaWRlck9uZS52YWx1ZSk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtaW5QcmljZScsIHRoaXMuc2xpZGVyT25lLnZhbHVlKSBcclxuICAgICAgdGhpcy5maWxsQ29sb3IoKTtcclxuXHJcbiAgICB9KVxyXG4gICAgdGhpcy5zbGlkZXJUd28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpZihwYXJzZUludCh0aGlzLnNsaWRlclR3by52YWx1ZSkgLSBwYXJzZUludCh0aGlzLnNsaWRlck9uZS52YWx1ZSkgPD0gdGhpcy5taW5HYXApIHtcclxuICAgICAgdGhpcy5zbGlkZXJUd28udmFsdWUgPSBTdHJpbmcocGFyc2VJbnQodGhpcy5zbGlkZXJPbmUudmFsdWUpICsgdGhpcy5taW5HYXApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kaXNwbGF5VmFsVHdvLnRleHRDb250ZW50ID0gdGhpcy5zbGlkZXJUd28udmFsdWU7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWF4UHJpY2UnLCB0aGlzLnNsaWRlclR3by52YWx1ZSkgXHJcbiAgICB0aGlzLmZpbGxDb2xvcigpO1xyXG4gIH0pXHJcbiAgfVxyXG5cclxuICBmaWxsQ29sb3IoKXtcclxuICAgIGNvbnN0IHBlcnNlbnQxOiBudW1iZXIgPSAoK3RoaXMuc2xpZGVyT25lLnZhbHVlIC8gK3RoaXMuc2xpZGVyTWF4VmFsdWUpICogMTAwO1xyXG4gICAgY29uc3QgcGVyc2VudDI6IG51bWJlciA9ICgrdGhpcy5zbGlkZXJUd28udmFsdWUgLyArdGhpcy5zbGlkZXJNYXhWYWx1ZSkgKiAxMDA7XHJcbiAgICB0aGlzLnNsaWRlclRyYWNrLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2IoMjI2LCAyMjYsIDIyNikgJHtwZXJzZW50MX0lLCAjMzI2NGZlICR7cGVyc2VudDF9JSwgIzMyNjRmZSAke3BlcnNlbnQyfSUsIHJnYigyMjYsIDIyNiwgMjI2KSAke3BlcnNlbnQyfSUpIGBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNsaWRlciIsImltcG9ydCB7IElDYXJkcyB9IGZyb20gJy4uL21vZGVscy9pbnJlZmFjZXMnXHJcblxyXG5jbGFzcyBTb3J0Q2FyZCB7XHJcbiAgc29ydElucHV0ITogSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgY29uc3RydWN0b3IoZWxlbTpzdHJpbmcpe1xyXG4gICAgdGhpcy5zb3J0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW0pIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgdGhpcy5pbml0KClcclxuICB9XHJcblxyXG4gIGluaXQoKXtcclxuICAgIGNvbnN0IGNoZWNrZWRTb3J0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvcnQnKTtcclxuICAgIGlmKGNoZWNrZWRTb3J0KXtcclxuICAgICAgdGhpcy5zb3J0SW5wdXQudmFsdWUgPSBjaGVja2VkU29ydDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNvcnQoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgc3dpdGNoKHRoaXMuc29ydElucHV0LnZhbHVlKXtcclxuICAgICAgY2FzZSAncmVsZWFzZU9OJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3J0QnlEYXRlT2xkKGRhdGEpO1xyXG4gICAgICBjYXNlICdyZWxlYXNlTk8nOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRCeURhdGVOZXcoZGF0YSk7XHJcbiAgICAgIGNhc2UgJ3ByaWNlSEwnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRCeVByaWNlSGlnaHRMb3coZGF0YSk7XHJcbiAgICAgIGNhc2UgJ3ByaWNlTEgnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRCeVByaWNlTG93SGlnaHQoZGF0YSk7XHJcbiAgICAgIGNhc2UgJ25vbmUnOlxyXG4gICAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzb3J0QnlQcmljZUhpZ2h0TG93KGRhdGE6IElDYXJkc1tdKSB7XHJcbiAgICByZXR1cm4gZGF0YS5zb3J0KChhLGIpID0+ICtiLnByaWNlIC0gK2EucHJpY2UpO1xyXG4gIH1cclxuICBzb3J0QnlQcmljZUxvd0hpZ2h0KGRhdGE6IElDYXJkc1tdKSB7XHJcbiAgICByZXR1cm4gZGF0YS5zb3J0KChhLGIpID0+ICthLnByaWNlIC0gK2IucHJpY2UpO1xyXG4gIH1cclxuICBzb3J0QnlEYXRlTmV3KGRhdGE6IElDYXJkc1tdKSB7XHJcbiAgICByZXR1cm4gZGF0YS5zb3J0KChhLGIpID0+ICtiLnJlbGVhc2UgLSArYS5yZWxlYXNlKTtcclxuICB9XHJcbiAgc29ydEJ5RGF0ZU9sZChkYXRhOiBJQ2FyZHNbXSkge1xyXG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSxiKSA9PiArYS5yZWxlYXNlIC0gK2IucmVsZWFzZSk7XHJcbiAgfVxyXG4gIHNvcnRSZXNldCgpe1xyXG4gICAgdGhpcy5zb3J0SW5wdXQudmFsdWUgPSAncmVsZWFzZU5PJztcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzb3J0Jyk7XHJcbiAgfVxyXG59XHJcbiBcclxuZXhwb3J0IGRlZmF1bHQgU29ydENhcmQiLCIgZXhwb3J0IGNvbnN0IHNlbGVjdG9ycyA9IHtcclxuICBjYXRhbG9nUHJvZHVjdHM6ICcucHJvZHVjdHMnLFxyXG4gIHNob2VzVGVtcGxhdGU6Jy5zaG9lcy1jYXJkLXRlbXBsYXRlJyxcclxuICBzaG9lc0NhcmRJbWFnZTonLnNob2VzLWNhcmRfX2ltYWdlJyxcclxuICBzaG9lc0NhcmROYW1lOicuc2hvZXMtY2FyZF9fbmFtZScsXHJcbiAgc2hvZXNDYXJkQ2F0ZWdvcnk6Jy5zaG9lcy1jYXJkX19jYXRlZ29yeScsXHJcbiAgc2hvZXNDYXJkQnJhbmQ6Jy5zaG9lcy1jYXJkX19icmFuZCcsXHJcbiAgc2hvZXNDYXJkTWF0ZXJpYWw6Jy5zaG9lcy1jYXJkX19tYXRlcmlhbCcsXHJcbiAgc2hvZXNDYXJkUHJpY2U6Jy5zaG9lcy1jYXJkX19wcmljZScsXHJcbiAgc2hvZXNDYXJkQ29sb3I6Jy5zaG9lcy1jYXJkX19jb2xvcnMnLFxyXG4gIHNob2VzQ2FyZFN0b2NrOicuYmFza2V0X19zdG9jaycsXHJcbiAgc2hvZXNDYXJkQmFza2V0QnV0dG9uOicuYmFza2V0X19zdG9jay1idXR0b24nLFxyXG4gIG1vZGFsV2luZG93OicubW9kYWwtd2luZG93LW92ZXJsYXknLFxyXG4gIHBvcHVwQnV0dG9uOicucG9wdXBfX2J1dHRvbicsXHJcbiAgc2VhcmNoRmllbGQ6JyNpbnB1dC1zZWFyY2gnLFxyXG4gIGNhdGVnb3J5TGlzdE5hbWU6JyNjaGVja2JveF9fY2F0ZWdvcnknLFxyXG4gIGNoZWNrYm94TGlzdDonLmN1c3RvbS1jaGVja2JveCcsXHJcbiAgcHJpY2VTbGlkZXI6Jy5zbGlkZXInLFxyXG4gIGNvbG9yTGlzdE5hbWU6ICcuY29sb3JzJyxcclxuICBjb2xvckxpc3Q6ICcuY2hlY2tib3gtY29sb3InLFxyXG4gIHNpemVMaXN0TmFtZTogJy5zaXplcycsXHJcbiAgc2l6ZUxpc3Q6Jy5jaGVja2JveC1zaXplJyxcclxuICBicmFuZExpc3ROYW1lOiAnI2JyYW5kcycsXHJcbiAgb3B0aW9uOiAnb3B0aW9uJyxcclxuICBtYXRlcmlhbExpc3ROYW1lOiAnLm1hdGVyaWFsX19yYWRpby1idXR0b25zJyxcclxuICByYWRpb0J1dHRvbjonLmN1c3RvbS1yYWRpbycsXHJcbiAgY2xlYW5GaWx0ZXJzQnV0dG9uOicuY2xlYXItYnV0dG9uJyxcclxuICBzbGlkZXJQb2ludFJpZ2h0OidzbGlkZXItMScsXHJcbiAgc2xpZGVyUG9pbnRMZWZ0OidzbGlkZXItMicsXHJcbiAgc2xpZGVyVmFsdWVSaWdodDoncmFuZ2UxJyxcclxuICBzbGlkZXJWYWx1ZUxlZnQ6J3JhbmdlMicsXHJcbiAgc2xpZGVyVHJhY2s6Jy5zbGlkZXItdHJhY2snLFxyXG4gIHNlbGVjdGVkQ29sb3I6ICdjb2xvcl9fYWN0aXZlJyxcclxuICBzZWxlY3RlZFNpemU6ICdzaXplX19hY3RpdmUnLFxyXG59XHJcbiIsImltcG9ydCB7IElDYXJkcyB9IGZyb20gJy4uL21vZGVscy9pbnJlZmFjZXMnXHJcbmltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gJy4uL21vZGVscy9zZWxlY3RvcnMnXHJcbmNsYXNzIFJlbmRlckNhcmRzIHtcclxuICAgcHJvZHVjdHM6IEhUTUxFbGVtZW50O1xyXG4gIC8vIHNob2VzSXRlbVRlbXA6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgLy8gZnJhZ21lbnQ6RG9jdW1lbnRGcmFnbWVudDtcclxuICAvLyBjYXJkQ2xvbmU6IEhUTUxFbGVtZW50O1xyXG4gIC8vIGltZzogSFRNTEltYWdlRWxlbWVudDtcclxuICAvLyBjYXJkTmFtZTogSFRNTEVsZW1lbnQ7XHJcbiAgLy8gY2FyZENhdGVnb3J5OiBIVE1MRWxlbWVudDtcclxuICAvLyBjYXJkQnJhbmQ6IEhUTUxFbGVtZW50IDtcclxuICAvLyBjYXJkTWF0ZXJpYWw6IEhUTUxFbGVtZW50O1xyXG4gIC8vIGNhcmRQcmljZTogSFRNTEVsZW1lbnQ7XHJcbiAgLy8gY2FyZENvbG9yOiBIVE1MRWxlbWVudDtcclxuICAvLyBjYXJkU3RvY2s6IEhUTUxFbGVtZW50O1xyXG4gIC8vIGNhcmRCYXNrZXRCdXR0b246IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgLy8gdGhpcy5zaG9lc0l0ZW1UZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNUZW1wbGF0ZSkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIC8vIHRoaXMuZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAvLyB0aGlzLmNhcmRDbG9uZSA9IHRoaXMuc2hvZXNJdGVtVGVtcD8uY29udGVudC5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAvLyB0aGlzLmltZyA9IHRoaXMuY2FyZENsb25lPy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRJbWFnZSkgYXMgSFRNTEltYWdlRWxlbWVudDtcclxuICAgIC8vIHRoaXMuY2FyZE5hbWUgPSB0aGlzLmNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmROYW1lKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIC8vIHRoaXMuY2FyZENhdGVnb3J5ID10aGlzLmNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRDYXRlZ29yeSkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAvLyB0aGlzLmNhcmRCcmFuZCA9dGhpcy5jYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkQnJhbmQpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgLy8gdGhpcy5jYXJkTWF0ZXJpYWwgPSB0aGlzLmNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRNYXRlcmlhbCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAvLyB0aGlzLmNhcmRQcmljZSA9IHRoaXMuY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZFByaWNlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIC8vIHRoaXMuY2FyZENvbG9yID0gdGhpcy5jYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkQ29sb3IpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgLy8gdGhpcy5jYXJkU3RvY2sgPSB0aGlzLmNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRTdG9jaykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAvLyB0aGlzLmNhcmRCYXNrZXRCdXR0b24gPSB0aGlzLmNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRCYXNrZXRCdXR0b24pIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5wcm9kdWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNhdGFsb2dQcm9kdWN0cykgYXMgSFRNTEVsZW1lbnQ7XHJcbn0gICAgICBcclxuXHJcbiAgZHJhdyhkYXRhOiBJQ2FyZHNbXSwgYmFza2V0OlJlY29yZDxzdHJpbmcsbnVtYmVyPil7XHJcbiAgICBjb25zdCBzaG9lc0l0ZW1UZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNUZW1wbGF0ZSkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGlmICghZGF0YS5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiU29ycnksIHdlIGNvdWxkbid0IGZpbmQgdGhlIHBhZ2UgeW91J3JlIGxvb2tpbmcgZm9yXCI7XHJcbiAgICAgIHRleHQuY2xhc3NMaXN0LmFkZCgnbm90aWZ5Jyk7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZCh0ZXh0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhcmRDbG9uZSA9IHNob2VzSXRlbVRlbXA/LmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGNhcmRDbG9uZT8ucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkSW1hZ2UpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZE5hbWUgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkTmFtZSkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZENhdGVnb3J5ID0gY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZENhdGVnb3J5KSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjYXJkQnJhbmQgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkQnJhbmQpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmRNYXRlcmlhbCA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRNYXRlcmlhbCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZFByaWNlID0gY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZFByaWNlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjYXJkQ29sb3IgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkQ29sb3IpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmRTdG9jayA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRTdG9jaykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZEJhc2tldEJ1dHRvbiA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRCYXNrZXRCdXR0b24pIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgICAgICBpbWcuc3JjID0gaXRlbS5pbWc7XHJcbiAgICAgICAgY2FyZE5hbWUuaW5uZXJUZXh0ID0gaXRlbS5uYW1lO1xyXG4gICAgICAgIGNhcmRDYXRlZ29yeS50ZXh0Q29udGVudCA9IGl0ZW0uY2F0ZWdvcnk7XHJcbiAgICAgICAgY2FyZEJyYW5kLnRleHRDb250ZW50ID0gaXRlbS5icmFuZDtcclxuICAgICAgICBjYXJkTWF0ZXJpYWwudGV4dENvbnRlbnQgPSBpdGVtLm1hdGVyaWFsO1xyXG4gICAgICAgIGNhcmRDb2xvci50ZXh0Q29udGVudCA9IGAke2l0ZW0uY29sb3J9IGNvbG9yYDtcclxuICAgICAgICBjYXJkUHJpY2UudGV4dENvbnRlbnQgPSBgJCR7aXRlbS5wcmljZX1gO1xyXG4gICAgICAgIGNhcmRTdG9jay50ZXh0Q29udGVudCA9IGl0ZW0uc3RvY2sgPyAnSW4gc3RvY2snIDogJ09uIHJlcXVlc3QnO1xyXG4gICAgICAgIGl0ZW0uc3RvY2tcclxuICAgICAgICAgICAgPyBjYXJkU3RvY2suY2xhc3NMaXN0LmFkZCgnc2hvZXMtaW4tc3RvY2snKVxyXG4gICAgICAgICAgICA6IGNhcmRTdG9jay5jbGFzc0xpc3QuYWRkKCdzaG9lcy1vdXQtb2Ytc3RvY2snKTtcclxuICAgICAgICBjYXJkQmFza2V0QnV0dG9uLnRleHRDb250ZW50ID0gYmFza2V0W2l0ZW0ubmFtZV0gPyAnSW4gdGhlIGJhc2tldCcgOiAnQWRkIHRvIGJhc2tldCc7XHJcbiAgICAgICAgYmFza2V0W2l0ZW0ubmFtZV1cclxuICAgICAgICAgICAgPyBjYXJkQmFza2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJylcclxuICAgICAgICAgICAgOiBjYXJkQmFza2V0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGNhcmRDbG9uZSk7ICAgXHJcbiAgICAgIH0pO1xyXG4gICAgIH1cclxuICAgICB0aGlzLnByb2R1Y3RzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgIHRoaXMucHJvZHVjdHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyQ2FyZHM7IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnXHJcblxyXG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9hcHAvYXBwJ1xyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xyXG5hcHAuc3RhcnQoKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
