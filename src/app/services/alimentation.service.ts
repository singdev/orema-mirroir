import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentationService {

  private FAKE_DB_KEY = 'power_key';
  
  constructor() { }
  
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
}
