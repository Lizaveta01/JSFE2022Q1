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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzlFLE1BQU0sUUFBUSxHQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLGdEQUFnRCxRQUFRLGNBQWMsUUFBUSxjQUFjLFFBQVEseUJBQXlCLFFBQVEsS0FBSztJQUNoTCxDQUFDO0NBQ0Y7QUFFRCxxQkFBZSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkRyQiw0REFBcUI7QUFFckIsOEdBQXNDO0FBRXRDLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7QUFDdEIsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Ozs7O1VDTFo7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL3N0eWxlLnNjc3M/YmMzYiIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy9hcHAvYXBwLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xsZXIvZmlsdGVyLnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS8uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xsZXIvc29ydENhcmQudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvbW9kZWxzL3NlbGVjdG9ycy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy92aWV3L2Jhc2tldC9iYXNrZXQudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvdmlldy9jYXJkcy9jYXJkc0luZm8udHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2NvbXBvbmVudHMvdmlldy9jYXJkcy9yZW5kZXJDYXJkcy50cyIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvLi9zcmMvY29tcG9uZW50cy92aWV3L3NsaWRlci9zbGlkZXIudHMiLCJ3ZWJwYWNrOi8vb25saW5lLXN0b3JlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9vbmxpbmUtc3RvcmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL29ubGluZS1zdG9yZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IFNsaWRlciBmcm9tIFwiLi4vdmlldy9zbGlkZXIvc2xpZGVyXCI7XHJcbmltcG9ydCBCYXNrZXQgZnJvbSBcIi4uL3ZpZXcvYmFza2V0L2Jhc2tldFwiO1xyXG5pbXBvcnQgUmVuZGVyQ2FyZHMgZnJvbSBcIi4uL3ZpZXcvY2FyZHMvcmVuZGVyQ2FyZHNcIjtcclxuaW1wb3J0IEZpbHRlciBmcm9tIFwiLi4vY29udHJvbGxlci9maWx0ZXJcIjtcclxuaW1wb3J0IFNvcnRDYXJkIGZyb20gXCIuLi9jb250cm9sbGVyL3NvcnRDYXJkXCI7XHJcbmltcG9ydCB7IGNhcmRzIH0gZnJvbSBcIi4uL3ZpZXcvY2FyZHMvY2FyZHNJbmZvXCI7XHJcbmNsYXNzIEFwcHtcclxuICBwcml2YXRlIGRhdGE6IGFueTtcclxuICBwcml2YXRlIHJlYWRvbmx5IHNob3BDYXJkczogUmVuZGVyQ2FyZHM7XHJcbiAgcHJpdmF0ZSBiYXNrZXQ6IEJhc2tldDtcclxuICBwcmljZVNsaWNlcjogU2xpZGVyO1xyXG4gIGNvdW50ZXJCYXNrZXQ6IEhUTUxFbGVtZW50O1xyXG4gIHNvcnQ6IFNvcnRDYXJkO1xyXG4gIGZpbHRlcjogRmlsdGVyO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLnNob3BDYXJkcyA9IG5ldyBSZW5kZXJDYXJkcygpO1xyXG4gICAgdGhpcy5kYXRhIDtcclxuICAgIHRoaXMuYmFza2V0ID0gbmV3IEJhc2tldCgpO1xyXG4gICAgdGhpcy5wcmljZVNsaWNlciA9IG5ldyBTbGlkZXIoKTtcclxuICAgIHRoaXMuY291bnRlckJhc2tldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudGVyLXByb2R1Y3RzJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNvcnQgPSBuZXcgU29ydENhcmQoJy5mb3JtLXNlbGVjdCcpO1xyXG4gICAgdGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5yZWRyYXcoKTtcclxuICAgIHRoaXMuc2VhcmNoKCk7XHJcbiAgICB0aGlzLnNvcnRDYXJkKCk7XHJcbiAgICB0aGlzLmZpbHRlckRhdGEoKTtcclxuICAgIHRoaXMuc2VlQmFza2V0KCk7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2goKXtcclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LXNlYXJjaCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpPT4ge1xyXG4gICAgICB0aGlzLnJlZHJhdygpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyRGF0YSgpe1xyXG4gICAgY29uc3QgZmlsdGVyQ29udGFpbmVyID1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBmaWx0ZXJDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgICBpZih0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY3VzdG9tLWNoZWNrYm94Jykpe1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ZXNDaGVja2VkOiBib29sZWFuW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZpbHRlci5jYXRlZ29yeUxpc3QuZm9yRWFjaCgoY2hlY2tib3gsIGkpID0+IHtcclxuICAgICAgICAgIGNoZWNrYm94ZXNDaGVja2VkW2ldID0gY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXRlZ29yeScsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVja2JveC1zaXplJykpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRhcmdldEVsZW1lbnQpXHJcbiAgICAgICAgY29uc3QgY2hlY2tib3hlc0NoZWNrZWQ6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyLnNpemVMaXN0LmZvckVhY2goKGNoZWNrYm94LCBpKSA9PiB7XHJcbiAgICAgICAgICBjaGVja2JveGVzQ2hlY2tlZFtpXSA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2l6ZScsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGVja2JveC1jb2xvcicpKXtcclxuICAgICAgICBjb25zdCBjaGVja2JveGVzQ2hlY2tlZDogYm9vbGVhbltdID0gW107XHJcbiAgICAgICAgdGhpcy5maWx0ZXIuY29sb3JMaXN0LmZvckVhY2goKGNoZWNrYm94LCBpKSA9PiB7XHJcbiAgICAgICAgICBjaGVja2JveGVzQ2hlY2tlZFtpXSA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29sb3InLCBKU09OLnN0cmluZ2lmeShjaGVja2JveGVzQ2hlY2tlZCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnY3VzdG9tLXJhZGlvJykpe1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ZXNDaGVja2VkOiBib29sZWFuW10gPSBbXTtcclxuICAgICAgICB0aGlzLmZpbHRlci5tYXRlcmlhbExpc3QuZm9yRWFjaCgoY2hlY2tib3gsIGkpID0+IHtcclxuICAgICAgICAgIGNoZWNrYm94ZXNDaGVja2VkW2ldID0gY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtYXRlcmlhbCcsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdicmFuZHMnKSl7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3hlc0NoZWNrZWQ6IGJvb2xlYW5bXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyLmJyYW5kTGlzdC5mb3JFYWNoKChjaGVja2JveCwgaSkgPT4ge1xyXG4gICAgICAgICAgY2hlY2tib3hlc0NoZWNrZWRbaV0gPSBjaGVja2JveC5zZWxlY3RlZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdicmFuZCcsIEpTT04uc3RyaW5naWZ5KGNoZWNrYm94ZXNDaGVja2VkKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucmVkcmF3KClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXNldCgpe1xyXG4gICAgY29uc3QgY2xlYW5GaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyLWJ1dHRvbicpXHJcbiAgICBjbGVhbkZpbHRlcnM/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmZpbHRlci5maWx0ZXJSZXNldCgpO1xyXG4gICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHNvcnRDYXJkKCl7XHJcbiAgICB0aGlzLnNvcnQuc29ydElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnNvcnQuc29ydElucHV0KTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NvcnQnLCB0aGlzLnNvcnQuc29ydElucHV0LnZhbHVlKVxyXG4gICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHNlZUJhc2tldCgpe1xyXG4gICAgY29uc3QgY2F0YWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0cycpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY2F0YWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID10YXJnZXQuY2xvc2VzdCgnLnNob2VzLWNhcmQnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgaWYodGFyZ2V0RWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5iYXNrZXQudG9nZ2xlKHRhcmdldEVsZW1lbnQuY2hpbGRyZW5bMV0uaW5uZXJIVE1MKTtcclxuICAgICAgICB0aGlzLnJlZHJhdygpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmVkcmF3KCl7XHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmZpbHRlci5maWx0ZXJBbGwoY2FyZHMpO1xyXG4gICAgY29uc3Qgc29ydERhdGEgPSB0aGlzLnNvcnQuc29ydCh0aGlzLmRhdGEpO1xyXG4gICAgdGhpcy5zaG9wQ2FyZHMuZHJhdyhzb3J0RGF0YSEsIHRoaXMuYmFza2V0LmJhc2tldFN0b3JhZ2UpO1xyXG4gICAgdGhpcy5iYXNrZXQuYmFza2V0Q291bnRlciA/IHRoaXMuY291bnRlckJhc2tldC5jbGFzc0xpc3QuYWRkKCdoYXMtaXRlbScpIDogdGhpcy5jb3VudGVyQmFza2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1pdGVtJyk7XHJcbiAgICB0aGlzLmNvdW50ZXJCYXNrZXQuaW5uZXJUZXh0ID0gU3RyaW5nKHRoaXMuYmFza2V0LmJhc2tldENvdW50ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwIiwiaW1wb3J0IHsgSUNhcmRzIH0gZnJvbSAnLi4vbW9kZWxzL2lucmVmYWNlcyc7XHJcbmltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gJy4uL21vZGVscy9zZWxlY3RvcnMnXHJcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi4vdmlldy9zbGlkZXIvc2xpZGVyJztcclxuXHJcbmNsYXNzIEZpbHRlciB7XHJcbiAgc2VhcmNoRmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgY2F0ZWdvcnlMaXN0TmFtZTogSFRNTEVsZW1lbnQ7XHJcbiAgY2F0ZWdvcnlMaXN0OiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHByaWNlU2xpZGVyOiBIVE1MRWxlbWVudDtcclxuICBjb2xvckxpc3ROYW1lOiBIVE1MRWxlbWVudDtcclxuICBjb2xvckxpc3Q6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD47XHJcbiAgc2l6ZUxpc3ROYW1lOiBIVE1MRWxlbWVudDtcclxuICBzaXplTGlzdDogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBicmFuZExpc3ROYW1lOiBIVE1MRWxlbWVudDtcclxuICBicmFuZExpc3Q6IE5vZGVMaXN0T2Y8SFRNTE9wdGlvbkVsZW1lbnQ+O1xyXG4gIG1hdGVyaWFsTGlzdE5hbWU6IEhUTUxFbGVtZW50O1xyXG4gIG1hdGVyaWFsTGlzdDogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcclxuICBjbGVhbkZpbHRlcnNCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIHNsaWRlck9uZTogSFRNTElucHV0RWxlbWVudDtcclxuICBzbGlkZXJUd286IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgbmV3UHJpY2VGaWx0ZXI6IFNsaWRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IgKCl7XHJcbiAgICB0aGlzLnNlYXJjaEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2VhcmNoRmllbGQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNhdGVnb3J5TGlzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5jYXRlZ29yeUxpc3ROYW1lKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QgPSB0aGlzLmNhdGVnb3J5TGlzdE5hbWUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuY2hlY2tib3hMaXN0KTtcclxuICAgIHRoaXMucHJpY2VTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5wcmljZVNsaWRlcilhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuc2xpZGVyT25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLnNsaWRlclBvaW50UmlnaHQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNsaWRlclR3byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5zbGlkZXJQb2ludExlZnQpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNvbG9yTGlzdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5jb2xvckxpc3ROYW1lKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5jb2xvckxpc3QgPSB0aGlzLmNvbG9yTGlzdE5hbWUucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMuY29sb3JMaXN0KTtcclxuICAgIHRoaXMuc2l6ZUxpc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2l6ZUxpc3ROYW1lKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5zaXplTGlzdCA9IHRoaXMuc2l6ZUxpc3ROYW1lLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLnNpemVMaXN0KTtcclxuICAgIHRoaXMuYnJhbmRMaXN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLmJyYW5kTGlzdE5hbWUpYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmJyYW5kTGlzdCA9IHRoaXMuYnJhbmRMaXN0TmFtZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5vcHRpb24pO1xyXG4gICAgdGhpcy5tYXRlcmlhbExpc3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMubWF0ZXJpYWxMaXN0TmFtZSlhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMubWF0ZXJpYWxMaXN0ID0gdGhpcy5tYXRlcmlhbExpc3ROYW1lLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzLnJhZGlvQnV0dG9uKTtcclxuICAgIHRoaXMuY2xlYW5GaWx0ZXJzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuY2xlYW5GaWx0ZXJzQnV0dG9uKWFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5uZXdQcmljZUZpbHRlciA9IG5ldyBTbGlkZXIoKTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgIGluaXQoKSB7XHJcbiAgICB0aGlzLmhpZGVGaWx0ZXIoKTtcclxuICAgIGNvbnN0IGNoZWNrZWRDYXRlZ29yeU9wdGlvbjogYm9vbGVhbltdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2F0ZWdvcnknKSEpO1xyXG4gICAgY29uc3QgY2hlY2tlZENvbG9yT3B0aW9uOiBib29sZWFuW10gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb2xvcicpISk7XHJcbiAgICBjb25zdCBjaGVja2VkU2l6ZU9wdGlvbjogYm9vbGVhbltdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2l6ZScpISk7XHJcbiAgICBjb25zdCBjaGVja2VkQnJhbmRPcHRpb246IGJvb2xlYW5bXSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JyYW5kJykhKTtcclxuICAgIGNvbnN0IGNoZWNrZWRNYXRlcmlhbE9wdGlvbjogYm9vbGVhbltdID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWF0ZXJpYWwnKSEpO1xyXG5cclxuICAgIGlmIChjaGVja2VkQ2F0ZWdvcnlPcHRpb24pIHtcclxuICAgICAgdGhpcy5jYXRlZ29yeUxpc3QuZm9yRWFjaCgoY2hib3gsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNoYm94LmNoZWNrZWQgPSBjaGVja2VkQ2F0ZWdvcnlPcHRpb25baWR4XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZihjaGVja2VkQ29sb3JPcHRpb24pe1xyXG4gICAgICB0aGlzLmNvbG9yTGlzdC5mb3JFYWNoKChjaGJveCwgaWR4KSA9PiB7XHJcbiAgICAgICAgY2hib3guY2hlY2tlZCA9IGNoZWNrZWRDb2xvck9wdGlvbltpZHhdO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmKGNoZWNrZWRTaXplT3B0aW9uKXtcclxuICAgICAgdGhpcy5zaXplTGlzdC5mb3JFYWNoKChjaGJveCwgaWR4KSA9PiB7XHJcbiAgICAgICAgY2hib3guY2hlY2tlZCA9IGNoZWNrZWRTaXplT3B0aW9uW2lkeF07XHJcbiAgICAgfSlcclxuICAgIH1cclxuICAgIGlmKGNoZWNrZWRCcmFuZE9wdGlvbil7XHJcbiAgICAgIHRoaXMuYnJhbmRMaXN0LmZvckVhY2goKGNoYm94LCBpZHgpID0+IHtcclxuICAgICAgICBjaGJveC5zZWxlY3RlZCA9IGNoZWNrZWRCcmFuZE9wdGlvbltpZHhdO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmKGNoZWNrZWRNYXRlcmlhbE9wdGlvbil7XHJcbiAgICAgIHRoaXMubWF0ZXJpYWxMaXN0LmZvckVhY2goKGNoYm94LCBpZHgpID0+IHtcclxuICAgICAgICBjaGJveC5jaGVja2VkID0gY2hlY2tlZE1hdGVyaWFsT3B0aW9uW2lkeF07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBtaW5WYWx1ZSA9JzAnO1xyXG4gICAgbGV0IG1heFZhbHVlID0nMzAwJztcclxuICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtaW5QcmljZScpKXtcclxuICAgICAgbWluVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWluUHJpY2UnKSE7XHJcbiAgICB9XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbWF4UHJpY2UnKSl7XHJcbiAgICAgIG1heFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21heFByaWNlJykhO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zbGlkZXJPbmUudmFsdWUgPSBtaW5WYWx1ZTtcclxuICAgIHRoaXMuc2xpZGVyVHdvLnZhbHVlID0gbWF4VmFsdWU7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmRpc3BsYXlWYWxPbmUudGV4dENvbnRlbnQgPSBtaW5WYWx1ZTtcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIuZGlzcGxheVZhbFR3by50ZXh0Q29udGVudCA9IG1heFZhbHVlO1xyXG4gICAgdGhpcy5uZXdQcmljZUZpbHRlci5maWxsQ29sb3IoKVxyXG4gICB9XHJcblxyXG4gIHNlYXJjaFNob2VzTmFtZShkYXRhOiBJQ2FyZHNbXSl7XHJcbiAgICBpZighdGhpcy5zZWFyY2hGaWVsZC52YWx1ZSl7XHJcbiAgICAgIHJldHVybiBkYXRhXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zZWFyY2hGaWVsZC52YWx1ZS50b0xvd2VyQ2FzZSgpKSAhPSAtMSlcclxuICB9XHJcblxyXG4gIGZpbHRlckJ5Q2F0ZWdvcnkoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgY29uc3QgY2hlY2tlZEJveDpzdHJpbmdbXSA9IFtdO1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcclxuICAgICAgaWYoY2hlY2tib3guY2hlY2tlZCl7XHJcbiAgICAgICAgY2hlY2tlZEJveC5wdXNoKGNoZWNrYm94Lm5hbWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZighY2hlY2tlZEJveC5sZW5ndGgpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZEJveC5pbmRleE9mKGl0ZW0uY2F0ZWdvcnkpICE9IC0xKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyQnlQcmljZShkYXRhOiBJQ2FyZHNbXSl7XHJcbiAgICBpZigrdGhpcy5zbGlkZXJPbmUudmFsdWUgPT0gMCAmJiArdGhpcy5zbGlkZXJUd28udmFsdWUgPT0gMzAwKXtcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gK2l0ZW0ucHJpY2UgPj0gK3RoaXMuc2xpZGVyT25lLnZhbHVlICYmICtpdGVtLnByaWNlIDw9ICt0aGlzLnNsaWRlclR3by52YWx1ZSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckJ5Q29sb3IoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgY29uc3QgY2hlY2tlZEJveDpzdHJpbmdbXSA9IFtdO1xyXG4gICAgdGhpcy5jb2xvckxpc3QuZm9yRWFjaCgoY2hlY2tib3gpID0+IHtcclxuICAgICAgaWYoY2hlY2tib3guY2hlY2tlZCl7XHJcbiAgICAgICAgY2hlY2tlZEJveC5wdXNoKGNoZWNrYm94Lm5hbWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZighY2hlY2tlZEJveC5sZW5ndGgpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZEJveC5pbmRleE9mKGl0ZW0uY29sb3IpICE9IC0xKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZmlsdGVyQnlTaXplKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnN0IGNoZWNrZWRTaXplOnN0cmluZ1tdID0gW107XHJcbiAgICB0aGlzLnNpemVMaXN0LmZvckVhY2goKHNpemUpID0+IHtcclxuICAgICAgaWYoc2l6ZS5jaGVja2VkKXtcclxuICAgICAgICBjaGVja2VkU2l6ZS5wdXNoKHNpemUubmFtZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmKCFjaGVja2VkU2l6ZS5sZW5ndGgpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZFNpemUuaW5kZXhPZihpdGVtLnNpemUpICE9IC0xXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbHRlckJ5QnJhbmQoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgY29uc3QgY2hlY2tlZEJyYW5kOnN0cmluZ1tdID0gW107XHJcbiAgICB0aGlzLmJyYW5kTGlzdC5mb3JFYWNoKChicmFuZCkgPT4ge1xyXG4gICAgICBpZihicmFuZC5zZWxlY3RlZCl7XHJcbiAgICAgICAgY2hlY2tlZEJyYW5kLnB1c2goYnJhbmQudmFsdWUpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZihjaGVja2VkQnJhbmRbMF0gPT0gJ1NlbGVjdCBicmFuZCcpeyBcclxuICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkYXRhLmZpbHRlcigoaXRlbSkgPT4gY2hlY2tlZEJyYW5kLmluZGV4T2YoaXRlbS5icmFuZCkgIT0gLTEpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJCeU1hdGVyaWFsKGRhdGE6IElDYXJkc1tdKXtcclxuICAgIGNvbnN0IGNoZWNrZWRCb3g6c3RyaW5nW10gPSBbXTtcclxuICAgIHRoaXMubWF0ZXJpYWxMaXN0LmZvckVhY2goKGNoZWNrYm94KSA9PiB7XHJcbiAgICAgIGlmKGNoZWNrYm94LmNoZWNrZWQpe1xyXG4gICAgICAgIGNoZWNrZWRCb3gucHVzaChjaGVja2JveC52YWx1ZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGlmKCFjaGVja2VkQm94Lmxlbmd0aCl7IFxyXG4gICAgICByZXR1cm4gZGF0YVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGRhdGEuZmlsdGVyKChpdGVtKSA9PiBjaGVja2VkQm94LmluZGV4T2YoaXRlbS5tYXRlcmlhbCkgIT0gLTEpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJSZXNldCgpe1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QuZm9yRWFjaCgoY2hlY2tib3ggKT0+IGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZSk7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLnNsaWRlck9uZS52YWx1ZSA9ICcwJztcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIuc2xpZGVyVHdvLnZhbHVlID0gJzMwMCc7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmRpc3BsYXlWYWxPbmUudGV4dENvbnRlbnQgPSAnMCc7XHJcbiAgICB0aGlzLm5ld1ByaWNlRmlsdGVyLmRpc3BsYXlWYWxUd28udGV4dENvbnRlbnQgPSAnMzAwJztcclxuICAgIHRoaXMubmV3UHJpY2VGaWx0ZXIuZmlsbENvbG9yKCk7XHJcbiAgICB0aGlzLmNvbG9yTGlzdC5mb3JFYWNoKChjb2xvcikgPT4gY29sb3IuY2xhc3NMaXN0LnJlbW92ZShzZWxlY3RvcnMuc2VsZWN0ZWRDb2xvcikpO1xyXG4gICAgdGhpcy5zaXplTGlzdC5mb3JFYWNoKChzaXplKSA9PiBzaXplLmNoZWNrZWQgPSBmYWxzZSk7XHJcbiAgICB0aGlzLmJyYW5kTGlzdC5mb3JFYWNoKChicmFuZCkgPT4ge1xyXG4gICAgICBjb25zdCBicmFuZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JyYW5kcycpIGFzIEhUTUxPcHRpb25FbGVtZW50O1xyXG4gICAgICBicmFuZElucHV0LnZhbHVlID0gJ1NlbGVjdCBicmFuZCdcclxuICAgICAgYnJhbmQuc2VsZWN0ZWQgPSBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm1hdGVyaWFsTGlzdC5mb3JFYWNoKChtYXRlcmlhbCkgPT4gbWF0ZXJpYWwuY2hlY2tlZCA9IGZhbHNlKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjYXRlZ29yeScpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ21hdGVyaWFsJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYnJhbmQnKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzaXplJyk7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY29sb3InKTtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdtaW5QcmljZScpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ21heFByaWNlJyk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJBbGwoZGF0YTogSUNhcmRzW10pe1xyXG4gICAgbGV0IGZpbHRlckRhdGEgPSBkYXRhO1xyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuc2VhcmNoU2hvZXNOYW1lKGZpbHRlckRhdGEpO1xyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyQnlDYXRlZ29yeShmaWx0ZXJEYXRhKTsgXHJcbiAgICBmaWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJCeVByaWNlKGZpbHRlckRhdGEpO1xyXG4gICAgZmlsdGVyRGF0YSA9IHRoaXMuZmlsdGVyQnlDb2xvcihmaWx0ZXJEYXRhKTtcclxuICAgIGZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckJ5U2l6ZShmaWx0ZXJEYXRhKTtcclxuICAgIGZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckJ5QnJhbmQoZmlsdGVyRGF0YSk7XHJcbiAgICBmaWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJCeU1hdGVyaWFsKGZpbHRlckRhdGEpO1xyXG4gICAgcmV0dXJuIGZpbHRlckRhdGE7XHJcbiAgfVxyXG5cclxuICBoaWRlRmlsdGVyKCl7XHJcbiAgICBjb25zdCBidXR0b25IaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGUtZmlsdGVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBmaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBidXR0b25IaWRlLm9uY2xpY2sgPSBmdW5jdGlvbiAoKXtcclxuICAgICAgZmlsdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGVuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXIiLCJpbXBvcnQgeyBJQ2FyZHMgfSBmcm9tICcuLi9tb2RlbHMvaW5yZWZhY2VzJ1xyXG5cclxuY2xhc3MgU29ydENhcmQge1xyXG4gIHNvcnRJbnB1dCE6IEhUTUxPcHRpb25FbGVtZW50O1xyXG4gIGNvbnN0cnVjdG9yKGVsZW06c3RyaW5nKXtcclxuICAgIHRoaXMuc29ydElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtKSBhcyBIVE1MT3B0aW9uRWxlbWVudDtcclxuICAgIHRoaXMuaW5pdCgpXHJcbiAgfVxyXG5cclxuICBpbml0KCl7XHJcbiAgICBjb25zdCBjaGVja2VkU29ydCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb3J0Jyk7XHJcbiAgICBpZihjaGVja2VkU29ydCl7XHJcbiAgICAgIHRoaXMuc29ydElucHV0LnZhbHVlID0gY2hlY2tlZFNvcnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzb3J0KGRhdGE6IElDYXJkc1tdKXtcclxuICAgIHN3aXRjaCh0aGlzLnNvcnRJbnB1dC52YWx1ZSl7XHJcbiAgICAgIGNhc2UgJ3JlbGVhc2VPTic6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydEJ5RGF0ZU9sZChkYXRhKTtcclxuICAgICAgY2FzZSAncmVsZWFzZU5PJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3J0QnlEYXRlTmV3KGRhdGEpO1xyXG4gICAgICBjYXNlICdwcmljZUhMJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3J0QnlQcmljZUhpZ2h0TG93KGRhdGEpO1xyXG4gICAgICBjYXNlICdwcmljZUxIJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5zb3J0QnlQcmljZUxvd0hpZ2h0KGRhdGEpO1xyXG4gICAgICBjYXNlICdub25lJzpcclxuICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc29ydEJ5UHJpY2VIaWdodExvdyhkYXRhOiBJQ2FyZHNbXSkge1xyXG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSxiKSA9PiArYi5wcmljZSAtICthLnByaWNlKTtcclxuICB9XHJcbiAgc29ydEJ5UHJpY2VMb3dIaWdodChkYXRhOiBJQ2FyZHNbXSkge1xyXG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSxiKSA9PiArYS5wcmljZSAtICtiLnByaWNlKTtcclxuICB9XHJcbiAgc29ydEJ5RGF0ZU5ldyhkYXRhOiBJQ2FyZHNbXSkge1xyXG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSxiKSA9PiArYi5yZWxlYXNlIC0gK2EucmVsZWFzZSk7XHJcbiAgfVxyXG4gIHNvcnRCeURhdGVPbGQoZGF0YTogSUNhcmRzW10pIHtcclxuICAgIHJldHVybiBkYXRhLnNvcnQoKGEsYikgPT4gK2EucmVsZWFzZSAtICtiLnJlbGVhc2UpO1xyXG4gIH1cclxuICBzb3J0UmVzZXQoKXtcclxuICAgIHRoaXMuc29ydElucHV0LnZhbHVlID0gJ3JlbGVhc2VOTyc7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc29ydCcpO1xyXG4gIH1cclxufVxyXG4gXHJcbmV4cG9ydCBkZWZhdWx0IFNvcnRDYXJkIiwiIGV4cG9ydCBjb25zdCBzZWxlY3RvcnMgPSB7XHJcbiAgY2F0YWxvZ1Byb2R1Y3RzOiAnLnByb2R1Y3RzJyxcclxuICBzaG9lc1RlbXBsYXRlOicuc2hvZXMtY2FyZC10ZW1wbGF0ZScsXHJcbiAgc2hvZXNDYXJkSW1hZ2U6Jy5zaG9lcy1jYXJkX19pbWFnZScsXHJcbiAgc2hvZXNDYXJkTmFtZTonLnNob2VzLWNhcmRfX25hbWUnLFxyXG4gIHNob2VzQ2FyZENhdGVnb3J5Oicuc2hvZXMtY2FyZF9fY2F0ZWdvcnknLFxyXG4gIHNob2VzQ2FyZEJyYW5kOicuc2hvZXMtY2FyZF9fYnJhbmQnLFxyXG4gIHNob2VzQ2FyZE1hdGVyaWFsOicuc2hvZXMtY2FyZF9fbWF0ZXJpYWwnLFxyXG4gIHNob2VzQ2FyZFByaWNlOicuc2hvZXMtY2FyZF9fcHJpY2UnLFxyXG4gIHNob2VzQ2FyZENvbG9yOicuc2hvZXMtY2FyZF9fY29sb3JzJyxcclxuICBzaG9lc0NhcmRTdG9jazonLmJhc2tldF9fc3RvY2snLFxyXG4gIHNob2VzQ2FyZEJhc2tldEJ1dHRvbjonLmJhc2tldF9fc3RvY2stYnV0dG9uJyxcclxuICBtb2RhbFdpbmRvdzonLm1vZGFsLXdpbmRvdy1vdmVybGF5JyxcclxuICBwb3B1cEJ1dHRvbjonLnBvcHVwX19idXR0b24nLFxyXG4gIHNlYXJjaEZpZWxkOicjaW5wdXQtc2VhcmNoJyxcclxuICBjYXRlZ29yeUxpc3ROYW1lOicjY2hlY2tib3hfX2NhdGVnb3J5JyxcclxuICBjaGVja2JveExpc3Q6Jy5jdXN0b20tY2hlY2tib3gnLFxyXG4gIHByaWNlU2xpZGVyOicuc2xpZGVyJyxcclxuICBjb2xvckxpc3ROYW1lOiAnLmNvbG9ycycsXHJcbiAgY29sb3JMaXN0OiAnLmNoZWNrYm94LWNvbG9yJyxcclxuICBzaXplTGlzdE5hbWU6ICcuc2l6ZXMnLFxyXG4gIHNpemVMaXN0OicuY2hlY2tib3gtc2l6ZScsXHJcbiAgYnJhbmRMaXN0TmFtZTogJyNicmFuZHMnLFxyXG4gIG9wdGlvbjogJ29wdGlvbicsXHJcbiAgbWF0ZXJpYWxMaXN0TmFtZTogJy5tYXRlcmlhbF9fcmFkaW8tYnV0dG9ucycsXHJcbiAgcmFkaW9CdXR0b246Jy5jdXN0b20tcmFkaW8nLFxyXG4gIGNsZWFuRmlsdGVyc0J1dHRvbjonLmNsZWFyLWJ1dHRvbicsXHJcbiAgc2xpZGVyUG9pbnRSaWdodDonc2xpZGVyLTEnLFxyXG4gIHNsaWRlclBvaW50TGVmdDonc2xpZGVyLTInLFxyXG4gIHNsaWRlclZhbHVlUmlnaHQ6J3JhbmdlMScsXHJcbiAgc2xpZGVyVmFsdWVMZWZ0OidyYW5nZTInLFxyXG4gIHNsaWRlclRyYWNrOicuc2xpZGVyLXRyYWNrJyxcclxuICBzZWxlY3RlZENvbG9yOiAnY29sb3JfX2FjdGl2ZScsXHJcbiAgc2VsZWN0ZWRTaXplOiAnc2l6ZV9fYWN0aXZlJyxcclxufVxyXG4iLCJpbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2VsZWN0b3JzJ1xyXG5jbGFzcyBCYXNrZXQge1xyXG4gIGJhc2tldFN0b3JhZ2U6IFJlY29yZDxzdHJpbmcsbnVtYmVyPjtcclxuICBiYXNrZXRDb3VudGVyOiBudW1iZXI7XHJcbiAgbW9kYWxXaW5kb3c6IEhUTUxFbGVtZW50O1xyXG4gIG1vZGFsQnV0dG9uOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJhc2tldFN0b3JhZ2UgPSB7fTtcclxuICAgIHRoaXMuYmFza2V0Q291bnRlciA9IDA7XHJcbiAgICB0aGlzLm1vZGFsV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMubW9kYWxXaW5kb3cpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5tb2RhbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnBvcHVwQnV0dG9uKSBhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG59XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICAgIGNvbnN0IGJhc2tldCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYXNrZXRTdG9yYWdlJyk7XHJcbiAgICAgIGlmIChiYXNrZXQpIHtcclxuICAgICAgICAgIHRoaXMuYmFza2V0U3RvcmFnZSA9IEpTT04ucGFyc2UoYmFza2V0KTtcclxuICAgICAgICAgIHRoaXMuYmFza2V0Q291bnRlciA9IE9iamVjdC5rZXlzKHRoaXMuYmFza2V0U3RvcmFnZSkubGVuZ3RoO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kYWxXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLm1vZGFsV2luZG93KVxyXG4gICAgICAgICAgICAgIHRoaXMubW9kYWxXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5tb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kYWxXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbiAgYWRkKG5hbWU6c3RyaW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0pIHtcclxuICAgICAgICAgIHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRTdG9yYWdlW25hbWVdID0gMTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmJhc2tldENvdW50ZXIgKz0gMTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Jhc2tldFN0b3JhZ2UnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmJhc2tldFN0b3JhZ2UpKTtcclxuICB9XHJcbiAgcmVtb3ZlKG5hbWU6c3RyaW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0pIHtcclxuICAgICAgICAgIHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSAtPSAxO1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRDb3VudGVyIC09IDE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXSA8PSAwKVxyXG4gICAgICAgICAgZGVsZXRlIHRoaXMuYmFza2V0U3RvcmFnZVtuYW1lXTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Jhc2tldFN0b3JhZ2UnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmJhc2tldFN0b3JhZ2UpKTtcclxuICB9XHJcbiAgdG9nZ2xlKG5hbWU6c3RyaW5nKSB7XHJcbiAgICAgIGlmICh0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0pIHtcclxuICAgICAgICAgIGRlbGV0ZSB0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV07XHJcbiAgICAgICAgICB0aGlzLmJhc2tldENvdW50ZXIgLT0gMTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0aGlzLmJhc2tldENvdW50ZXIgPj0gMjApIHtcclxuICAgICAgICAgIHRoaXMuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmJhc2tldFN0b3JhZ2VbbmFtZV0gPSAxO1xyXG4gICAgICAgICAgdGhpcy5iYXNrZXRDb3VudGVyICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Jhc2tldFN0b3JhZ2UnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmJhc2tldFN0b3JhZ2UpKTtcclxuICB9XHJcbiAgY2xlYXIoKSB7XHJcbiAgICAgIHRoaXMuYmFza2V0U3RvcmFnZSA9IHt9O1xyXG4gICAgICB0aGlzLmJhc2tldENvdW50ZXIgPSAwO1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYmFza2V0U3RvcmFnZScpO1xyXG4gIH1cclxuICBzaG93TW9kYWwoKSB7XHJcbiAgICAgIHRoaXMubW9kYWxXaW5kb3cuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQmFza2V0IiwiaW1wb3J0IHsgSUNhcmRzIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2lucmVmYWNlcydcclxuXHJcbmV4cG9ydCBjb25zdCBjYXJkczogSUNhcmRzW10gPSBbXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgV2FmZmxlIE9uZSBTRScsXHJcbiAgICBjYXRlZ29yeTogJ0Jhc2tldGJhbGwnLFxyXG4gICAgcHJpY2U6ICc4OScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgc2l6ZTogJzQuNScsXHJcbiAgICBicmFuZDogJ05pa2UgQnkgWW91JyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8yOTA4MjExMC01ODNkLTQwMjEtOWZmMC01N2QyY2ZmMzZjOWIvd2FmZmxlLW9uZS1zZS1zaG9lcy1tVDNDUU4ucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIxJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgMScsXHJcbiAgICBjYXRlZ29yeTogJ1J1bm5pbmcnLFxyXG4gICAgcHJpY2U6ICcxMTUnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICBzaXplOiAnNy41JyxcclxuICAgIGJyYW5kOiAnSm9yZGFuJyxcclxuICAgIG1hdGVyaWFsOiAnTGVhdGhlcicsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8wNWFlYjU0Zi1jYTg2LTQ4ZDktYTYwZi01N2Q3OThlMzkzNWQvYWlyLW1heC05NS1zaG9lcy1USkxMc0IucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIxJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgMicsXHJcbiAgICBjYXRlZ29yeTogJ0pvcmRhbicsXHJcbiAgICBwcmljZTogJzEwMCcsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOid3aGl0ZScsXHJcbiAgICBzaXplOiAnNS4wJywgXHJcbiAgICBicmFuZDogJ05pa2UgU3BvcnR3ZWFyJyxcclxuICAgIG1hdGVyaWFsOiAnTGVhdGhlcicsXHJcbiAgICBpbWc6J2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8zNThiNWZmZS0wNzA0LTRjNWEtODlmZC0wZmE1YjJiMWY5OWIvYWlyLW1heC1wbHVzLWlpaS1zaG9lLTNCU0J0eC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSAzJyxcclxuICAgIGNhdGVnb3J5OiAnTGlmZXN0eWxlJyxcclxuICAgIHByaWNlOiAnMTk4JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLFxyXG4gICAgc2l6ZTogJzQuMCcsXHJcbiAgICBicmFuZDogJ05pa2VMYWInLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOidodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMzEyZTBkZjYtYTBjNi00YTVkLWJhMDEtZTgzN2IzZDhlZTQ5L2pvcmRhbi1kZWx0YS0zLXNwLXNob2VzLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAxOScsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBGb3JjZSA0JyxcclxuICAgIGNhdGVnb3J5OiAnRm9vdGJhbGwnLFxyXG4gICAgcHJpY2U6ICcxNTYnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3BpbmsnLFxyXG4gICAgc2l6ZTogJzYuMCcsXHJcbiAgICBicmFuZDogJ0pvcmRhbicsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvNDE4MGU3MjUtNDk2Ni00NjNiLThjMjItNzFlM2NhNmE5YTU1L2Fpci1qb3JkYW4tMi1yZXRyby1zcC1zaG9lcy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjInLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgNScsXHJcbiAgICBjYXRlZ29yeTogJ1RyYWluaW5nJyxcclxuICAgIHByaWNlOiAnMTc4JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICAnZ3JlZW4nLFxyXG4gICAgc2l6ZTogJzUuNScsXHJcbiAgICBicmFuZDogJ05pa2UgQnkgWW91JyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS8wZGIzMDQ0Ny1kMTk5LTQzNzMtYmYzNi02Y2JiNDM5ZTk2YzIvYWlyLW1heC10ZXJyYXNjYXBlLTkwLXNob2VzLXdkQmtLSC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgNicsXHJcbiAgICBjYXRlZ29yeTogJ1NrYXRlYm9hcmRpbmcnLFxyXG4gICAgcHJpY2U6ICcyNjAnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2dyZWVuJyxcclxuICAgIHNpemU6ICczLjUnLFxyXG4gICAgYnJhbmQ6ICdBQ0cnLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2U2YjVkZDY0LTFhMzItNDVmOC04ZjE5LThmNDIxYTFjZGQ2ZC9haXItbWF4LXRlcnJhc2NhcGUtOTAtc2hvZXMtQ1JuMFhXLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMScsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgQWlyIEZvcmNlIDcnLFxyXG4gICAgY2F0ZWdvcnk6ICdHb2xmJyxcclxuICAgIHByaWNlOiAnMjQwJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLCAgXHJcbiAgICBzaXplOiAnMy4wJyxcclxuICAgIGJyYW5kOiAnTmlrZUxhYicsXHJcbiAgICBtYXRlcmlhbDogJ0NhbnZhcycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvMjcxMzcxZjMtMGY1Yy00N2M3LWI0YjQtZjg0MGU4YjQ4OGMxL2Fpci1wZWdhc3VzLTgzLXNob2VzLWhxMjAweC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgOCcsXHJcbiAgICBjYXRlZ29yeTogJ1Rlbm5pcycsXHJcbiAgICBwcmljZTogJzIyMicsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnYmx1ZScsXHJcbiAgICBzaXplOiAnOC4wJyxcclxuICAgIGJyYW5kOiAnQUNHJyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9iMDBhNTE3MC0yMGVkLTRjZGEtOWM2OS02YzFlMGEwNDI3NmUvYWlyLWZvcmNlLTEtMDctc2hvZXMtS3ByUUNyLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMicsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIFdhZmYgU0UnLFxyXG4gICAgY2F0ZWdvcnk6ICdCYXNrZXRiYWxsJyxcclxuICAgIHByaWNlOiAnMjg5JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdibGFjaycsXHJcbiAgICBzaXplOiAnNC41JyxcclxuICAgIGJyYW5kOiAnTmlrZSBCeSBZb3UnLFxyXG4gICAgbWF0ZXJpYWw6ICdDYW52YXMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzZhZTk1OTUxLTRhYmUtNDU1Yy04OTYyLTQyY2JhZGViZmJiNy96b29tLWZyZWFrLTMtYmFza2V0YmFsbC1zaG9lcy1NWnBKWkYucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIxJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgRm9yY2UgMSAwNyBMVjgnLFxyXG4gICAgY2F0ZWdvcnk6ICdSdW5uaW5nJyxcclxuICAgIHByaWNlOiAnMTM5JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLFxyXG4gICAgc2l6ZTogJzQuNScsXHJcbiAgICBicmFuZDogJ0pvcmRhbicsXHJcbiAgICBtYXRlcmlhbDogJ0xlYXRoZXInLFxyXG4gICAgaW1nOidodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvNDUyODljYjQtMmFlNi00MTY1LWJlNmMtODgyMzdkNDJjODE5L3pvb214LXN0cmVha2ZseS1yb2FkLXJhY2luZy1zaG9lcy1adjhKYmcucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIyJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSB4IFN0w7xzc3kgQWlyIEZvcmNlIDEgMDcgTWlkJyxcclxuICAgIGNhdGVnb3J5OiAnSm9yZGFuJyxcclxuICAgIHByaWNlOiAnMTExJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6J3doaXRlJyxcclxuICAgIHNpemU6ICc4LjUnLCBcclxuICAgIGJyYW5kOiAnTmlrZSBTcG9ydHdlYXInLFxyXG4gICAgbWF0ZXJpYWw6ICdMZWF0aGVyJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2UxYzEyOTBjLTUzMTQtNDdkZC1iYTFiLTIwYWU0NzgwODk3ZS9reXJpZS1sb3ctNS1jb21tdW5pdHktamV3ZWxsLWxveWQtYmFza2V0YmFsbC1zaG9lcy16d3RrMFMucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIwJyxcclxuICAgIHN0b2NrOiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnTmlrZSBBaXIgTWF4IDk3JyxcclxuICAgIGNhdGVnb3J5OiAnTGlmZXN0eWxlJyxcclxuICAgIHByaWNlOiAnMTY3JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdyZWQnLFxyXG4gICAgc2l6ZTogJzMuNScsXHJcbiAgICBicmFuZDogJ05pa2VMYWInLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOidodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvOGEzYmFiNzktNmM5OC00YTAzLWE4YTUtMWNhNzBiYmQyMzYyL3ppb24tMi1iYXNrZXRiYWxsLXNob2VzLWtoV2Jydy5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMTknLFxyXG4gICAgc3RvY2s6IGZhbHNlXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiAnQWlyIEpvcmRhbiAxIFJldHJvIEhpZ2ggT0cnLFxyXG4gICAgY2F0ZWdvcnk6ICdGb290YmFsbCcsXHJcbiAgICBwcmljZTogJzEwMycsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncGluaycsXHJcbiAgICBzaXplOiAnNi4wJyxcclxuICAgIGJyYW5kOiAnSm9yZGFuJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS81MWZlMDkyNi1mMTQ2LTRiZGUtOWYzYy1mZWZjMGYwMTA3ZmYvaXNwYS1saW5rLXNob2VzLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMicsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBNYXggOTUgRXNzZW50aWFsJyxcclxuICAgIGNhdGVnb3J5OiAnVHJhaW5pbmcnLFxyXG4gICAgcHJpY2U6ICcxNTQnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogICdncmVlbicsXHJcbiAgICBzaXplOiAnNi41JyxcclxuICAgIGJyYW5kOiAnTmlrZSBCeSBZb3UnLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2U1OGFjNTM4LWE4MTUtNDZhZC1hMTRkLTEzMmYzZDJjYzNiYi96b29teC12YXBvcmZseS1uZXh0LTItcm9hZC1yYWNpbmctc2hvZXMtODIxUzRGLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIHggQUNSWU3CriBCbGF6ZXIgTG93JyxcclxuICAgIGNhdGVnb3J5OiAnU2thdGVib2FyZGluZycsXHJcbiAgICBwcmljZTogJzI5OScsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAnZ3JlZW4nLFxyXG4gICAgc2l6ZTogJzcuMCcsXHJcbiAgICBicmFuZDogJ0FDRycsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvZjI2MzVhYWItZGVlYi00NDNiLWE1Y2YtNTk0MTllNmU2NjNiL2Fpci1tYXgtOTUtZXNzZW50aWFsLXNob2VzLVpnZzNwbi5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjEnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBNYXggUGx1cycsXHJcbiAgICBjYXRlZ29yeTogJ0dvbGYnLFxyXG4gICAgcHJpY2U6ICcyMDEnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsICBcclxuICAgIHNpemU6ICc4LjAnLFxyXG4gICAgYnJhbmQ6ICdOaWtlTGFiJyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS81MDZhMDVjNy1lZWE0LTQ0MDUtYWYxMi1iYmEzMmJkMGU0OGMvYWlyLWpvcmRhbi0xLXJldHJvLWhpZ2gtb2ctc2hvZXMtNzl2R1dWLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgUGVnYXN1cyBUcmFpbCAzIEdPUkUtVEVYJyxcclxuICAgIGNhdGVnb3J5OiAnVGVubmlzJyxcclxuICAgIHByaWNlOiAnMjY3JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdibHVlJyxcclxuICAgIHNpemU6ICczLjAnLFxyXG4gICAgYnJhbmQ6ICdBQ0cnLFxyXG4gICAgbWF0ZXJpYWw6ICdDYW52YXMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2VlMmExZTc5LTQ2MjYtNDZjNy1iMTgxLTZmYWRiYzIzNTFhNC9zdHVzc3ktYWlyLWZvcmNlLTEtMDctbWlkLXNob2VzLWJkc2ZtSC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjInLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdLRDE1JyxcclxuICAgIGNhdGVnb3J5OiAnSm9yZGFuJyxcclxuICAgIHByaWNlOiAnMTExJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6J3doaXRlJyxcclxuICAgIHNpemU6ICc1LjUnLCBcclxuICAgIGJyYW5kOiAnTmlrZSBTcG9ydHdlYXInLFxyXG4gICAgbWF0ZXJpYWw6ICdMZWF0aGVyJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzhkNTg0ZTNlLWUyYjUtNGQxOS05ZTczLTE3NGQ1OTkwNTVlYi9haXItbWF4LXBsdXMtc2hvZXMteDM3bjMwLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMCcsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgWm9vbSBBbHBoYWZseSBOZXh0IE5hdHVyZScsXHJcbiAgICBjYXRlZ29yeTogJ0xpZmVzdHlsZScsXHJcbiAgICBwcmljZTogJzE2NycsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAncmVkJyxcclxuICAgIHNpemU6ICc2LjUnLFxyXG4gICAgYnJhbmQ6ICdOaWtlTGFiJyxcclxuICAgIG1hdGVyaWFsOiAnU3VzdGFpbmFibGUgTWF0ZXJpYWxzJyxcclxuICAgIGltZzonaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2Y0ZWE3MDE5LWI5YTUtNDM0ZC05NzUzLTk3NmNhZTY3MDQ5Yi9haXItbWF4LTk3LXNob2VzLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAxOScsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdBaXIgSm9yZGFuIDEgUmV0cm8gSGlnaCBPRycsXHJcbiAgICBjYXRlZ29yeTogJ0Zvb3RiYWxsJyxcclxuICAgIHByaWNlOiAnMTAzJyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdwaW5rJyxcclxuICAgIHNpemU6ICc2LjAnLFxyXG4gICAgYnJhbmQ6ICdKb3JkYW4nLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzE2NDE4NTNmLTUyNjUtNDY3ZC05NmRjLThhMWMxNGNlNzZjYS9rZDE1LWJhc2tldGJhbGwtc2hvZXMtMEg4cG1RLnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMicsXHJcbiAgICBzdG9jazogZmFsc2VcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlQ291cnQgWm9vbSBQcm8nLFxyXG4gICAgY2F0ZWdvcnk6ICdUcmFpbmluZycsXHJcbiAgICBwcmljZTogJzE1NCcsXHJcbiAgICBnZW5kZXI6ICdNZW5zIFNob2VzJyxcclxuICAgIGNvbG9yOiAgJ2dyZWVuJyxcclxuICAgIHNpemU6ICc2LjUnLFxyXG4gICAgYnJhbmQ6ICdOaWtlIEJ5IFlvdScsXHJcbiAgICBtYXRlcmlhbDogJ1N1c3RhaW5hYmxlIE1hdGVyaWFscycsXHJcbiAgICBpbWc6ICdodHRwczovL3N0YXRpYy5uaWtlLmNvbS9hL2ltYWdlcy9jX2xpbWl0LHdfNTkyLGZfYXV0by90X3Byb2R1Y3RfdjEvNWViNmRmMWItMjBmMS00OGE5LWI5NGEtYjliNDk0YTc5NjM2L3pvb20tYWxwaGFmbHktbmV4dC1uYXR1cmUtcm9hZC1yYWNpbmctc2hvZS0zbWs5ZzIucG5nJyxcclxuICAgIHJlbGVhc2U6ICcyMDIwJyxcclxuICAgIHN0b2NrOiBmYWxzZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ05pa2UgeCBBQ1JPTllNwq4gQmxhemVyIExvdycsXHJcbiAgICBjYXRlZ29yeTogJ1NrYXRlYm9hcmRpbmcnLFxyXG4gICAgcHJpY2U6ICcyOTknLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ2dyZWVuJyxcclxuICAgIHNpemU6ICc3LjAnLFxyXG4gICAgYnJhbmQ6ICdBQ0cnLFxyXG4gICAgbWF0ZXJpYWw6ICdTdXN0YWluYWJsZSBNYXRlcmlhbHMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxL2YyNDIzZjdhLTk1YTctNDBjNS1hMmI1LWJjM2VlYTJiZDk1My9uaWtlY291cnQtem9vbS1wcm8tY2xheS1jb3VydC10ZW5uaXMtc2hvZXMtcUpGeGM4LnBuZycsXHJcbiAgICByZWxlYXNlOiAnMjAyMScsXHJcbiAgICBzdG9jazogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJ0FpciBKb3JkYW4gMSBMb3cgRmx5RWFzZScsXHJcbiAgICBjYXRlZ29yeTogJ0dvbGYnLFxyXG4gICAgcHJpY2U6ICcyMDEnLFxyXG4gICAgZ2VuZGVyOiAnTWVucyBTaG9lcycsXHJcbiAgICBjb2xvcjogJ3JlZCcsICBcclxuICAgIHNpemU6ICc4LjAnLFxyXG4gICAgYnJhbmQ6ICdOaWtlTGFiJyxcclxuICAgIG1hdGVyaWFsOiAnQ2FudmFzJyxcclxuICAgIGltZzogJ2h0dHBzOi8vc3RhdGljLm5pa2UuY29tL2EvaW1hZ2VzL2NfbGltaXQsd181OTIsZl9hdXRvL3RfcHJvZHVjdF92MS9iM2RiM2FjYi0zYTE2LTQ3OWUtOGFlYS00OWY4ZTNhZWYwMWIvYWlyLXpvb20tZmxpZ2h0LTk1LXNob2VzLWo3TVJoei5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjAnLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICdOaWtlIEFpciBab29tIFRlbXBvIE5FWFQlJyxcclxuICAgIGNhdGVnb3J5OiAnVGVubmlzJyxcclxuICAgIHByaWNlOiAnMjY3JyxcclxuICAgIGdlbmRlcjogJ01lbnMgU2hvZXMnLFxyXG4gICAgY29sb3I6ICdibHVlJyxcclxuICAgIHNpemU6ICc4LjUnLFxyXG4gICAgYnJhbmQ6ICdBQ0cnLFxyXG4gICAgbWF0ZXJpYWw6ICdDYW52YXMnLFxyXG4gICAgaW1nOiAnaHR0cHM6Ly9zdGF0aWMubmlrZS5jb20vYS9pbWFnZXMvY19saW1pdCx3XzU5MixmX2F1dG8vdF9wcm9kdWN0X3YxLzJiMjFiNmJlLTJlMjQtNGM3Zi1hYmUzLTcwZmI0MDliZjIzMS9yZXZvbHV0aW9uLTYtbmV4dC1uYXR1cmUtcm9hZC1ydW5uaW5nLXNob2VzLUR2dFhNWC5wbmcnLFxyXG4gICAgcmVsZWFzZTogJzIwMjInLFxyXG4gICAgc3RvY2s6IHRydWVcclxuICB9XHJcbl0iLCJpbXBvcnQgeyBJQ2FyZHMgfSBmcm9tICcuLi8uLi9tb2RlbHMvaW5yZWZhY2VzJ1xyXG5pbXBvcnQgeyBzZWxlY3RvcnMgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2VsZWN0b3JzJ1xyXG5jbGFzcyBSZW5kZXJDYXJkcyB7XHJcbiAgIHByb2R1Y3RzOiBIVE1MRWxlbWVudDtcclxuIFxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLnByb2R1Y3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuY2F0YWxvZ1Byb2R1Y3RzKSBhcyBIVE1MRWxlbWVudDtcclxuICB9ICAgICAgXHJcblxyXG4gIGRyYXcoZGF0YTogSUNhcmRzW10sIGJhc2tldDpSZWNvcmQ8c3RyaW5nLG51bWJlcj4pe1xyXG4gICAgY29uc3Qgc2hvZXNJdGVtVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzVGVtcGxhdGUpIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIlNvcnJ5LCB3ZSBjb3VsZG4ndCBmaW5kIHRoZSBwYWdlIHlvdSdyZSBsb29raW5nIGZvclwiO1xyXG4gICAgICB0ZXh0LmNsYXNzTGlzdC5hZGQoJ25vdGlmeScpO1xyXG4gICAgICBmcmFnbWVudC5hcHBlbmQodGV4dCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBjYXJkQ2xvbmUgPSBzaG9lc0l0ZW1UZW1wPy5jb250ZW50LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBpbWcgPSBjYXJkQ2xvbmU/LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZEltYWdlKSBhcyBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmROYW1lID0gY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZE5hbWUpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmRDYXRlZ29yeSA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRDYXRlZ29yeSkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZEJyYW5kID0gY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZEJyYW5kKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjYXJkTWF0ZXJpYWwgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkTWF0ZXJpYWwpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmRQcmljZSA9IGNhcmRDbG9uZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zaG9lc0NhcmRQcmljZSkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgY29uc3QgY2FyZENvbG9yID0gY2FyZENsb25lLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzLnNob2VzQ2FyZENvbG9yKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICBjb25zdCBjYXJkU3RvY2sgPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkU3RvY2spIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNhcmRCYXNrZXRCdXR0b24gPSBjYXJkQ2xvbmUucXVlcnlTZWxlY3RvcihzZWxlY3RvcnMuc2hvZXNDYXJkQmFza2V0QnV0dG9uKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgICAgaW1nLnNyYyA9IGl0ZW0uaW1nO1xyXG4gICAgICAgIGNhcmROYW1lLmlubmVyVGV4dCA9IGl0ZW0ubmFtZTtcclxuICAgICAgICBjYXJkQ2F0ZWdvcnkudGV4dENvbnRlbnQgPSBpdGVtLmNhdGVnb3J5O1xyXG4gICAgICAgIGNhcmRCcmFuZC50ZXh0Q29udGVudCA9IGl0ZW0uYnJhbmQ7XHJcbiAgICAgICAgY2FyZE1hdGVyaWFsLnRleHRDb250ZW50ID0gaXRlbS5tYXRlcmlhbDtcclxuICAgICAgICBjYXJkQ29sb3IudGV4dENvbnRlbnQgPSBgJHtpdGVtLmNvbG9yfSBjb2xvcmA7XHJcbiAgICAgICAgY2FyZFByaWNlLnRleHRDb250ZW50ID0gYCQke2l0ZW0ucHJpY2V9YDtcclxuICAgICAgICBjYXJkU3RvY2sudGV4dENvbnRlbnQgPSBpdGVtLnN0b2NrID8gJ0luIHN0b2NrJyA6ICdPbiByZXF1ZXN0JztcclxuICAgICAgICBpdGVtLnN0b2NrXHJcbiAgICAgICAgICAgID8gY2FyZFN0b2NrLmNsYXNzTGlzdC5hZGQoJ3Nob2VzLWluLXN0b2NrJylcclxuICAgICAgICAgICAgOiBjYXJkU3RvY2suY2xhc3NMaXN0LmFkZCgnc2hvZXMtb3V0LW9mLXN0b2NrJyk7XHJcbiAgICAgICAgY2FyZEJhc2tldEJ1dHRvbi50ZXh0Q29udGVudCA9IGJhc2tldFtpdGVtLm5hbWVdID8gJ0luIHRoZSBiYXNrZXQnIDogJ0FkZCB0byBiYXNrZXQnO1xyXG4gICAgICAgIGJhc2tldFtpdGVtLm5hbWVdXHJcbiAgICAgICAgICAgID8gY2FyZEJhc2tldEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhZGRlZCcpXHJcbiAgICAgICAgICAgIDogY2FyZEJhc2tldEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhZGRlZCcpO1xyXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZChjYXJkQ2xvbmUpOyAgIFxyXG4gICAgICB9KTtcclxuICAgICB9XHJcbiAgICAgdGhpcy5wcm9kdWN0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICB0aGlzLnByb2R1Y3RzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlbmRlckNhcmRzOyIsImltcG9ydCB7IHNlbGVjdG9ycyB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc2VsZWN0b3JzXCI7XHJcblxyXG5jbGFzcyBTbGlkZXIge1xyXG4gIHNsaWRlck9uZTogSFRNTElucHV0RWxlbWVudDtcclxuICBzbGlkZXJUd286IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgZGlzcGxheVZhbE9uZTogSFRNTElucHV0RWxlbWVudDtcclxuICBkaXNwbGF5VmFsVHdvOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHNsaWRlclRyYWNrOiBIVE1MRWxlbWVudDtcclxuICBzbGlkZXJNYXhWYWx1ZTogc3RyaW5nO1xyXG4gIG1pbkdhcDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5zbGlkZXJPbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3RvcnMuc2xpZGVyUG9pbnRSaWdodCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuc2xpZGVyVHdvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLnNsaWRlclBvaW50TGVmdCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuZGlzcGxheVZhbE9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ycy5zbGlkZXJWYWx1ZVJpZ2h0KSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5kaXNwbGF5VmFsVHdvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JzLnNsaWRlclZhbHVlTGVmdCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuc2xpZGVyVHJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9ycy5zbGlkZXJUcmFjaykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLnNsaWRlck1heFZhbHVlID0gdGhpcy5zbGlkZXJPbmUubWF4O1xyXG4gICAgdGhpcy5taW5HYXAgPSA1O1xyXG4gICAgdGhpcy5zdGFydCgpXHJcbiAgfVxyXG4gXHJcbiAgc3RhcnQoKXtcclxuXHJcbiAgICB0aGlzLnNsaWRlck9uZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYocGFyc2VJbnQodGhpcy5zbGlkZXJUd28udmFsdWUpIC0gcGFyc2VJbnQodGhpcy5zbGlkZXJPbmUudmFsdWUpIDw9IHRoaXMubWluR2FwKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJPbmUudmFsdWUgPSBTdHJpbmcocGFyc2VJbnQodGhpcy5zbGlkZXJUd28udmFsdWUpIC0gdGhpcy5taW5HYXApO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZGlzcGxheVZhbE9uZS50ZXh0Q29udGVudCA9IHRoaXMuc2xpZGVyT25lLnZhbHVlO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWluUHJpY2UnLCB0aGlzLnNsaWRlck9uZS52YWx1ZSkgXHJcbiAgICAgIHRoaXMuZmlsbENvbG9yKCk7XHJcblxyXG4gICAgfSlcclxuICAgIHRoaXMuc2xpZGVyVHdvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZihwYXJzZUludCh0aGlzLnNsaWRlclR3by52YWx1ZSkgLSBwYXJzZUludCh0aGlzLnNsaWRlck9uZS52YWx1ZSkgPD0gdGhpcy5taW5HYXApIHtcclxuICAgICAgICB0aGlzLnNsaWRlclR3by52YWx1ZSA9IFN0cmluZyhwYXJzZUludCh0aGlzLnNsaWRlck9uZS52YWx1ZSkgKyB0aGlzLm1pbkdhcCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kaXNwbGF5VmFsVHdvLnRleHRDb250ZW50ID0gdGhpcy5zbGlkZXJUd28udmFsdWU7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtYXhQcmljZScsIHRoaXMuc2xpZGVyVHdvLnZhbHVlKSBcclxuICAgICAgdGhpcy5maWxsQ29sb3IoKTtcclxuICB9KVxyXG4gIH1cclxuXHJcbiAgZmlsbENvbG9yKCl7XHJcbiAgICBjb25zdCBwZXJzZW50MTogbnVtYmVyID0gKCt0aGlzLnNsaWRlck9uZS52YWx1ZSAvICt0aGlzLnNsaWRlck1heFZhbHVlKSAqIDEwMDtcclxuICAgIGNvbnN0IHBlcnNlbnQyOiBudW1iZXIgPSAoK3RoaXMuc2xpZGVyVHdvLnZhbHVlIC8gK3RoaXMuc2xpZGVyTWF4VmFsdWUpICogMTAwO1xyXG4gICAgdGhpcy5zbGlkZXJUcmFjay5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiKDIyNiwgMjI2LCAyMjYpICR7cGVyc2VudDF9JSwgIzMyNjRmZSAke3BlcnNlbnQxfSUsICMzMjY0ZmUgJHtwZXJzZW50Mn0lLCByZ2IoMjI2LCAyMjYsIDIyNikgJHtwZXJzZW50Mn0lKSBgXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTbGlkZXIiLCJpbXBvcnQgJy4vc3R5bGUuc2NzcydcclxuXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL2FwcC9hcHAnXHJcblxyXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XHJcbmFwcC5zdGFydCgpO1xyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==