import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay} from 'rxjs/operators';
import { RechargeHistorique } from '../model/recharge-historique';
import { RechargeResult } from '../model/recharge-result';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  private FAKE_DB_KEY = 'historique_recharge_key';
  
  constructor() { }
  
  requestRecharge(montant: number, token: number): Observable<RechargeResult> {
    const r = Math.floor(Math.random() * 100);
    const success = r % 2 == 0;
    const message = success ? "Token accepté" : "Token invalide";
    if(success){
      const date = new Date();
      this.fakeDatabasePersistRecharge(new RechargeHistorique(montant, token, date.toString()));
    }
    return  new Observable((observer) => {
      observer.next(new RechargeResult(message, success ));
      delay(5000);
      observer.complete();
    });
  }
  
  getRecharges(): Observable<Array<RechargeHistorique>>{
    const savedRecharge = localStorage.getItem(this.FAKE_DB_KEY);
    const recharges = JSON.parse(savedRecharge);
    return of(recharges);
  }
  
  private fakeDatabasePersistRecharge(rechargeHistorique: RechargeHistorique){
    let historique = JSON.parse(localStorage.getItem(this.FAKE_DB_KEY));
    historique = historique == null ? [] : historique;
    historique.push(rechargeHistorique);
    localStorage.setItem(this.FAKE_DB_KEY, JSON.stringify(historique)); 
  }
  
}
