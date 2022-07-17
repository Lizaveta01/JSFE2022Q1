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
const slider_1 = __importDefault(__webpack_require__(/*! ../view/slider/slider */ "./src/components/view/slider/slider.ts"));
const basket_1 = __importDefault(__webpack_require__(/*! ../view/basket/basket */ "./src/components/view/basket/basket.ts"));
const renderCards_1 = __importDefault(__webpack_require__(/*! ../view/cards/renderCards */ "./src/components/view/cards/renderCards.ts"));
const filter_1 = __importDefault(__webpack_require__(/*! ../controller/filter */ "./src/components/controller/filter.ts"));
const sortCard_1 = __importDefault(__webpack_require__(/*! ../controller/sortCard */ "./src/components/controller/sortCard.ts"));
const cardsInfo_1 = __webpack_require__(/*! ../view/cards/cardsInfo */ "./src/components/view/cards/cardsInfo.ts");
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
        this.resetAll();
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
            if (targetElement.classList.contains('brands')) {
                const checkboxesChecked = [];
                this.filter.brandList.forEach((checkbox, i) => {
                    checkboxesChecked[i] = checkbox.selected;
                });
                localStorage.setItem('brand', JSON.stringify(checkboxesChecked));
            }
            this.redraw();
        });
    }
    reset() {
        const cleanFilters = document.querySelector('#clear-filter');
        cleanFilters === null || cleanFilters === void 0 ? void 0 : cleanFilters.addEventListener('click', () => {
            this.filter.filterReset();
            this.redraw();
        });
    }
    resetAll() {
        const cleanFilters = document.querySelector('#clear-settings');
        cleanFilters === null || cleanFilters === void 0 ? void 0 : cleanFilters.addEventListener('click', () => {
            this.filter.filterResetAll();
            this.basket.clear();
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
const slider_1 = __importDefault(__webpack_require__(/*! ../view/slider/slider */ "./src/components/view/slider/slider.ts"));
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
    filterResetAll() {
        this.filterReset();
        localStorage.clear();
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

/***/ "./src/components/view/basket/basket.ts":
/*!**********************************************!*\
  !*** ./src/components/view/basket/basket.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const selectors_1 = __webpack_require__(/*! ../../models/selectors */ "./src/components/models/selectors.ts");
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

/***/ "./src/components/view/cards/cardsInfo.ts":
/*!************************************************!*\
  !*** ./src/components/view/cards/cardsInfo.ts ***!
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
        name: 'Nike x ACRYM® Blazer Low',
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
        name: 'Air Jordan 1 Retro High ',
        category: 'Football',
        price: '183',
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

/***/ "./src/components/view/cards/renderCards.ts":
/*!**************************************************!*\
  !*** ./src/components/view/cards/renderCards.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const selectors_1 = __webpack_require__(/*! ../../models/selectors */ "./src/components/models/selectors.ts");
class RenderCards {
    constructor() {
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

/***/ "./src/components/view/slider/slider.ts":
/*!**********************************************!*\
  !*** ./src/components/view/slider/slider.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const selectors_1 = __webpack_require__(/*! ../../models/selectors */ "./src/components/models/selectors.ts");
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
        this.sliderOne.addEventListener('click', () => {
            if (parseInt(this.sliderTwo.value) - parseInt(this.sliderOne.value) <= this.minGap) {
                this.sliderOne.value = String(parseInt(this.sliderTwo.value) - this.minGap);
            }
            this.displayValOne.textContent = this.sliderOne.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9zdHlsZS5zY3NzP2JjM2IiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvYXBwL2FwcC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL2ZpbHRlci50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9jb250cm9sbGVyL3NvcnRDYXJkLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9jb21wb25lbnRzL21vZGVscy9zZWxlY3RvcnMudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvdmlldy9iYXNrZXQvYmFza2V0LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9jb21wb25lbnRzL3ZpZXcvY2FyZHMvY2FyZHNJbmZvLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9jb21wb25lbnRzL3ZpZXcvY2FyZHMvcmVuZGVyQ2FyZHMudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvdmlldy9zbGlkZXIvc2xpZGVyLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL3ZpZXcvc2xpZGVyL3NsaWRlclwiO1xyXG5pbXBvcnQgQmFza2V0IGZyb20gXCIuLi92aWV3L2Jhc2tldC9iYXNrZXRcIjtcclxuaW1wb3J0IFJlbmRlckNhcmRzIGZyb20gXCIuLi92aWV3L2NhcmRzL3JlbmRlckNhcmRzXCI7XHJcbmltcG9ydCBGaWx0ZXIgZnJvbSBcIi4uL2NvbnRyb2xsZXIvZmlsdGVyXCI7XHJcbmltcG9ydCBTb3J0Q2FyZCBmcm9tIFwiLi4vY29udHJvbGxlci9zb3J0Q2FyZFwiO1xyXG5pbXBvcnQgeyBjYXJkcyB9IGZyb20gXCIuLi92aWV3L2NhcmRzL2NhcmRzSW5mb1wiO1xyXG5jbGFzcyBBcHB7XHJcbiAgcHJpdmF0ZSBkYXRhOiBhbnk7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBzaG9wQ2FyZHM6IFJlbmRlckNhcmRzO1xyXG4gIHByaXZhdGUgYmFza2V0OiBCYXNrZXQ7XHJcbiAgcHJpY2VTbGljZXI6IFNsaWRlcjtcclxuICBjb3VudGVyQmFza2V0OiBIVE1MRWxlbWVudDtcclxuICBzb3J0OiBTb3J0Q2FyZDtcclxuICBmaWx0ZXI6IEZpbHRlcjtcclxuICBcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5zaG9wQ2FyZHMgPSBuZXcgUmVuZGVyQ2FyZHMoKTtcclxuICAgIHRoaXMuZGF0YSA7XHJcbiAgICB0aGlzLmJhc2tldCA9IG5ldyBCYXNrZXQoKTtcclxuICAgIHRoaXMucHJpY2VTbGljZXIgPSBuZXcgU2xpZGVyKCk7XHJcbiAgICB0aGlzLmNvdW50ZXJCYXNrZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRlci1wcm9kdWN0cycpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5zb3J0ID0gbmV3IFNvcnRDYXJkKCcuZm9ybS1zZWxlY3QnKTtcclxuICAgIHRoaXMuZmlsdGVyID0gbmV3IEZpbHRlcigpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKXtcclxuICAgIHRoaXMucmVkcmF3KCk7XHJcbiAgICB0aGlzLnNlYXJjaCgpO1xyXG4gICAgdGhpcy5zb3J0Q2FyZCgpO1xyXG4gICAgdGhpcy5maWx0ZXJEYXRhKCk7XHJcbiAgICB0aGlzLnNlZUJhc2tldCgpO1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG4gICAgdGhpcy5yZXNldEFsbCgpO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoKCl7XHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC1zZWFyY2gnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKT0+IHtcclxuICAgICAgdGhpcy5yZWRyYXcoKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZpbHRlckRhdGEoKXtcclxuICAgIGNvbnN0IGZpbHRlckNvbnRhaW5lciA9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlcicpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgZmlsdGVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgICAgaWYodGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2N1c3RvbS1jaGVja2JveCcpKXtcclxuICAgICAgICBjb25zdCBjaGVja2JveGVzQ2hlY2tlZDogYm9vbGVhbltdID0gW107XHJcbiAgICAgICAgdGhpcy5maWx0ZXIuY2F0ZWdvcnlMaXN0LmZvckVhY2goKGNoZWNrYm94LCBpKSA9PiB7XHJcbiAgICAgICAgICBjaGVja2JveGVzQ2hlY2tlZFtpXSA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2F0ZWdvcnknLCBKU09OLnN0cmluZ2lmeShjaGVja2JveGVzQ2hlY2tlZCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2hlY2tib3gtc2l6ZScpKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXRFbGVtZW50KVxyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ZXNDaGVja2VkOiBib29sZWFuW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZpbHRlci5zaXplTGlzdC5mb3JFYWNoKChjaGVja2JveCwgaSkgPT4ge1xyXG4gICAgICAgICAgY2hlY2tib3hlc0NoZWNrZWRbaV0gPSBjaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NpemUnLCBKU09OLnN0cmluZ2lmeShjaGVja2JveGVzQ2hlY2tlZCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY2hlY2tib3gtY29sb3InKSl7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3hlc0NoZWNrZWQ6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyLmNvbG9yTGlzdC5mb3JFYWNoKChjaGVja2JveCwgaSkgPT4ge1xyXG4gICAgICAgICAgY2hlY2tib3hlc0NoZWNrZWRbaV0gPSBjaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbG9yJywgSlNPTi5zdHJpbmdpZnkoY2hlY2tib3hlc0NoZWNrZWQpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYodGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2N1c3RvbS1yYWRpbycpKXtcclxuICAgICAgICBjb25zdCBjaGVja2JveGVzQ2hlY2tlZDogYm9vbGVhbltdID0gW107XHJcbiAgICAgICAgdGhpcy5maWx0ZXIubWF0ZXJpYWxMaXN0LmZvckVhY2goKGNoZWNrYm94LCBpKSA9PiB7XHJcbiAgICAgICAgICBjaGVja2JveGVzQ2hlY2tlZFtpXSA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWF0ZXJpYWwnLCBKU09OLnN0cmluZ2lmeShjaGVja2JveGVzQ2hlY2tlZCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYnJhbmRzJykpe1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ZXNDaGVja2VkOiBib29sZWFuW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZpbHRlci5icmFuZExpc3QuZm9yRWFjaCgoY2hlY2tib3gsIGkpID0+IHtcclxuICAgICAgICAgIGNoZWNrYm94ZXNDaGVja2VkW2ldID0gY2hlY2tib3guc2VsZWN0ZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYnJhbmQnLCBKU09OLnN0cmluZ2lmeShjaGVja2JveGVzQ2hlY2tlZCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnJlZHJhdygpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmVzZXQoKXtcclxuICAgIGNvbnN0IGNsZWFuRmlsdGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbGVhci1maWx0ZXInKVxyXG4gICAgY2xlYW5GaWx0ZXJzPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5maWx0ZXIuZmlsdGVyUmVzZXQoKTtcclxuICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXNldEFsbCgpe1xyXG4gICAgY29uc3QgY2xlYW5GaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NsZWFyLXNldHRpbmdzJyk7XHJcbiAgICBjbGVhbkZpbHRlcnM/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmZpbHRlci5maWx0ZXJSZXNldEFsbCgpO1xyXG4gICAgICB0aGlzLmJhc2tldC5jbGVhcigpO1xyXG4gICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuICBzb3J0Q2FyZCgpe1xyXG4gICAgdGhpcy5zb3J0LnNvcnRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+IHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5zb3J0LnNvcnRJbnB1dCk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0JywgdGhpcy5zb3J0LnNvcnRJbnB1dC52YWx1ZSlcclxuICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzZWVCYXNrZXQoKXtcclxuICAgIGNvbnN0IGNhdGFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdHMnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNhdGFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9dGFyZ2V0LmNsb3Nlc3QoJy5zaG9lcy1jYXJkJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGlmKHRhcmdldEVsZW1lbnQpe1xyXG4gICAgICAgIHRoaXMuYmFza2V0LnRvZ2dsZSh0YXJnZXRFbGVtZW50LmNoaWxkcmVuWzFdLmlubmVySFRNTCk7XHJcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJlZHJhdygpe1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5maWx0ZXIuZmlsdGVyQWxsKGNhcmRzKTtcclxuICAgIGNvbnN0IHNvcnREYXRhID0gdGhpcy5zb3J0LnNvcnQodGhpcy5kYXRhKTtcclxuICAgIHRoaXMuc2hvcENhcmRzLmRyYXcoc29ydERhdGEhLCB0aGlzLmJhc2tldC5iYXNrZXRTdG9yYWdlKTtcclxuICAgIHRoaXMuYmFza2V0LmJhc2tldENvdW50ZXIgPyB0aGlzLmNvdW50ZXJCYXNrZXQuY2xhc3NMaXN0LmFkZCgnaGFzLWl0ZW0nKSA6IHRoaXMuY291bnRlckJhc2tldC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtaXRlbScpO1xyXG4gICAgdGhpcy5jb3VudGVyQmFza2V0LmlubmVyVGV4dCA9IFN0cmluZyh0aGlzLmJhc2tldC5iYXNrZXRDb3VudGVyKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcCIsImltcG9ydCB7IElDYXJkcyB9IGZyb20gJy4uL21vZGVscy9pbnJlZmFjZXMnO1xyXG5pbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tICcuLi9tb2RlbHMvc2VsZWN0b3JzJ1xyXG5pbXBvcnQgU2xpZGVyIGZyb20gJy4uL3ZpZXcvc2xpZGVyL3NsaWRlcic7XHJcblxyXG5jbGFzcyBGaWx0ZXIge1xyXG4gIHNlYXJjaEZpZWxkOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGNhdGVnb3J5TGlzdE5hbWU6IEhUTUxFbGVtZW50O1xyXG4gIGNhdGVnb3J5TGlzdDogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBwcmljZVNsaWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY29sb3JMaXN0TmFtZTogSFRNTEVsZW1lbnQ7XHJcbiAgY29sb3JMaXN0OiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHNpemVMaXN0TmFtZTogSFRNTEVsZW1lbnQ7XHJcbiAgc2l6ZUxpc3Q6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD47XHJcbiAgYnJhbmRMaXN0TmFtZTogSFRNTEVsZW1lbnQ7XHJcbiAgYnJhbmRMaXN0OiBOb2RlTGlzdE9mPEhUTUxPcHRpb25FbGVtZW50PjtcclxuICBtYXRlcmlhbExpc3ROYW1lOiBIVE1MRWxlbWVudDtcclxuICBtYXRlcmlhbExpc3Q6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD47XHJcbiAgY2xlYW5GaWx0ZXJzQnV0dG9uOiBIVE1MRWxlbWVudDtcclxuICBzbGlkZXJPbmU6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgc2xpZGVyVHdvOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIG5ld1ByaWNlRmlsdGVyOiBTbGlkZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpe1xyXG4gICAgdGhpcy5zZWFyY2hGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNlYXJjaEZpZWxkKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuY2F0ZWdvcnlMaXN0TmFtZSlhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0ID0gdGhpcy5jYXRlZ29yeUxpc3ROYW1lLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLmNoZWNrYm94TGlzdCk7XHJcbiAgICB0aGlzLnByaWNlU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMucHJpY2VTbGlkZXIpYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNsaWRlck9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5zbGlkZXJQb2ludFJpZ2h0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5zbGlkZXJUd28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuc2xpZGVyUG9pbnRMZWZ0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5jb2xvckxpc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuY29sb3JMaXN0TmFtZSlhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuY29sb3JMaXN0ID0gdGhpcy5jb2xvckxpc3ROYW1lLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLmNvbG9yTGlzdCk7XHJcbiAgICB0aGlzLnNpemVMaXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNpemVMaXN0TmFtZSlhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuc2l6ZUxpc3QgPSB0aGlzLnNpemVMaXN0TmFtZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5zaXplTGlzdCk7XHJcbiAgICB0aGlzLmJyYW5kTGlzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5icmFuZExpc3ROYW1lKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5icmFuZExpc3QgPSB0aGlzLmJyYW5kTGlzdE5hbWUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMub3B0aW9uKTtcclxuICAgIHRoaXMubWF0ZXJpYWxMaXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLm1hdGVyaWFsTGlzdE5hbWUpYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLm1hdGVyaWFsTGlzdCA9IHRoaXMubWF0ZXJpYWxMaXN0TmFtZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5yYWRpb0J1dHRvbik7XHJcbiAgICB0aGlzLmNsZWFuRmlsdGVyc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmNsZWFuRmlsdGVyc0J1dHRvbilhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIgPSBuZXcgU2xpZGVyKCk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gICBpbml0KCkge1xyXG4gICAgdGhpcy5oaWRlRmlsdGVyKCk7XHJcbiAgICBjb25zdCBjaGVja2VkQ2F0ZWdvcnlPcHRpb246IGJvb2xlYW5bXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhdGVnb3J5JykhKTtcclxuICAgIGNvbnN0IGNoZWNrZWRDb2xvck9wdGlvbjogYm9vbGVhbltdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29sb3InKSEpO1xyXG4gICAgY29uc3QgY2hlY2tlZFNpemVPcHRpb246IGJvb2xlYW5bXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NpemUnKSEpO1xyXG4gICAgY29uc3QgY2hlY2tlZEJyYW5kT3B0aW9uOiBib29sZWFuW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdicmFuZCcpISk7XHJcbiAgICBjb25zdCBjaGVja2VkTWF0ZXJpYWxPcHRpb246IGJvb2xlYW5bXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21hdGVyaWFsJykhKTtcclxuXHJcbiAgICBpZiAoY2hlY2tlZENhdGVnb3J5T3B0aW9uKSB7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0LmZvckVhY2goKGNoYm94LCBpZHgpID0+IHtcclxuICAgICAgICBjaGJveC5jaGVja2VkID0gY2hlY2tlZENhdGVnb3J5T3B0aW9uW2lkeF07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYoY2hlY2tlZENvbG9yT3B0aW9uKXtcclxuICAgICAgdGhpcy5jb2xvckxpc3QuZm9yRWFjaCgoY2hib3gsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNoYm94LmNoZWNrZWQgPSBjaGVja2VkQ29sb3JPcHRpb25baWR4XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZihjaGVja2VkU2l6ZU9wdGlvbil7XHJcbiAgICAgIHRoaXMuc2l6ZUxpc3QuZm9yRWFjaCgoY2hib3gsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNoYm94LmNoZWNrZWQgPSBjaGVja2VkU2l6ZU9wdGlvbltpZHhdO1xyXG4gICAgIH0pXHJcbiAgICB9XHJcbiAgICBpZihjaGVja2VkQnJhbmRPcHRpb24pe1xyXG4gICAgICB0aGlzLmJyYW5kTGlzdC5mb3JFYWNoKChjaGJveCwgaWR4KSA9PiB7XHJcbiAgICAgICAgY2hib3guc2VsZWN0ZWQgPSBjaGVja2VkQnJhbmRPcHRpb25baWR4XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZihjaGVja2VkTWF0ZXJpYWxPcHRpb24pe1xyXG4gICAgICB0aGlzLm1hdGVyaWFsTGlzdC5mb3JFYWNoKChjaGJveCwgaWR4KSA9PiB7XHJcbiAgICAgICAgY2hib3guY2hlY2tlZCA9IGNoZWNrZWRNYXRlcmlhbE9wdGlvbltpZHhdO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbWluVmFsdWUgPScwJztcclxuICAgIGxldCBtYXhWYWx1ZSA9JzMwMCc7XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWluUHJpY2UnKSl7XHJcbiAgICAgIG1pblZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21pblByaWNlJykhO1xyXG4gICAgfVxyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21heFByaWNlJykpe1xyXG4gICAgICBtYXhWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtYXhQcmljZScpITtcclxuICAgIH1cclxuICAgIHRoaXMuc2xpZGVyT25lLnZhbHVlID0gbWluVmFsdWU7XHJcbiAgICB0aGlzLnNsaWRlclR3by52YWx1ZSA9IG1heFZhbHVlO1xyXG4gICAgdGhpcy5uZXdQcmljZUZpbHRlci5kaXNwbGF5VmFsT25lLnRleHRDb250ZW50ID0gbWluVmFsdWU7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmRpc3BsYXlWYWxUd28udGV4dENvbnRlbnQgPSBtYXhWYWx1ZTtcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIuZmlsbENvbG9yKClcclxuICAgfVxyXG5cclxuICBzZWFyY2hTaG9lc05hbWUoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgaWYoIXRoaXMuc2VhcmNoRmllbGQudmFsdWUpe1xyXG4gICAgICByZXR1cm4gZGF0YVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGEuZmlsdGVyKChpdGVtKSA9PiBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc2VhcmNoRmllbGQudmFsdWUudG9Mb3dlckNhc2UoKSkgIT0gLTEpXHJcbiAgfVxyXG5cclxuICBmaWx0ZXJCeUNhdGVnb3J5KGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnN0IGNoZWNrZWRCb3g6c3RyaW5nW10gPSBbXTtcclxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0LmZvckVhY2goKGNoZWNrYm94KSA9PiB7XHJcbiAgICAgIGlmKGNoZWNrYm94LmNoZWNrZWQpe1xyXG4gICAgICAgIGNoZWNrZWRCb3gucHVzaChjaGVja2JveC5uYW1lKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYoIWNoZWNrZWRCb3gubGVuZ3RoKXsgXHJcbiAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGNoZWNrZWRCb3guaW5kZXhPZihpdGVtLmNhdGVnb3J5KSAhPSAtMSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckJ5UHJpY2UoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgaWYoK3RoaXMuc2xpZGVyT25lLnZhbHVlID09IDAgJiYgK3RoaXMuc2xpZGVyVHdvLnZhbHVlID09IDMwMCl7XHJcbiAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIoKGl0ZW0pID0+ICtpdGVtLnByaWNlID49ICt0aGlzLnNsaWRlck9uZS52YWx1ZSAmJiAraXRlbS5wcmljZSA8PSArdGhpcy5zbGlkZXJUd28udmFsdWUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJCeUNvbG9yKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnN0IGNoZWNrZWRCb3g6c3RyaW5nW10gPSBbXTtcclxuICAgIHRoaXMuY29sb3JMaXN0LmZvckVhY2goKGNoZWNrYm94KSA9PiB7XHJcbiAgICAgIGlmKGNoZWNrYm94LmNoZWNrZWQpe1xyXG4gICAgICAgIGNoZWNrZWRCb3gucHVzaChjaGVja2JveC5uYW1lKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYoIWNoZWNrZWRCb3gubGVuZ3RoKXsgXHJcbiAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGNoZWNrZWRCb3guaW5kZXhPZihpdGVtLmNvbG9yKSAhPSAtMSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckJ5U2l6ZShkYXRhOiBJQ2FyZHNbXSl7XHJcbiAgICBjb25zdCBjaGVja2VkU2l6ZTpzdHJpbmdbXSA9IFtdO1xyXG4gICAgdGhpcy5zaXplTGlzdC5mb3JFYWNoKChzaXplKSA9PiB7XHJcbiAgICAgIGlmKHNpemUuY2hlY2tlZCl7XHJcbiAgICAgICAgY2hlY2tlZFNpemUucHVzaChzaXplLm5hbWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZighY2hlY2tlZFNpemUubGVuZ3RoKXsgXHJcbiAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGNoZWNrZWRTaXplLmluZGV4T2YoaXRlbS5zaXplKSAhPSAtMVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJCeUJyYW5kKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnN0IGNoZWNrZWRCcmFuZDpzdHJpbmdbXSA9IFtdO1xyXG4gICAgdGhpcy5icmFuZExpc3QuZm9yRWFjaCgoYnJhbmQpID0+IHtcclxuICAgICAgaWYoYnJhbmQuc2VsZWN0ZWQpe1xyXG4gICAgICAgIGNoZWNrZWRCcmFuZC5wdXNoKGJyYW5kLnZhbHVlKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgaWYoY2hlY2tlZEJyYW5kWzBdID09ICdTZWxlY3QgYnJhbmQnKXsgXHJcbiAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGNoZWNrZWRCcmFuZC5pbmRleE9mKGl0ZW0uYnJhbmQpICE9IC0xKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyQnlNYXRlcmlhbChkYXRhOiBJQ2FyZHNbXSl7XHJcbiAgICBjb25zdCBjaGVja2VkQm94OnN0cmluZ1tdID0gW107XHJcbiAgICB0aGlzLm1hdGVyaWFsTGlzdC5mb3JFYWNoKChjaGVja2JveCkgPT4ge1xyXG4gICAgICBpZihjaGVja2JveC5jaGVja2VkKXtcclxuICAgICAgICBjaGVja2VkQm94LnB1c2goY2hlY2tib3gudmFsdWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZighY2hlY2tlZEJveC5sZW5ndGgpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZEJveC5pbmRleE9mKGl0ZW0ubWF0ZXJpYWwpICE9IC0xKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyUmVzZXQoKXtcclxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0LmZvckVhY2goKGNoZWNrYm94ICk9PiBjaGVja2JveC5jaGVja2VkID0gZmFsc2UpO1xyXG4gICAgdGhpcy5uZXdQcmljZUZpbHRlci5zbGlkZXJPbmUudmFsdWUgPSAnMCc7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLnNsaWRlclR3by52YWx1ZSA9ICczMDAnO1xyXG4gICAgdGhpcy5uZXdQcmljZUZpbHRlci5kaXNwbGF5VmFsT25lLnRleHRDb250ZW50ID0gJzAnO1xyXG4gICAgdGhpcy5uZXdQcmljZUZpbHRlci5kaXNwbGF5VmFsVHdvLnRleHRDb250ZW50ID0gJzMwMCc7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmZpbGxDb2xvcigpO1xyXG4gICAgdGhpcy5jb2xvckxpc3QuZm9yRWFjaCgoY29sb3IpID0+IGNvbG9yLmNsYXNzTGlzdC5yZW1vdmUoc2VsZWN0b3JzLnNlbGVjdGVkQ29sb3IpKTtcclxuICAgIHRoaXMuc2l6ZUxpc3QuZm9yRWFjaCgoc2l6ZSkgPT4gc2l6ZS5jaGVja2VkID0gZmFsc2UpO1xyXG4gICAgdGhpcy5icmFuZExpc3QuZm9yRWFjaCgoYnJhbmQpID0+IHtcclxuICAgICAgY29uc3QgYnJhbmRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNicmFuZHMnKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgICAgYnJhbmRJbnB1dC52YWx1ZSA9ICdTZWxlY3QgYnJhbmQnXHJcbiAgICAgIGJyYW5kLnNlbGVjdGVkID0gZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdGhpcy5tYXRlcmlhbExpc3QuZm9yRWFjaCgobWF0ZXJpYWwpID0+IG1hdGVyaWFsLmNoZWNrZWQgPSBmYWxzZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2F0ZWdvcnknKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdtYXRlcmlhbCcpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2JyYW5kJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2l6ZScpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NvbG9yJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbWluUHJpY2UnKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdtYXhQcmljZScpO1xyXG4gIH1cclxuXHJcbiAgZmlsdGVyUmVzZXRBbGwoKXtcclxuICAgIHRoaXMuZmlsdGVyUmVzZXQoKTtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgZmlsdGVyQWxsKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGxldCBmaWx0ZXJEYXRhID0gZGF0YTtcclxuICAgIGZpbHRlckRhdGEgPSB0aGlzLnNlYXJjaFNob2VzTmFtZShmaWx0ZXJEYXRhKTtcclxuICAgIGZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckJ5Q2F0ZWdvcnkoZmlsdGVyRGF0YSk7IFxyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyQnlQcmljZShmaWx0ZXJEYXRhKTtcclxuICAgIGZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckJ5Q29sb3IoZmlsdGVyRGF0YSk7XHJcbiAgICBmaWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJCeVNpemUoZmlsdGVyRGF0YSk7XHJcbiAgICBmaWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJCeUJyYW5kKGZpbHRlckRhdGEpO1xyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyQnlNYXRlcmlhbChmaWx0ZXJEYXRhKTtcclxuICAgIHJldHVybiBmaWx0ZXJEYXRhO1xyXG4gIH1cclxuXHJcbiAgaGlkZUZpbHRlcigpe1xyXG4gICAgY29uc3QgYnV0dG9uSGlkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWRlLWZpbHRlcicpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgZmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlcicpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgYnV0dG9uSGlkZS5vbmNsaWNrID0gZnVuY3Rpb24gKCl7XHJcbiAgICAgIGZpbHRlci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlbicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyIiwiaW1wb3J0IHsgSUNhcmRzIH0gZnJvbSAnLi4vbW9kZWxzL2lucmVmYWNlcydcclxuXHJcbmNsYXNzIFNvcnRDYXJkIHtcclxuICBzb3J0SW5wdXQhOiBIVE1MT3B0aW9uRWxlbWVudDtcclxuICBjb25zdHJ1Y3RvcihlbGVtOnN0cmluZyl7XHJcbiAgICB0aGlzLnNvcnRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbSkgYXMgSFRNTE9wdGlvbkVsZW1lbnQ7XHJcbiAgICB0aGlzLmluaXQoKVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpe1xyXG4gICAgY29uc3QgY2hlY2tlZFNvcnQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29ydCcpO1xyXG4gICAgaWYoY2hlY2tlZFNvcnQpe1xyXG4gICAgICB0aGlzLnNvcnRJbnB1dC52YWx1ZSA9IGNoZWNrZWRTb3J0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc29ydChkYXRhOiBJQ2FyZHNbXSl7XHJcbiAgICBzd2l0Y2godGhpcy5zb3J0SW5wdXQudmFsdWUpe1xyXG4gICAgICBjYXNlICdyZWxlYXNlT04nOlxyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRCeURhdGVPbGQoZGF0YSk7XHJcbiAgICAgIGNhc2UgJ3JlbGVhc2VOTyc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydEJ5RGF0ZU5ldyhkYXRhKTtcclxuICAgICAgY2FzZSAncHJpY2VITCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydEJ5UHJpY2VIaWdodExvdyhkYXRhKTtcclxuICAgICAgY2FzZSAncHJpY2VMSCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydEJ5UHJpY2VMb3dIaWdodChkYXRhKTtcclxuICAgICAgY2FzZSAnbm9uZSc6XHJcbiAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNvcnRCeVByaWNlSGlnaHRMb3coZGF0YTogSUNhcmRzW10pIHtcclxuICAgIHJldHVybiBkYXRhLnNvcnQoKGEsYikgPT4gK2IucHJpY2UgLSArYS5wcmljZSk7XHJcbiAgfVxyXG4gIHNvcnRCeVByaWNlTG93SGlnaHQoZGF0YTogSUNhcmRzW10pIHtcclxuICAgIHJldHVybiBkYXRhLnNvcnQoKGEsYikgPT4gK2EucHJpY2UgLSArYi5wcmljZSk7XHJcbiAgfVxyXG4gIHNvcnRCeURhdGVOZXcoZGF0YTogSUNhcmRzW10pIHtcclxuICAgIHJldHVybiBkYXRhLnNvcnQoKGEsYikgPT4gK2IucmVsZWFzZSAtICthLnJlbGVhc2UpO1xyXG4gIH1cclxuICBzb3J0QnlEYXRlT2xkKGRhdGE6IElDYXJkc1tdKSB7XHJcbiAgICByZXR1cm4gZGF0YS5zb3J0KChhLGIpID0+ICthLnJlbGVhc2UgLSArYi5yZWxlYXNlKTtcclxuICB9XHJcbiAgc29ydFJlc2V0KCl7XHJcbiAgICB0aGlzLnNvcnRJbnB1dC52YWx1ZSA9ICdyZWxlYXNlTk8nO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NvcnQnKTtcclxuICB9XHJcbn1cclxuIFxyXG5leHBvcnQgZGVmYXVsdCBTb3J0Q2FyZCIsIiBleHBvcnQgY29uc3Qgc2VsZWN0b3JzID0ge1xyXG4gIGNhdGFsb2dQcm9kdWN0czogJy5wcm9kdWN0cycsXHJcbiAgc2hvZXNUZW1wbGF0ZTonLnNob2VzLWNhcmQtdGVtcGxhdGUnLFxyXG4gIHNob2VzQ2FyZEltYWdlOicuc2hvZXMtY2FyZF9faW1hZ2UnLFxyXG4gIHNob2VzQ2FyZE5hbWU6Jy5zaG9lcy1jYXJkX19uYW1lJyxcclxuICBzaG9lc0NhcmRDYXRlZ29yeTonLnNob2VzLWNhcmRfX2NhdGVnb3J5JyxcclxuICBzaG9lc0NhcmRCcmFuZDonLnNob2VzLWNhcmRfX2JyYW5kJyxcclxuICBzaG9lc0NhcmRNYXRlcmlhbDonLnNob2VzLWNhcmRfX21hdGVyaWFsJyxcclxuICBzaG9lc0NhcmRQcmljZTonLnNob2VzLWNhcmRfX3ByaWNlJyxcclxuICBzaG9lc0NhcmRDb2xvcjonLnNob2VzLWNhcmRfX2NvbG9ycycsXHJcbiAgc2hvZXNDYXJkU3RvY2s6Jy5iYXNrZXRfX3N0b2NrJyxcclxuICBzaG9lc0NhcmRCYXNrZXRCdXR0b246Jy5iYXNrZXRfX3N0b2NrLWJ1dHRvbicsXHJcbiAgbW9kYWxXaW5kb3c6Jy5tb2RhbC13aW5kb3ctb3ZlcmxheScsXHJcbiAgcG9wdXBCdXR0b246Jy5wb3B1cF9fYnV0dG9uJyxcclxuICBzZWFyY2hGaWVsZDonI2lucHV0LXNlYXJjaCcsXHJcbiAgY2F0ZWdvcnlMaXN0TmFtZTonI2NoZWNrYm94X19jYXRlZ29yeScsXHJcbiAgY2hlY2tib3hMaXN0OicuY3VzdG9tLWNoZWNrYm94JyxcclxuICBwcmljZVNsaWRlcjonLnNsaWRlcicsXHJcbiAgY29sb3JMaXN0TmFtZTogJy5jb2xvcnMnLFxyXG4gIGNvbG9yTGlzdDogJy5jaGVja2JveC1jb2xvcicsXHJcbiAgc2l6ZUxpc3ROYW1lOiAnLnNpemVzJyxcclxuICBzaXplTGlzdDonLmNoZWNrYm94LXNpemUnLFxyXG4gIGJyYW5kTGlzdE5hbWU6ICcjYnJhbmRzJyxcclxuICBvcHRpb246ICdvcHRpb24nLFxyXG4gIG1hdGVyaWFsTGlzdE5hbWU6ICcubWF0ZXJpYWxfX3JhZGlvLWJ1dHRvbnMnLFxyXG4gIHJhZGlvQnV0dG9uOicuY3VzdG9tLXJhZGlvJyxcclxuICBjbGVhbkZpbHRlcnNCdXR0b246Jy5jbGVhci1idXR0b24nLFxyXG4gIHNsaWRlclBvaW50UmlnaHQ6J3NsaWRlci0xJyxcclxuICBzbGlkZXJQb2ludExlZnQ6J3NsaWRlci0yJyxcclxuICBzbGlkZXJWYWx1ZVJpZ2h0OidyYW5nZTEnLFxyXG4gIHNsaWRlclZhbHVlTGVmdDoncmFuZ2UyJyxcclxuICBzbGlkZXJUcmFjazonLnNsaWRlci10cmFjaycsXHJcbiAgc2VsZWN0ZWRDb2xvcjogJ2NvbG9yX19hY3RpdmUnLFxyXG4gIHNlbGVjdGVkU2l6ZTogJ3NpemVfX2FjdGl2ZScsXHJcbn1cclxuIiwiaW1wb3J0IHsgc2VsZWN0b3JzIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3NlbGVjdG9ycydcclxuY2xhc3MgQmFza2V0IHtcclxuICBiYXNrZXRTdG9yYWdlOiBSZWNvcmQ8c3RyaW5nLG51bWJlcj47XHJcbiAgYmFza2V0Q291bnRlcjogbnVtYmVyO1xyXG4gIG1vZGFsV2luZG93OiBIVE1MRWxlbWVudDtcclxuICBtb2RhbEJ1dHRvbjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5iYXNrZXRTdG9yYWdlID0ge307XHJcbiAgICB0aGlzLmJhc2tldENvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5tb2RhbFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLm1vZGFsV2luZG93KSBhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMubW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5wb3B1cEJ1dHRvbikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmluaXQoKTtcclxufVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgICBjb25zdCBiYXNrZXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYmFza2V0U3RvcmFnZScpO1xyXG4gICAgICBpZiAoYmFza2V0KSB7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldFN0b3JhZ2UgPSBKU09OLnBhcnNlKGJhc2tldCk7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldENvdW50ZXIgPSBPYmplY3Qua2V5cyh0aGlzLmJhc2tldFN0b3JhZ2UpLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1vZGFsV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5tb2RhbFdpbmRvdylcclxuICAgICAgICAgICAgICB0aGlzLm1vZGFsV2luZG93LmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm1vZGFsV2luZG93LmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIGFkZChuYW1lOnN0cmluZykge1xyXG4gICAgICBpZiAodGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdKSB7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0gKz0gMTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSA9IDE7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5iYXNrZXRDb3VudGVyICs9IDE7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYXNrZXRTdG9yYWdlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5iYXNrZXRTdG9yYWdlKSk7XHJcbiAgfVxyXG4gIHJlbW92ZShuYW1lOnN0cmluZykge1xyXG4gICAgICBpZiAodGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdKSB7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0gLT0gMTtcclxuICAgICAgICAgIHRoaXMuYmFza2V0Q291bnRlciAtPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0gPD0gMClcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV07XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYXNrZXRTdG9yYWdlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5iYXNrZXRTdG9yYWdlKSk7XHJcbiAgfVxyXG4gIHRvZ2dsZShuYW1lOnN0cmluZykge1xyXG4gICAgICBpZiAodGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdKSB7XHJcbiAgICAgICAgICBkZWxldGUgdGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdO1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRDb3VudGVyIC09IDE7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodGhpcy5iYXNrZXRDb3VudGVyID49IDIwKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3dNb2RhbCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdID0gMTtcclxuICAgICAgICAgIHRoaXMuYmFza2V0Q291bnRlciArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYXNrZXRTdG9yYWdlJywgSlNPTi5zdHJpbmdpZnkodGhpcy5iYXNrZXRTdG9yYWdlKSk7XHJcbiAgfVxyXG4gIGNsZWFyKCkge1xyXG4gICAgICB0aGlzLmJhc2tldFN0b3JhZ2UgPSB7fTtcclxuICAgICAgdGhpcy5iYXNrZXRDb3VudGVyID0gMDtcclxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2Jhc2tldFN0b3JhZ2UnKTtcclxuICB9XHJcbiAgc2hvd01vZGFsKCkge1xyXG4gICAgICB0aGlzLm1vZGFsV2luZG93LmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2tldCIsImltcG9ydCB7IElDYXJkcyB9IGZyb20gJy4uLy4uL21vZGVscy9pbnJlZmFjZXMnXHJcblxyXG5leHBvcnQgY29uc3QgY2FyZHM6IElDYXJkc1tdID0gW1xyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIFdhZmZsZSBPbmUgU0UnLFxyXG4gICAgY2F0ZWdvcnk6ICdCYXNrZXRiYWxsJyxcclxuICAgIHByaWNlOiAnODknLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgIHNpemU6ICc0LjUnLFxyXG4gICAgYnJhbmQ6ICdOaWtlIEJ5IFlvdScsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMjkwODIxMTAtNTgzZC00MDIxLTlmZjAtNTdkMmNmZjM2YzliL3dhZmZsZS1vbmUtc2Utc2hvZXMtbVQzQ1FOLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMScsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDEnLFxyXG4gICAgY2F0ZWdvcnk6ICdSdW5uaW5nJyxcclxuICAgIHByaWNlOiAnMTE1JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLFxyXG4gICAgc2l6ZTogJzcuNScsXHJcbiAgICBicmFuZDogJ0pvcmRhbicsXHJcbiAgICBtYXRlcmlhbDogJ0xlYXRoZXInLFxyXG4gICAgaW1nOidodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMDVhZWI1NGYtY2E4Ni00OGQ5LWE2MGYtNTdkNzk4ZTM5MzVkL2Fpci1tYXgtOTUtc2hvZXMtVEpMTHNCLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMScsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDInLFxyXG4gICAgY2F0ZWdvcnk6ICdKb3JkYW4nLFxyXG4gICAgcHJpY2U6ICcxMDAnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjond2hpdGUnLFxyXG4gICAgc2l6ZTogJzUuMCcsIFxyXG4gICAgYnJhbmQ6ICdOaWtlIFNwb3J0d2VhcicsXHJcbiAgICBtYXRlcmlhbDogJ0xlYXRoZXInLFxyXG4gICAgaW1nOidodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMzU4YjVmZmUtMDcwNC00YzVhLTg5ZmQtMGZhNWIyYjFmOTliL2Fpci1tYXgtcGx1cy1paWktc2hvZS0zQlNCdHgucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIwJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgMycsXHJcbiAgICBjYXRlZ29yeTogJ0xpZmVzdHlsZScsXHJcbiAgICBwcmljZTogJzE5OCcsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncmVkJyxcclxuICAgIHNpemU6ICc0LjAnLFxyXG4gICAgYnJhbmQ6ICdOaWtlTGFiJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzMxMmUwZGY2LWEwYzYtNGE1ZC1iYTAxLWU4MzdiM2Q4ZWU0OS9qb3JkYW4tZGVsdGEtMy1zcC1zaG9lcy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMTknLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgNCcsXHJcbiAgICBjYXRlZ29yeTogJ0Zvb3RiYWxsJyxcclxuICAgIHByaWNlOiAnMTU2JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdwaW5rJyxcclxuICAgIHNpemU6ICc2LjAnLFxyXG4gICAgYnJhbmQ6ICdKb3JkYW4nLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzQxODBlNzI1LTQ5NjYtNDYzYi04YzIyLTcxZTNjYTZhOWE1NS9haXItam9yZGFuLTItcmV0cm8tc3Atc2hvZXMucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDUnLFxyXG4gICAgY2F0ZWdvcnk6ICdUcmFpbmluZycsXHJcbiAgICBwcmljZTogJzE3OCcsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAgJ2dyZWVuJyxcclxuICAgIHNpemU6ICc1LjUnLFxyXG4gICAgYnJhbmQ6ICdOaWtlIEJ5IFlvdScsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMGRiMzA0NDctZDE5OS00MzczLWJmMzYtNmNiYjQzOWU5NmMyL2Fpci1tYXgtdGVycmFzY2FwZS05MC1zaG9lcy13ZEJrS0gucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIwJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDYnLFxyXG4gICAgY2F0ZWdvcnk6ICdTa2F0ZWJvYXJkaW5nJyxcclxuICAgIHByaWNlOiAnMjYwJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdncmVlbicsXHJcbiAgICBzaXplOiAnMy41JyxcclxuICAgIGJyYW5kOiAnQUNHJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9lNmI1ZGQ2NC0xYTMyLTQ1ZjgtOGYxOS04ZjQyMWExY2RkNmQvYWlyLW1heC10ZXJyYXNjYXBlLTkwLXNob2VzLUNSbjBYVy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjEnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSA3JyxcclxuICAgIGNhdGVnb3J5OiAnR29sZicsXHJcbiAgICBwcmljZTogJzI0MCcsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncmVkJywgIFxyXG4gICAgc2l6ZTogJzMuMCcsXHJcbiAgICBicmFuZDogJ05pa2VMYWInLFxyXG4gICAgbWF0ZXJpYWw6ICdDYW52YXMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzI3MTM3MWYzLTBmNWMtNDdjNy1iNGI0LWY4NDBlOGI0ODhjMS9haXItcGVnYXN1cy04My1zaG9lcy1ocTIwMHgucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIwJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDgnLFxyXG4gICAgY2F0ZWdvcnk6ICdUZW5uaXMnLFxyXG4gICAgcHJpY2U6ICcyMjInLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2JsdWUnLFxyXG4gICAgc2l6ZTogJzguMCcsXHJcbiAgICBicmFuZDogJ0FDRycsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvYjAwYTUxNzAtMjBlZC00Y2RhLTljNjktNmMxZTBhMDQyNzZlL2Fpci1mb3JjZS0xLTA3LXNob2VzLUtwclFDci5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjInLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBXYWZmIFNFJyxcclxuICAgIGNhdGVnb3J5OiAnQmFza2V0YmFsbCcsXHJcbiAgICBwcmljZTogJzI4OScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgc2l6ZTogJzQuNScsXHJcbiAgICBicmFuZDogJ05pa2UgQnkgWW91JyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS82YWU5NTk1MS00YWJlLTQ1NWMtODk2Mi00MmNiYWRlYmZiYjcvem9vbS1mcmVhay0zLWJhc2tldGJhbGwtc2hvZXMtTVpwSlpGLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMScsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDEgMDcgTFY4JyxcclxuICAgIGNhdGVnb3J5OiAnUnVubmluZycsXHJcbiAgICBwcmljZTogJzEzOScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncmVkJyxcclxuICAgIHNpemU6ICc0LjUnLFxyXG4gICAgYnJhbmQ6ICdKb3JkYW4nLFxyXG4gICAgbWF0ZXJpYWw6ICdMZWF0aGVyJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzQ1Mjg5Y2I0LTJhZTYtNDE2NS1iZTZjLTg4MjM3ZDQyYzgxOS96b29teC1zdHJlYWtmbHktcm9hZC1yYWNpbmctc2hvZXMtWnY4SmJnLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMicsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgeCBTdMO8c3N5IEFpciBGb3JjZSAxIDA3IE1pZCcsXHJcbiAgICBjYXRlZ29yeTogJ0pvcmRhbicsXHJcbiAgICBwcmljZTogJzExMScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOid3aGl0ZScsXHJcbiAgICBzaXplOiAnOC41JywgXHJcbiAgICBicmFuZDogJ05pa2UgU3BvcnR3ZWFyJyxcclxuICAgIG1hdGVyaWFsOiAnTGVhdGhlcicsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9lMWMxMjkwYy01MzE0LTQ3ZGQtYmExYi0yMGFlNDc4MDg5N2Uva3lyaWUtbG93LTUtY29tbXVuaXR5LWpld2VsbC1sb3lkLWJhc2tldGJhbGwtc2hvZXMtend0azBTLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIE1heCA5NycsXHJcbiAgICBjYXRlZ29yeTogJ0xpZmVzdHlsZScsXHJcbiAgICBwcmljZTogJzE2NycsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncmVkJyxcclxuICAgIHNpemU6ICczLjUnLFxyXG4gICAgYnJhbmQ6ICdOaWtlTGFiJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzhhM2JhYjc5LTZjOTgtNGEwMy1hOGE1LTFjYTcwYmJkMjM2Mi96aW9uLTItYmFza2V0YmFsbC1zaG9lcy1raFdicncucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDE5JyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ0FpciBKb3JkYW4gMSBSZXRybyBIaWdoIE9HJyxcclxuICAgIGNhdGVnb3J5OiAnRm9vdGJhbGwnLFxyXG4gICAgcHJpY2U6ICcxMDMnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3BpbmsnLFxyXG4gICAgc2l6ZTogJzYuMCcsXHJcbiAgICBicmFuZDogJ0pvcmRhbicsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvNTFmZTA5MjYtZjE0Ni00YmRlLTlmM2MtZmVmYzBmMDEwN2ZmL2lzcGEtbGluay1zaG9lcy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjInLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgTWF4IDk1IEVzc2VudGlhbCcsXHJcbiAgICBjYXRlZ29yeTogJ1RyYWluaW5nJyxcclxuICAgIHByaWNlOiAnMTU0JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICAnZ3JlZW4nLFxyXG4gICAgc2l6ZTogJzYuNScsXHJcbiAgICBicmFuZDogJ05pa2UgQnkgWW91JyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9lNThhYzUzOC1hODE1LTQ2YWQtYTE0ZC0xMzJmM2QyY2MzYmIvem9vbXgtdmFwb3JmbHktbmV4dC0yLXJvYWQtcmFjaW5nLXNob2VzLTgyMVM0Ri5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSB4IEFDUllNwq4gQmxhemVyIExvdycsXHJcbiAgICBjYXRlZ29yeTogJ1NrYXRlYm9hcmRpbmcnLFxyXG4gICAgcHJpY2U6ICcyOTknLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2dyZWVuJyxcclxuICAgIHNpemU6ICc3LjAnLFxyXG4gICAgYnJhbmQ6ICdBQ0cnLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2YyNjM1YWFiLWRlZWItNDQzYi1hNWNmLTU5NDE5ZTZlNjYzYi9haXItbWF4LTk1LWVzc2VudGlhbC1zaG9lcy1aZ2czcG4ucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIxJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgTWF4IFBsdXMnLFxyXG4gICAgY2F0ZWdvcnk6ICdHb2xmJyxcclxuICAgIHByaWNlOiAnMjAxJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLCAgXHJcbiAgICBzaXplOiAnOC4wJyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvNTA2YTA1YzctZWVhNC00NDA1LWFmMTItYmJhMzJiZDBlNDhjL2Fpci1qb3JkYW4tMS1yZXRyby1oaWdoLW9nLXNob2VzLTc5dkdXVi5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIFBlZ2FzdXMgVHJhaWwgMyBHT1JFLVRFWCcsXHJcbiAgICBjYXRlZ29yeTogJ1Rlbm5pcycsXHJcbiAgICBwcmljZTogJzI2NycsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnYmx1ZScsXHJcbiAgICBzaXplOiAnMy4wJyxcclxuICAgIGJyYW5kOiAnQUNHJyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9lZTJhMWU3OS00NjI2LTQ2YzctYjE4MS02ZmFkYmMyMzUxYTQvc3R1c3N5LWFpci1mb3JjZS0xLTA3LW1pZC1zaG9lcy1iZHNmbUgucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnS0QxNScsXHJcbiAgICBjYXRlZ29yeTogJ0pvcmRhbicsXHJcbiAgICBwcmljZTogJzExMScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOid3aGl0ZScsXHJcbiAgICBzaXplOiAnNS41JywgXHJcbiAgICBicmFuZDogJ05pa2UgU3BvcnR3ZWFyJyxcclxuICAgIG1hdGVyaWFsOiAnTGVhdGhlcicsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS84ZDU4NGUzZS1lMmI1LTRkMTktOWU3My0xNzRkNTk5MDU1ZWIvYWlyLW1heC1wbHVzLXNob2VzLXgzN24zMC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIFpvb20gQWxwaGFmbHkgTmV4dCBOYXR1cmUnLFxyXG4gICAgY2F0ZWdvcnk6ICdMaWZlc3R5bGUnLFxyXG4gICAgcHJpY2U6ICcxNjcnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICBzaXplOiAnNi41JyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9mNGVhNzAxOS1iOWE1LTQzNGQtOTc1My05NzZjYWU2NzA0OWIvYWlyLW1heC05Ny1zaG9lcy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMTknLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnQWlyIEpvcmRhbiAxIFJldHJvIEhpZ2ggJyxcclxuICAgIGNhdGVnb3J5OiAnRm9vdGJhbGwnLFxyXG4gICAgcHJpY2U6ICcxODMnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3BpbmsnLFxyXG4gICAgc2l6ZTogJzYuMCcsXHJcbiAgICBicmFuZDogJ0pvcmRhbicsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMTY0MTg1M2YtNTI2NS00NjdkLTk2ZGMtOGExYzE0Y2U3NmNhL2tkMTUtYmFza2V0YmFsbC1zaG9lcy0wSDhwbVEucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2VDb3VydCBab29tIFBybycsXHJcbiAgICBjYXRlZ29yeTogJ1RyYWluaW5nJyxcclxuICAgIHByaWNlOiAnMTU0JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICAnZ3JlZW4nLFxyXG4gICAgc2l6ZTogJzYuNScsXHJcbiAgICBicmFuZDogJ05pa2UgQnkgWW91JyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS81ZWI2ZGYxYi0yMGYxLTQ4YTktYjk0YS1iOWI0OTRhNzk2MzYvem9vbS1hbHBoYWZseS1uZXh0LW5hdHVyZS1yb2FkLXJhY2luZy1zaG9lLTNtazlnMi5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSB4IEFDUk9OWU3CriBCbGF6ZXIgTG93JyxcclxuICAgIGNhdGVnb3J5OiAnU2thdGVib2FyZGluZycsXHJcbiAgICBwcmljZTogJzI5OScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnZ3JlZW4nLFxyXG4gICAgc2l6ZTogJzcuMCcsXHJcbiAgICBicmFuZDogJ0FDRycsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvZjI0MjNmN2EtOTVhNy00MGM1LWEyYjUtYmMzZWVhMmJkOTUzL25pa2Vjb3VydC16b29tLXByby1jbGF5LWNvdXJ0LXRlbm5pcy1zaG9lcy1xSkZ4YzgucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIxJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnQWlyIEpvcmRhbiAxIExvdyBGbHlFYXNlJyxcclxuICAgIGNhdGVnb3J5OiAnR29sZicsXHJcbiAgICBwcmljZTogJzIwMScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncmVkJywgIFxyXG4gICAgc2l6ZTogJzguMCcsXHJcbiAgICBicmFuZDogJ05pa2VMYWInLFxyXG4gICAgbWF0ZXJpYWw6ICdDYW52YXMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2IzZGIzYWNiLTNhMTYtNDc5ZS04YWVhLTQ5ZjhlM2FlZjAxYi9haXItem9vbS1mbGlnaHQtOTUtc2hvZXMtajdNUmh6LnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIFpvb20gVGVtcG8gTkVYVCUnLFxyXG4gICAgY2F0ZWdvcnk6ICdUZW5uaXMnLFxyXG4gICAgcHJpY2U6ICcyNjcnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2JsdWUnLFxyXG4gICAgc2l6ZTogJzguNScsXHJcbiAgICBicmFuZDogJ0FDRycsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMmIyMWI2YmUtMmUyNC00YzdmLWFiZTMtNzBmYjQwOWJmMjMxL3Jldm9sdXRpb24tNi1uZXh0LW5hdHVyZS1yb2FkLXJ1bm5pbmctc2hvZXMtRHZ0WE1YLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMicsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH1cclxuXSIsImltcG9ydCB7IElDYXJkcyB9IGZyb20gJy4uLy4uL21vZGVscy9pbnJlZmFjZXMnXHJcbmltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gJy4uLy4uL21vZGVscy9zZWxlY3RvcnMnXHJcbmNsYXNzIFJlbmRlckNhcmRzIHtcclxuICAgcHJvZHVjdHM6IEhUTUxFbGVtZW50O1xyXG4gXHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHRoaXMucHJvZHVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5jYXRhbG9nUHJvZHVjdHMpIGFzIEhUTUxFbGVtZW50O1xyXG4gIH0gICAgICBcclxuXHJcbiAgZHJhdyhkYXRhOiBJQ2FyZHNbXSwgYmFza2V0OlJlY29yZDxzdHJpbmcsbnVtYmVyPil7XHJcbiAgICBjb25zdCBzaG9lc0l0ZW1UZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNUZW1wbGF0ZSkgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuICAgIGlmICghZGF0YS5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiU29ycnksIHdlIGNvdWxkbid0IGZpbmQgdGhlIHBhZ2UgeW91J3JlIGxvb2tpbmcgZm9yXCI7XHJcbiAgICAgIHRleHQuY2xhc3NMaXN0LmFkZCgnbm90aWZ5Jyk7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZCh0ZXh0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNhcmRDbG9uZSA9IHNob2VzSXRlbVRlbXA/LmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGNhcmRDbG9uZT8ucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkSW1hZ2UpIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZE5hbWUgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkTmFtZSkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZENhdGVnb3J5ID0gY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZENhdGVnb3J5KSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjYXJkQnJhbmQgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkQnJhbmQpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmRNYXRlcmlhbCA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRNYXRlcmlhbCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZFByaWNlID0gY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZFByaWNlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjYXJkQ29sb3IgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkQ29sb3IpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmRTdG9jayA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRTdG9jaykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZEJhc2tldEJ1dHRvbiA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRCYXNrZXRCdXR0b24pIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgICAgICBpbWcuc3JjID0gaXRlbS5pbWc7XHJcbiAgICAgICAgY2FyZE5hbWUuaW5uZXJUZXh0ID0gaXRlbS5uYW1lO1xyXG4gICAgICAgIGNhcmRDYXRlZ29yeS50ZXh0Q29udGVudCA9IGl0ZW0uY2F0ZWdvcnk7XHJcbiAgICAgICAgY2FyZEJyYW5kLnRleHRDb250ZW50ID0gaXRlbS5icmFuZDtcclxuICAgICAgICBjYXJkTWF0ZXJpYWwudGV4dENvbnRlbnQgPSBpdGVtLm1hdGVyaWFsO1xyXG4gICAgICAgIGNhcmRDb2xvci50ZXh0Q29udGVudCA9IGAke2l0ZW0uY29sb3J9IGNvbG9yYDtcclxuICAgICAgICBjYXJkUHJpY2UudGV4dENvbnRlbnQgPSBgJCR7aXRlbS5wcmljZX1gO1xyXG4gICAgICAgIGNhcmRTdG9jay50ZXh0Q29udGVudCA9IGl0ZW0uc3RvY2sgPyAnSW4gc3RvY2snIDogJ09uIHJlcXVlc3QnO1xyXG4gICAgICAgIGl0ZW0uc3RvY2tcclxuICAgICAgICAgICAgPyBjYXJkU3RvY2suY2xhc3NMaXN0LmFkZCgnc2hvZXMtaW4tc3RvY2snKVxyXG4gICAgICAgICAgICA6IGNhcmRTdG9jay5jbGFzc0xpc3QuYWRkKCdzaG9lcy1vdXQtb2Ytc3RvY2snKTtcclxuICAgICAgICBjYXJkQmFza2V0QnV0dG9uLnRleHRDb250ZW50ID0gYmFza2V0W2l0ZW0ubmFtZV0gPyAnSW4gdGhlIGJhc2tldCcgOiAnQWRkIHRvIGJhc2tldCc7XHJcbiAgICAgICAgYmFza2V0W2l0ZW0ubmFtZV1cclxuICAgICAgICAgICAgPyBjYXJkQmFza2V0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FkZGVkJylcclxuICAgICAgICAgICAgOiBjYXJkQmFza2V0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZGVkJyk7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kKGNhcmRDbG9uZSk7ICAgXHJcbiAgICAgIH0pO1xyXG4gICAgIH1cclxuICAgICB0aGlzLnByb2R1Y3RzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgIHRoaXMucHJvZHVjdHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyQ2FyZHM7IiwiaW1wb3J0IHsgc2VsZWN0b3JzIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zZWxlY3RvcnNcIjtcclxuXHJcbmNsYXNzIFNsaWRlciB7XHJcbiAgc2xpZGVyT25lOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHNsaWRlclR3bzogSFRNTElucHV0RWxlbWVudDtcclxuICBkaXNwbGF5VmFsT25lOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRpc3BsYXlWYWxUd286IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgc2xpZGVyVHJhY2s6IEhUTUxFbGVtZW50O1xyXG4gIHNsaWRlck1heFZhbHVlOiBzdHJpbmc7XHJcbiAgbWluR2FwOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLnNsaWRlck9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5zbGlkZXJQb2ludFJpZ2h0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5zbGlkZXJUd28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuc2xpZGVyUG9pbnRMZWZ0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5kaXNwbGF5VmFsT25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLnNsaWRlclZhbHVlUmlnaHQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmRpc3BsYXlWYWxUd28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuc2xpZGVyVmFsdWVMZWZ0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5zbGlkZXJUcmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNsaWRlclRyYWNrKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuc2xpZGVyTWF4VmFsdWUgPSB0aGlzLnNsaWRlck9uZS5tYXg7XHJcbiAgICB0aGlzLm1pbkdhcCA9IDU7XHJcbiAgICB0aGlzLnN0YXJ0KClcclxuICB9XHJcbiBcclxuICBzdGFydCgpe1xyXG5cclxuICAgIHRoaXMuc2xpZGVyT25lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZihwYXJzZUludCh0aGlzLnNsaWRlclR3by52YWx1ZSkgLSBwYXJzZUludCh0aGlzLnNsaWRlck9uZS52YWx1ZSkgPD0gdGhpcy5taW5HYXApIHtcclxuICAgICAgICB0aGlzLnNsaWRlck9uZS52YWx1ZSA9IFN0cmluZyhwYXJzZUludCh0aGlzLnNsaWRlclR3by52YWx1ZSkgLSB0aGlzLm1pbkdhcCk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaXNwbGF5VmFsT25lLnRleHRDb250ZW50ID0gdGhpcy5zbGlkZXJPbmUudmFsdWU7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtaW5QcmljZScsIHRoaXMuc2xpZGVyT25lLnZhbHVlKSBcclxuICAgICAgdGhpcy5maWxsQ29sb3IoKTtcclxuXHJcbiAgICB9KVxyXG4gICAgdGhpcy5zbGlkZXJUd28uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmKHBhcnNlSW50KHRoaXMuc2xpZGVyVHdvLnZhbHVlKSAtIHBhcnNlSW50KHRoaXMuc2xpZGVyT25lLnZhbHVlKSA8PSB0aGlzLm1pbkdhcCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyVHdvLnZhbHVlID0gU3RyaW5nKHBhcnNlSW50KHRoaXMuc2xpZGVyT25lLnZhbHVlKSArIHRoaXMubWluR2FwKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRpc3BsYXlWYWxUd28udGV4dENvbnRlbnQgPSB0aGlzLnNsaWRlclR3by52YWx1ZTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21heFByaWNlJywgdGhpcy5zbGlkZXJUd28udmFsdWUpIFxyXG4gICAgICB0aGlzLmZpbGxDb2xvcigpO1xyXG4gIH0pXHJcbiAgfVxyXG5cclxuICBmaWxsQ29sb3IoKXtcclxuICAgIGNvbnN0IHBlcnNlbnQxOiBudW1iZXIgPSAoK3RoaXMuc2xpZGVyT25lLnZhbHVlIC8gK3RoaXMuc2xpZGVyTWF4VmFsdWUpICogMTAwO1xyXG4gICAgY29uc3QgcGVyc2VudDI6IG51bWJlciA9ICgrdGhpcy5zbGlkZXJUd28udmFsdWUgLyArdGhpcy5zbGlkZXJNYXhWYWx1ZSkgKiAxMDA7XHJcbiAgICB0aGlzLnNsaWRlclRyYWNrLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2IoMjI2LCAyMjYsIDIyNikgJHtwZXJzZW50MX0lLCAjMzI2NGZlICR7cGVyc2VudDF9JSwgIzMyNjRmZSAke3BlcnNlbnQyfSUsIHJnYigyMjYsIDIyNiwgMjI2KSAke3BlcnNlbnQyfSUpIGBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNsaWRlciIsImltcG9ydCAnLi9zdHlsZS5zY3NzJ1xyXG5cclxuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvYXBwL2FwcCdcclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcclxuYXBwLnN0YXJ0KCk7XHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9