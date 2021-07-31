import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  
  static API_URL = "https://api-orema.dev.addinn.com";
  
  METER_ID_KEY: string = "meter_id_key";
  
  constructor() { }
  
  persistMeterId(meter_id: string){
    localStorage.setItem(this.METER_ID_KEY, meter_id);
  }
  
  getMeterId(){
    return localStorage.getItem(this.METER_ID_KEY);
  }
  
  removeMeterId(){
    localStorage.removeItem(this.METER_ID_KEY);
  }
}
