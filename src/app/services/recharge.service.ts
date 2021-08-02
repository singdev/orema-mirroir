import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RechargeContrat } from '../model/contrat/RechargeContrat';
import { RechargeHistorique } from '../model/recharge-historique';
import { RechargeResult } from '../model/recharge-result';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  private FAKE_DB_KEY = 'historique_recharge_key';

  constructor(private http: HttpClient, private setting: SettingService) { }

  async requestRecharge(montant: number, token: number): Promise<RechargeResult> {
    try {
      let meter_id: string =  this.setting.getMeterId();
      const res = await this.http.post(`${SettingService.API_URL}/api/Read/Recharge?CompteurNumber=${meter_id}&Token=${token}`, {}).toPromise();
      console.log(res);
      return new RechargeResult(res.toString(), true);
    } catch(err){
      console.log(err);
      return null;
    }
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
