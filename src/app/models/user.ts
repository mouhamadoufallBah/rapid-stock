export class User {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password: string;
  etat: string;
  adresse: string;
  role_id: number;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    telephone: string,
    email: string,
    password: string,
    etat: string,
    adresse: string,
    role_id: number
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.telephone = telephone;
    this.email = email;
    this.password = password;
    this.etat = etat;
    this.adresse = adresse;
    this.role_id = role_id;
  }
}
