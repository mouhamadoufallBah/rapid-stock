import { ProduitIdToProduitNamePipe } from './produit-id-to-produit-name.pipe';

describe('ProduitIdToProduitNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ProduitIdToProduitNamePipe();
    expect(pipe).toBeTruthy();
  });
});
