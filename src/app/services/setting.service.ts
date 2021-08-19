import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  
  static API_URL = "https://api-orema.dev.addinn.com";

  METER_ID_KEY: string = "meter_id_key";
  PUISSANCE_CACHE = "puissance_cache_key";
  GEOLOCATION_CACHE = "geolocation_cache_key";
  
  constructor() { }
  
  /**
   * Meter ID 
   */
  
  persistMeterId(meter_id: string){
    localStorage.setItem(this.METER_ID_KEY, meter_id);
  }
  
  getMeterId(){
    return localStorage.getItem(this.METER_ID_KEY);
  }
  
  removeMeterId(){
    localStorage.removeItem(this.METER_ID_KEY);
  }

  /**
   * Geolocation 
   */
  
  persistGeoloc(geoloc: string){
    localStorage.setItem(this.GEOLOCATION_CACHE, geoloc);
  }
  
  getGeoloc(){
    return localStorage.getItem(this.GEOLOCATION_CACHE);
  }
  
  /**
   * Puissance
   */
  
  persistPuissance(puissance: number){
    localStorage.setItem(this.PUISSANCE_CACHE, puissance.toString());
  }
  
  getPuissance(){
    return localStorage.getItem(this.PUISSANCE_CACHE);
  }
}
