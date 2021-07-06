export class InformationGeneralContrat {
  
  NumCompteur: string;
  Solde: number;
  Latitude: number;
  Longitude: number;
  
  constructor(jsonParsed){
    this.NumCompteur = jsonParsed.NumCompteur;
    this.Solde = jsonParsed.Solde;
    let coords = jsonParsed.Coordonne.split(","); 
    this.Latitude = Number.parseFloat(coords[0]);
    this.Longitude = Number.parseFloat(coords[1]);
  }
}