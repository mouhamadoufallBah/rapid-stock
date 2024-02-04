import { ProduitIdToProduitInfoPipe } from './produit-id-to-produit-info.pipe';

describe('ProduitIdToProduitInfoPipe', () => {
  it('create an instance', () => {
    const pipe = new ProduitIdToProduitInfoPipe();
    expect(pipe).toBeTruthy();
  });
});
