import { ICards } from '../models/inrefaces';
import { selectors } from '../models/selectors'

class Filter {
  searchField: HTMLInputElement;
  categoryListName: HTMLElement;
  categoryList: NodeListOf<HTMLInputElement>;
  priceSlider: HTMLElement;
  colorListName: HTMLElement;
  colorList: NodeListOf<HTMLButtonElement>;
  sizeListName: HTMLElement;
  sizeList: NodeListOf<HTMLButtonElement>;
  brandListName: HTMLElement;
  brandList: NodeListOf<HTMLOptionElement>;
  materialListName: HTMLElement;
  materialList: NodeListOf<HTMLInputElement>;
  cleanFiltersButton: HTMLElement;
  sliderOne: HTMLInputElement;
  sliderTwo: HTMLInputElement;

  constructor (){
    this.searchField = document.querySelector(selectors.searchField) as HTMLInputElement;

    this.categoryListName = document.querySelector(selectors.categoryListName)as HTMLElement;
    this.categoryList = this.categoryListName.querySelectorAll(selectors.checkboxList);
    this.priceSlider = document.querySelector(selectors.priceSlider)as HTMLElement;
    this.sliderOne = document.getElementById(selectors.sliderPointRight) as HTMLInputElement;
    this.sliderTwo = document.getElementById(selectors.sliderPointLeft) as HTMLInputElement;
    this.colorListName = document.querySelector(selectors.colorListName)as HTMLElement;
    this.colorList = this.colorListName.querySelectorAll(selectors.colorList);
    this.sizeListName = document.querySelector(selectors.sizeListName)as HTMLElement;
    this.sizeList = this.sizeListName.querySelectorAll(selectors.sizeList);
    this.brandListName = document.querySelector(selectors.brandListName)as HTMLElement;
    this.brandList = this.brandListName.querySelectorAll(selectors.option);
    this.materialListName = document.querySelector(selectors.materialListName)as HTMLElement;
    this.materialList = this.materialListName.querySelectorAll(selectors.radioButton);
    this.cleanFiltersButton = document.querySelector(selectors.cleanFiltersButton)as HTMLElement;
    this.init()
  }

  init() {
    const checkedCategoryOption = JSON.parse(localStorage.getItem('category')!);
    const checkedColorOption = JSON.parse(localStorage.getItem('color')!);
    const checkedSizeOption = JSON.parse(localStorage.getItem('size')!);
    const checkedBrandOption = JSON.parse(localStorage.getItem('brand')!);
    const checkedMaterialOption = JSON.parse(localStorage.getItem('material')!);

    if (checkedCategoryOption) {
        this.categoryList.forEach((chbox, idx) => {
            chbox.checked = checkedCategoryOption[idx];
        });
    }
    
    if(checkedColorOption){
      this.colorList.forEach((color) => {
        for(let i =0; i< checkedColorOption.length; i++){
          if(color.name == checkedColorOption[i]){
            color.classList.add(selectors.selectedColor)
          }
        }
    });
    }
    if(checkedSizeOption){
      this.sizeList.forEach((size) => {
        for(let i =0; i< checkedSizeOption.length; i++){
          if(size.textContent == checkedSizeOption[i]){
            size.classList.add(selectors.selectedSize)
          }
        }
    });
    }
    if(checkedBrandOption){
      this.brandList.forEach((chbox, idx) => {
        chbox.selected = checkedCategoryOption[idx];
    });
    }
    if(checkedMaterialOption){
      this.materialList.forEach((chbox, idx) => {
        chbox.checked = checkedCategoryOption[idx];
    });
    }

    const minValue = JSON.parse(localStorage.getItem('minPrice')!);
    const maxValue = JSON.parse(localStorage.getItem('maxPrice')!);
    this.sliderOne.value = minValue;
    this.sliderTwo.value = maxValue;
  }

  searchShoesName(data: ICards[]){
    if(!this.searchField.value){
      return data
    }
    return data.filter((item) => item.name.toLowerCase().indexOf(this.searchField.value.toLowerCase()) != -1)
  }

  filterByCategory(data: ICards[]){
    const checkedBox:string[] = [];
    this.categoryList.forEach((checkbox) => {
      if(checkbox.checked){
        checkedBox.push(checkbox.name)
      }
    })
    if(!checkedBox.length){ 
      return data
    } else {
      return data.filter((item) => checkedBox.indexOf(item.category) != -1)
    }
  }

  filterByPrice(data: ICards[]){
    if(+this.sliderOne.value == 0 && +this.sliderTwo.value == 300){
      return data
    } else {
      return data.filter((item) => +item.price >= +this.sliderOne && +item.price <= +this.sliderTwo.value)
    }
  }

  filterByColor(data: ICards[]){
    const checkedColor:string[] = [];
    this.colorList.forEach((color) => {
      if(color.classList.contains(selectors.selectedColor)){
        checkedColor.push(color.name)
      }
    })
    if(!checkedColor.length){ 
      return data
    } else {
      return data.filter((item) => {
        for(let i = 0; item.color.length; i++)
        checkedColor.indexOf(item.color[i]) != -1
      })
    }
  }

  filterBySize(data: ICards[]){
    const checkedSize:string[] = [];
    this.sizeList.forEach((size) => {
      if(size.classList.contains(selectors.selectedSize)){
        checkedSize.push(size.name)
      }
    })
    if(!checkedSize.length){ 
      return data
    } else {
      return data.filter((item) => {
        for(let i = 0; item.size.length; i++)
        checkedSize.indexOf(item.size[i]) != -1
      })
    }
  }

  filterByBrand(data: ICards[]){
    const checkedBrand:string[] = [];
    this.brandList.forEach((brand) => {
      if(brand.selected){
        checkedBrand.push(brand.value)
      }
    })
    if(!checkedBrand.length){ 
      return data
    } else {
      return data.filter((item) => checkedBrand.indexOf(item.brand) != -1)
    }
  }

  filterByMaterial(data: ICards[]){
    const checkedBox:string[] = [];
    this.materialList.forEach((checkbox) => {
      if(checkbox.checked){
        checkedBox.push(checkbox.value)
      }
    })
    if(!checkedBox.length){ 
      return data
    } else {
      return data.filter((item) => checkedBox.indexOf(item.material) != -1)
    }
  }

  filterReset(){
    this.categoryList.forEach((checkbox => checkbox.checked = false));
    this.sliderOne.value = '0';
    this.sliderTwo.value = '300';
    this.colorList.forEach((color) => color.classList.remove(selectors.selectedColor));
    this.sizeList.forEach((size) => size.classList.remove(selectors.selectedSize));
    this.brandList.forEach((brand) => brand.selected = false);
    this.materialList.forEach((brand) => brand.checked = false);
  }

  filterAll(data: ICards[]){
    let filterData = data;
    filterData = this.filterByCategory(filterData);
    filterData = this.filterByPrice(filterData);
    filterData = this.filterByColor(filterData);
    filterData = this.filterBySize(filterData);
    filterData = this.filterByBrand(filterData);
    filterData = this.filterByMaterial(filterData);
    return filterData;
  }
}

export default Filter