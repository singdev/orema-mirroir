import { ConsommationTimeStampContrat } from "./ConsommationTimeStampContrat";

export class ConsommationContrat {

  NumCompteur: string;
  ListRecharge: Array<ConsommationTimeStampContrat>;

  constructor(jsonParsed) {
    this.NumCompteur = jsonParsed.NumCompteur;
    this.ListRecharge = [];
    for (let i = 0; i < jsonParsed.ListRecharge.length; i++) {
      this.ListRecharge.push(
        new ConsommationTimeStampContrat(jsonParsed.ListRecharge[i], jsonParsed.NumCompteur));
    }
  }
}