import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlimentationService } from 'src/app/services/alimentation.service';

@Component({
  selector: 'app-compteur',
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.scss']
})
export class CompteurComponent implements OnInit {

  compteurPower: boolean = false;
  unite: number;
  numeroCompteur: string;
  loading:boolean  = true;

  constructor(private alimentationService: AlimentationService) { }

  ngOnInit(): void {
    this.checkPower();
  }

  checkPower() {
    this.alimentationService.isAllumer().subscribe(async (isAllumer) => {
      const informations = await this.alimentationService.getInformations();
      if(informations){
        this.unite = informations.Solde;
        this.numeroCompteur = informations.NumCompteur;
        this.loading = false; 
      } else {
        alert("Veuillez recharger la page s'il vous plait");
      }
    });
  }
}
