import { ProduitIdToProduitPricePipe } from './produit-id-to-produit-price.pipe';

describe('ProduitIdToProduitPricePipe', () => {
  it('create an instance', () => {
    const pipe = new ProduitIdToProduitPricePipe();
    expect(pipe).toBeTruthy();
  });
});
