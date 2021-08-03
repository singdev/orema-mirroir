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
    let loop = true;
    let count = 0;
    let meter_id: string =  this.setting.getMeterId();
    while(loop && meter_id != null && meter_id != "") {
      try {
        const puissance = await this.http.post(`${SettingService.API_URL}/api/Read/Puissance?CompteurNumber=${meter_id}`, {}).toPromise();
        const localisation = await this.http.post(`${SettingService.API_URL}/api/Read/localisation?CompteurNumber=${meter_id}`, {}).toPromise();
        loop = false;
        return new InformationGeneralContrat( {
          "NumCompteur": meter_id,
          "Solde": Number.parseFloat(puissance.toString()) / 10.0,
          "Coordonne": localisation["coordonnes"],
        }); 
      } catch(err){
        console.log(err);
        count++;
        if(count >= 2){
          loop = false;
        }
      }
    }
    return null;
  }
}
