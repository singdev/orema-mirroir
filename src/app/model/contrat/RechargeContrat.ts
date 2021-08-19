import { RechargeTimeStampContrat } from "./RechargeTimeStampContrat";

export class RechargeContrat {

  NumCompteur: string;
  ListRecharge: Array<RechargeTimeStampContrat>;

  constructor(jsonParsed) {
    this.NumCompteur = jsonParsed.NumCompteur;
    this.ListRecharge = [];
    for (let i = 0; i < jsonParsed.ListRecharge.length; i++) {
      this.ListRecharge.push(
        new RechargeTimeStampContrat(jsonParsed.ListRecharge[i], jsonParsed.NumCompteur));
    }
  }
}