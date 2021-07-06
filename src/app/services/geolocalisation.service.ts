import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { InformationGeneralContrat } from '../model/contrat/InformationGeneraleContrat';
import { Localization } from '../model/localization';

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {

  constructor() { }
  
  getCompteurGeolocalisation(): Observable<Localization>{
    let informationGenerales = new InformationGeneralContrat({
      "NumCompteur": "A07OOO9",
      "Solde": Number(((Math.random() * 100) / 3).toFixed(1)),
      "Coordonne": "0.4055344200637102, 9.464544158114066",
    });
    return of(new Localization(informationGenerales.Latitude, informationGenerales.Longitude));
  }
}
