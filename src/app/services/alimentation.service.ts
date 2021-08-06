import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InformationGeneralContrat } from '../model/contrat/InformationGeneraleContrat';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class AlimentationService {

  private FAKE_DB_KEY = 'power_key';
  
  constructor(private http: HttpClient, private setting: SettingService) { }
  
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
  
  async getInformations(): Promise<InformationGeneralContrat> {
    let meter_id: string =  this.setting.getMeterId();
    let puissance: Object = this.setting.getPuissance();
    let localisation: Object = { coordonnes: "0.00000,0.000000" };
    try {
      puissance = await this.http.post(`${SettingService.API_URL}/api/Read/Puissance?CompteurNumber=${meter_id}`, {}).toPromise();
      console.log(puissance);
      this.setting.persistPuissance(Number.parseFloat(puissance.toString()));
    } catch(err) {
      console.log(err);
    }
    return new InformationGeneralContrat( {
      "NumCompteur": meter_id,
      "Solde": Number.parseFloat(puissance.toString()) / 10.0,
      "Coordonne": localisation["coordonnes"],
    });
  }
}
