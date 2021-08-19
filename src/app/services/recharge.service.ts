import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  async requestRecharge(montant: number, token: string): Promise<RechargeResult> {
    try {
      let meter_id: string = this.setting.getMeterId();
      if (meter_id != null && meter_id != "") {
        const sendingToken = token.replace(/ /g, "");
        console.log(sendingToken);
        const res = await this.http.post(`${SettingService.API_URL}/api/Read/Recharge?CompteurNumber=${meter_id}&Token=${sendingToken}`,
          {}, {
            headers: {
              "accept": "*/*"
            }
        }).toPromise();
        console.log(res.toString());
        return new RechargeResult(res.toString(), true);
      }
      return null;
    } catch (err) {
      console.log(err);
      if (err.status == 200) {
        console.log(err.error.text);
        return new RechargeResult(err.error.text, true);
      }
      return null;
    }
  }

  async getRecharges(): Promise<RechargeContrat> {
    try {
      let meter_id: string = this.setting.getMeterId();
      if (meter_id != null && meter_id != "") {
        const res = await this.http.get(`${SettingService.API_URL}/api/Read/Histrorique?CompteurNumber=${meter_id}`).toPromise();
        const array = [];
        res["list"].forEach(a => {
          const str = a.date.split(" ");
          const date = new Date(str[0].split("/")[2], str[0].split("/")[1]-1, str[0].split("/")[0], str[1].split(":")[0], str[1].split(":")[1], str[1].split(":")[2], 0)
          array.push({ "Solde": a.solde, "Date": date.toUTCString(), "token": a.token })
        })
        return new RechargeContrat({
          "NumCompteur": res["numCompteur"],
          "ListRecharge": array
        });
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  private fakeDatabasePersistRecharge(rechargeHistorique: RechargeHistorique) {
    let historique = JSON.parse(localStorage.getItem(this.FAKE_DB_KEY));
    historique = historique == null ? [] : historique;
    historique.push(rechargeHistorique);
    localStorage.setItem(this.FAKE_DB_KEY, JSON.stringify(historique));
  }

}
