export class ConsommationTimeStampContrat {
  
  NumCompteur: string;
  Unite: number;
  Date: Date;
  
  constructor(jsonParsed, NumCompteur: string){
    this.NumCompteur = NumCompteur;
    this.Unite = Number.parseInt(jsonParsed.Unite);
    this.Date = jsonParsed.Date;
  }
}