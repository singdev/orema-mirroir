import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InformationGeneralContrat } from '../model/contrat/InformationGeneraleContrat';
import { ProfilContrat } from '../model/contrat/ProfilContrat';

@Injectable({
  providedIn: 'root'
})
export class AlimentationService {

  private FAKE_DB_KEY = 'power_key';
  
  constructor() { }
  
  allumerCompteur(): Observable<boolean>{
    localStorage.setItem(this.FAKE_DB_KEY, "on");
    return of(true);
  }
  
  eteindreCompteur(): Observable<boolean>{
    localStorage.setItem(this.FAKE_DB_KEY, "off");
    return of(true);
  }
  
  isAllumer(): Observable<boolean>{
    return of(localStorage.getItem(this.FAKE_DB_KEY) == 'on');
  }
  
  getInformations(): Observable<InformationGeneralContrat> {
    return of(new InformationGeneralContrat( {
      "NumCompteur": "A07OOO9",
      "Solde": Number(((Math.random() * 100) / 3).toFixed(1)),
      "Coordonne": "0.4055344200637102, 9.464544158114066",
    }))
  }
}
