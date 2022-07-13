import { ICards } from '../assets/models/inrefaces'

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
  cardBasket: HTMLElement;

  constructor(){
    this.shoesItemTemp = document.querySelector('.shoes-card-template') as HTMLTemplateElement;
    this.fragment = document.createDocumentFragment();
    this.cardClone = this.shoesItemTemp?.content.cloneNode(true) as HTMLElement;
    this.img = this.cardClone?.querySelector('.shop-card__image') as HTMLImageElement;
    this.cardName = this.cardClone.querySelector('.shoes-card__name') as HTMLElement;
    this.cardCategory =this.cardClone.querySelector('.shoes-card__category') as HTMLElement;
    this.cardBrand =this.cardClone.querySelector('.shoes-card__brand') as HTMLElement;
    this.cardMaterial = this.cardClone.querySelector('.shoes-card__material') as HTMLElement;
    this.cardPrice = this.cardClone.querySelector('.shop-card__price') as HTMLElement;
    this.cardColor = this.cardClone.querySelector('.shoes-card__material') as HTMLElement;
    this.cardStock = this.cardClone.querySelector('.basket__stock') as HTMLElement;
    this.cardBasket = this.cardClone.querySelector('.basket__stoke-button') as HTMLElement;
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
        this.cardStock.textContent = item.stock ? 'In stoke' : 'On request';
        item.stock
            ? this.cardStock.classList.add('shoes-in-stock')
            : this.cardStock.classList.add('shoes-out-of-stock');
        this.cardBasket.textContent = cart[item.name] ? 'In the basket' : 'Add to basket';
        cart[item.name]
            ? this.cardBasket.classList.add('added')
            : this.cardBasket.classList.remove('added');
        this.fragment.append(cardClone);   
      })
     }
  }
}

export default RenderCards;