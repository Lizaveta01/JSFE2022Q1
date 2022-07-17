/* eslint-disable @typescript-eslint/no-var-requires */



describe('Basket: add', () => {
  const Basket = require('./basket');
  const testBasket = new Basket();

  test('Check count of items in basket', () => {
    testBasket.basketStorage = { nike:1 };
    expect(testBasket.add('nike')).toEqual(2);
  });

});