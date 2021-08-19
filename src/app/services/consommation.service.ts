import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConsommationContrat } from '../model/contrat/ConsommationContrat';
import { ConsommationTimeStampContrat } from '../model/contrat/ConsommationTimeStampContrat';

@Injectable({
  providedIn: 'root'
})
export class ConsommationService {

  constructor() { }

  getHistoriqueConsommation(): Observable<Array<ConsommationTimeStampContrat>> {
    return of(new ConsommationContrat({
      "NumCompteur": "A07OOO9",
      "ListRecharge": [
        {
          "Unite": "200",
          "Date": "2021-04-24T18:25:43.511Z"
        },
        {
          "Unite": "250",
          "Date": "2022-05-03T18:25:43.511Z"
        },
        {
          "Unite": "400",
          "Date": "2023-06-20T18:25:43.511Z"
        },
        {
          "Unite": "600",
          "Date": "2024-07-27T18:25:43.511Z"
        },
        {
          "Unite": "300",
          "Date": "2026-07-27T18:25:43.511Z"
        },
        {
          "Unite": "200",
          "Date": "2027-07-27T18:25:43.511Z"
        }
      ]
    }).ListRecharge);
  }
}
