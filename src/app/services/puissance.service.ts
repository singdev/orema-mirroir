import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PuissanceInstantanneeContrat } from '../model/contrat/PuissanceInstantaneContrat';

@Injectable({
  providedIn: 'root'
})
export class PuissanceService {

  private FAKE_DB_KEY = 'puissance_recharge_key';
  
  constructor() { }
  
  updatePuissance(newPuissance: number, token: number): Observable<boolean> {
    const r = Math.floor(Math.random() * 100);
    const success = r % 2 == 0;
    if(success){
      localStorage.setItem(this.FAKE_DB_KEY, newPuissance.toString());
    }
    return of(success);
  }
  
  getPuissance(): Observable<number>{
    let puissanceContrat = new PuissanceInstantanneeContrat(  {
      "NumCompteur": "A07OOO9",
      "Puissance": "6",
    });
    let puissance = Number.parseInt(localStorage.getItem(this.FAKE_DB_KEY));
    if(isNaN(puissance)){
      puissance = 3;
    }
    return of(puissance);
  }
}
