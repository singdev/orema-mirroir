export class ProfilContrat {

  NumCompteur: String;
  NomUser: String;
  PrenomUser: string;
  Role: string;
  GSM: string; Email: string;

  constructor(jsonParsed) {
    this.NumCompteur = jsonParsed.NumCompteur;
    this.NomUser = jsonParsed.NomUser;
    this.PrenomUser = jsonParsed.PrenomUser;
    this.Role = jsonParsed.Role;
    this.GSM = jsonParsed.GSM;
    this.Email = jsonParsed.Email;
  }
}