import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RechargeContrat } from '../model/contrat/RechargeContrat';
import { RechargeHistorique } from '../model/recharge-historique';
import { RechargeResult } from '../model/recharge-result';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  private FAKE_DB_KEY = 'historique_recharge_key';

  constructor() { }

  requestRecharge(montant: number, token: number): Observable<RechargeResult> {
    if (isNaN(montant) || montant < 2000) {
      return of(new RechargeResult("Montant insuffisant (Minimum 2000 FCFA)", false));
    }
    if (isNaN(token) || token.toString().length != 20) {
      return of(new RechargeResult("Format du token invalide (20 chiffres)", false));
    }
    const r = Math.floor(Math.random() * 100);
    const success = r % 2 == 0;
    const message = success ? "Token accepté" : "Token invalide";
    if (success) {
      const date = new Date();
      this.fakeDatabasePersistRecharge(new RechargeHistorique(montant, token, date.toString()));
    }
    return new Observable((observer) => {
      observer.next(new RechargeResult(message, success));
      delay(5000);
      observer.complete();
    });
  }

  getRecharges(): Observable<RechargeContrat> {
    return of(new RechargeContrat({
      "NumCompteur": "A07OOO9",
      "ListRecharge": [
        {
          "Solde": "5000F",
          "Date": "2021-04-23T18:25:43.511Z",
          "token": "12345678901234567890"
        },
        {
          "Solde": "10000F",
          "Date": "2021-04-30T18:25:43.511Z",
          "token": "12345678901234567890"
        },
        {
          "Solde": "15000F",
          "Date": "2021-05-23T18:25:43.511Z",
          "token": "12345678901234567890"
        },
        {
          "Solde": "20000F",
          "Date": "2021-05-26T18:25:43.511Z",
          "token": "12345678901234567890"
        }
      ]
    }));
  }

  private fakeDatabasePersistRecharge(rechargeHistorique: RechargeHistorique) {
    let historique = JSON.parse(localStorage.getItem(this.FAKE_DB_KEY));
    historique = historique == null ? [] : historique;
    historique.push(rechargeHistorique);
    localStorage.setItem(this.FAKE_DB_KEY, JSON.stringify(historique));
  }

}
