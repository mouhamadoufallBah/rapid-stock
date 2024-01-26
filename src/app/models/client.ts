export class User {
  id: number;
  nom: string;
  prenom: string;
  code_client: string;
  telephone: string;
  adresse: string;

  constructor(
    nom: string,
    prenom: string,
    code_client: string,
    telephone: string,
    adresse: string
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.code_client = code_client;
    this.telephone = telephone;
    this.adresse = adresse;
  }
}
