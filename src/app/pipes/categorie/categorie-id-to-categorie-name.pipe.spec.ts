import { CategorieIdToCategorieNamePipe } from './categorie-id-to-categorie-name.pipe';

describe('CategorieIdToCategorieNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CategorieIdToCategorieNamePipe();
    expect(pipe).toBeTruthy();
  });
});
