export class RechargeTimeStampContrat {
  
  NumCompteur: string;
  Solde: number;
  Date: Date;
  token: String;
  
  constructor(jsonParsed, NumCompteur: string){
    this.NumCompteur = NumCompteur;
    this.Solde = Number.parseInt(jsonParsed.Solde.split("F")[0]);
    this.Date = jsonParsed.Date;
    this.token = jsonParsed.token;
  }
}