import { ICards } from '../models/inrefaces';
import { selectors } from '../models/selectors';
import Slider from '../view/slider/slider';

class Filter {
  searchField: HTMLInputElement;
  categoryListName: HTMLElement;
  categoryList: NodeListOf<HTMLInputElement>;
  priceSlider: HTMLElement;
  colorListName: HTMLElement;
  colorList: NodeListOf<HTMLInputElement>;
  sizeListName: HTMLElement;
  sizeList: NodeListOf<HTMLInputElement>;
  brandListName: HTMLElement;
  brandList: NodeListOf<HTMLInputElement>;
  materialListName: HTMLElement;
  materialList: NodeListOf<HTMLInputElement>;
  cleanFiltersButton: HTMLElement;
  sliderOne: HTMLInputElement;
  sliderTwo: HTMLInputElement;
  newPriceFilter: Slider;

  constructor() {
    this.searchField = document.querySelector(selectors.searchField) as HTMLInputElement;
    this.categoryListName = document.querySelector(selectors.categoryListName) as HTMLElement;
    this.categoryList = this.categoryListName.querySelectorAll(selectors.checkboxList);
    this.priceSlider = document.querySelector(selectors.priceSlider) as HTMLElement;
    this.sliderOne = document.getElementById(selectors.sliderPointRight) as HTMLInputElement;
    this.sliderTwo = document.getElementById(selectors.sliderPointLeft) as HTMLInputElement;
    this.colorListName = document.querySelector(selectors.colorListName) as HTMLElement;
    this.colorList = this.colorListName.querySelectorAll(selectors.colorList);
    this.sizeListName = document.querySelector(selectors.sizeListName) as HTMLElement;
    this.sizeList = this.sizeListName.querySelectorAll(selectors.sizeList);
    this.brandListName = document.querySelector(selectors.brandListName) as HTMLElement;
    this.brandList = this.brandListName.querySelectorAll(selectors.brandList);
    this.materialListName = document.querySelector(selectors.materialListName) as HTMLElement;
    this.materialList = this.materialListName.querySelectorAll(selectors.radioButton);
    this.cleanFiltersButton = document.querySelector(selectors.cleanFiltersButton) as HTMLElement;
    this.newPriceFilter = new Slider();
    this.init();
  }

  init() {
    this.hideFilter();
    const checkedCategoryOption: boolean[] = JSON.parse(localStorage.getItem('category')!);
    const checkedColorOption: boolean[] = JSON.parse(localStorage.getItem('color')!);
    const checkedSizeOption: boolean[] = JSON.parse(localStorage.getItem('size')!);
    const checkedBrandOption: boolean[] = JSON.parse(localStorage.getItem('brand')!);
    const checkedMaterialOption: boolean[] = JSON.parse(localStorage.getItem('material')!);

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
        chbox.checked= checkedBrandOption[idx];
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
      minValue = localStorage.getItem('minPrice')!;
    }
    if (localStorage.getItem('maxPrice')) {
      maxValue = localStorage.getItem('maxPrice')!;
    }
    this.sliderOne.value = minValue;
    this.sliderTwo.value = maxValue;
    this.newPriceFilter.displayValOne.textContent = minValue;
    this.newPriceFilter.displayValTwo.textContent = maxValue;
    this.newPriceFilter.fillColor();
  }

  searchShoesName(data: ICards[]) {
    if (!this.searchField.value) {
      return data;
    }
    return data.filter((item) => item.name.toLowerCase().indexOf(this.searchField.value.toLowerCase()) != -1);
  }

  filterByCategory(data: ICards[]) {
    const checkedBox:string[] = [];
    this.categoryList.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedBox.push(checkbox.name);
      }
    });
    if (!checkedBox.length) { 
      return data;
    } else {
      return data.filter((item) => checkedBox.indexOf(item.category) != -1);
    }
  }

  filterByPrice(data: ICards[]) {
    if (+this.sliderOne.value == 0 && +this.sliderTwo.value == 300) {
      return data;
    } else {
      return data.filter((item) => +item.price >= +this.sliderOne.value && +item.price <= +this.sliderTwo.value);
    }
  }

  filterByColor(data: ICards[]) {
    const checkedBox:string[] = [];
    this.colorList.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedBox.push(checkbox.name);
      }
    });
    if (!checkedBox.length) { 
      return data;
    } else {
      return data.filter((item) => checkedBox.indexOf(item.color) != -1);
    }
  }

  filterBySize(data: ICards[]) {
    const checkedSize:string[] = [];
    this.sizeList.forEach((size) => {
      if (size.checked) {
        checkedSize.push(size.name);
      }
    });
    if (!checkedSize.length) { 
      return data;
    } else {
      return data.filter((item) => checkedSize.indexOf(item.size) != -1);
    }
  }

  filterByBrand(data: ICards[]) {
    const checkedBrand:string[] = [];
    this.brandList.forEach((brand) => {
      if (brand.checked) {
        checkedBrand.push(brand.name);
      }
    });
    if (!checkedBrand.length) { 
      return data;
    } else {
      return data.filter((item) => checkedBrand.indexOf(item.brand) != -1);
    }
  }

  filterByMaterial(data: ICards[]) {
    const checkedBox:string[] = [];
    this.materialList.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedBox.push(checkbox.value);
      }
    });
    if (!checkedBox.length) { 
      return data;
    } else {
      return data.filter((item) => checkedBox.indexOf(item.material) != -1);
    }
  }

  filterReset() {
    this.categoryList.forEach((checkbox)=> checkbox.checked = false);
    this.newPriceFilter.sliderOne.value = '0';
    this.newPriceFilter.sliderTwo.value = '300';
    this.newPriceFilter.displayValOne.textContent = '0';
    this.newPriceFilter.displayValTwo.textContent = '300';
    this.newPriceFilter.fillColor();
    this.colorList.forEach((checkbox)=> checkbox.checked = false);
    this.sizeList.forEach((size) => size.checked = false);
    this.brandList.forEach((brand) => brand.checked = false);
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

  filterAll(data: ICards[]) {
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
    const buttonHide = document.querySelector('#hide-filter') as HTMLElement;
    const filter = document.querySelector('.filter') as HTMLElement;
    buttonHide.onclick = function () {
      filter.classList.toggle('hiden');
    };
  }
}

export default Filter;