export class RechargeHistorique {
  montant: number;
  token: number;
  date: Date;
  
  constructor(montant, token, date) {
    this.montant = montant;
    this.token = token;
    this.date = new Date(date);
  }
  
}