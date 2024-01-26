export class User {
  id: number;
  nom: string;
  image: string;
  prixU: number;
  quantiteSeuil: number;
  etat: string;
  categorie_id: number;

  constructor(
  id: number,
  nom: string,
  image: string,
  prixU: number,
  quantiteSeuil: number,
  etat: string,
  categorie_id: number,
  ) {
    this.id = id;
    this.nom = nom;
    this.image = image;
    this.prixU = prixU;
    this.quantiteSeuil = quantiteSeuil;
    this.etat = etat;
    this.categorie_id = categorie_id;
  }
}
