import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { InformationGeneralContrat } from '../model/contrat/InformationGeneraleContrat';
import { Localization } from '../model/localization';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {

  constructor(private http: HttpClient, private setting: SettingService) { }
  
  async getCompteurGeolocalisation(): Promise<Localization>{
    let loop = true;
    let count = 0;
    let meter_id: string =  this.setting.getMeterId();
    while(loop && meter_id != null && meter_id != ""){
      try {
        const puissance = await this.http.post(`${SettingService.API_URL}/api/Read/Puissance?CompteurNumber=${meter_id}`, {}).toPromise();
        const localisation = await this.http.post(`${SettingService.API_URL}/api/Read/localisation?CompteurNumber=${meter_id}`, {}).toPromise();
        const informationGenerales =  new InformationGeneralContrat( {
          "NumCompteur": meter_id,
          "Solde": Number.parseFloat(puissance.toString()) / 10.0,
          "Coordonne": localisation["coordonnes"],
        });
        return new Localization(informationGenerales.Latitude, informationGenerales.Longitude);
      } catch(err){
        console.log(err);
        count++;
        if(count >= 3){
          loop = false;
        }
      }
    }
    return null;
  }
}
