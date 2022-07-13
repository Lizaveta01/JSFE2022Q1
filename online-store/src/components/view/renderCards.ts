import { ICards } from '../models/inrefaces'
import { selectors } from '../models/selectors'
class RenderCards {
  shoesItemTemp: HTMLTemplateElement;
  fragment:DocumentFragment;
  cardClone: HTMLElement;
  img: HTMLImageElement;
  cardName: HTMLElement;
  cardCategory: HTMLElement;
  cardBrand: HTMLElement ;
  cardMaterial: HTMLElement;
  cardPrice: HTMLElement;
  cardColor: HTMLElement;
  cardStock: HTMLElement;
  cardBasketButton: HTMLElement;

  constructor(){
    this.shoesItemTemp = document.querySelector(selectors.shoesTemplate) as HTMLTemplateElement;
    this.fragment = document.createDocumentFragment();
    this.cardClone = this.shoesItemTemp?.content.cloneNode(true) as HTMLElement;
    this.img = this.cardClone?.querySelector(selectors.shoesCardImage) as HTMLImageElement;
    this.cardName = this.cardClone.querySelector(selectors.shoesCardName) as HTMLElement;
    this.cardCategory =this.cardClone.querySelector(selectors.shoesCardName) as HTMLElement;
    this.cardBrand =this.cardClone.querySelector(selectors.shoesCardBrand) as HTMLElement;
    this.cardMaterial = this.cardClone.querySelector(selectors.shoesCardMaterial) as HTMLElement;
    this.cardPrice = this.cardClone.querySelector(selectors.shoesCardPrice) as HTMLElement;
    this.cardColor = this.cardClone.querySelector(selectors.shoesCardColor) as HTMLElement;
    this.cardStock = this.cardClone.querySelector(selectors.shoesCardStock) as HTMLElement;
    this.cardBasketButton = this.cardClone.querySelector(selectors.shoesCardBasketButton) as HTMLElement;
}      

  draw(data: ICards[], cart:Record<string,number>){
    if (!data.length) {
      const text = document.createElement('p');
      text.textContent = "Sorry, we couldn't find the page you're looking for";
      text.classList.add('notify');
      this.fragment.append(text);
    } else {
      data.forEach((item) => {
        const cardClone = this.shoesItemTemp?.content.cloneNode(true) as HTMLElement; 
        this.img.src = `../assets/products/${item.img}.jpg`;
        this.cardName.textContent = item.name;
        this.cardCategory.textContent = item.category;
        this.cardBrand.textContent = item.brand;
        this.cardMaterial.textContent = item.material;
        this.cardColor.textContent = `${item.color.length} color`
        this.cardPrice.textContent = `$${item.price}`;
        this.cardStock.textContent = item.stock ? 'In stock' : 'On request';
        item.stock
            ? this.cardStock.classList.add('shoes-in-stock')
            : this.cardStock.classList.add('shoes-out-of-stock');
        this. cardBasketButton.textContent = cart[item.name] ? 'In the basket' : 'Add to basket';
        cart[item.name]
            ? this. cardBasketButton.classList.add('added')
            : this. cardBasketButton.classList.remove('added');
        this.fragment.append(cardClone);   
      })
     }
  }
}

export default RenderCards;