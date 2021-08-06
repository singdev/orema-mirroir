import { HttpClient } from '@angular/common/http';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
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
    let meter_id: string =  this.setting.getMeterId();
    if(meter_id == null || meter_id == ""){
      return null;
    }
    let puissance: Object = "0";
    let localisation: Object = { coordonnes: "0.00000,0.000000" };
    let cache = this.setting.getGeoloc();
    if(cache != "" && cache != null){
      localisation = cache;
    }
    try {
      localisation = await this.http.post(`${SettingService.API_URL}/api/Read/localisation?CompteurNumber=${meter_id}`, {}).toPromise();
      this.setting.persistGeoloc(localisation["coordonnes"]);
    } catch(err){ console.log(err); }   
    const informationGenerales = new InformationGeneralContrat( {
      "NumCompteur": meter_id,
      "Solde": Number.parseFloat(puissance.toString()) / 10.0,
      "Coordonne": localisation["coordonnes"],
    });
    return new Localization(informationGenerales.Latitude, informationGenerales.Longitude);
  }
}
