import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Localization } from '../model/localization';

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {

  constructor() { }
  
  getCompteurGeolocalisation(): Observable<Localization>{
    const lat = 0.3856464;
    const lng = 9.4478922;
    
    return of(new Localization(lat, lng));
  }
}
