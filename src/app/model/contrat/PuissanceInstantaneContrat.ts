export class PuissanceInstantanneeContrat {

  NumCompteur: string;
  Puissance: number;

  constructor(jsonParsed) {
    this.NumCompteur = jsonParsed.NumCompteur;
    this.Puissance = jsonParsed.Puissance;
  }
}