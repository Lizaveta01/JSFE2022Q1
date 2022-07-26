/* eslint-disable @typescript-eslint/no-var-requires */
import Basket from './basket';
describe('Basket: add', () => {
  
  const testBasket = new Basket();

  test('Check count of items in basket', () => {
    testBasket.basketStorage = { nike: 1 };
    expect(testBasket.add('nike')).toEqual(2);

  });

});
