export class User {
  id: number;
  nomproduit: string;
  image: string;
  prixU: number;
  quantite: number;
  quantiteSeuil: number;
  etat: string;
  categorie_id: number;

  constructor(
  id: number,
  nomproduit: string,
  image: string,
  prixU: number,
  quantite: number,
  quantiteSeuil: number,
  etat: string,
  categorie_id: number,
  ) {
    this.id = id;
    this.nomproduit = nomproduit;
    this.image = image;
    this.prixU = prixU;
    this.quantite = quantite;
    this.quantiteSeuil = quantiteSeuil;
    this.etat = etat;
    this.categorie_id = categorie_id;
  }
}
