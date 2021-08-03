import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlimentationService } from 'src/app/services/alimentation.service';
import { SettingService } from 'src/app/services/setting.service';

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

  constructor(private alimentationService: AlimentationService, private setting: SettingService) { }

  ngOnInit(): void {
    if(this.load()){
      this.checkPower();
    }
  }
  
  load(){
    const meter_id = this.setting.getMeterId();
    console.log(meter_id);
    if(meter_id == ""){
      alert("Veuillez indiquer le numero de compteur via le bouton +");
      return false;
    }
    return true;
  }

  checkPower() {
    this.alimentationService.isAllumer().subscribe(async (isAllumer) => {
      const informations = await this.alimentationService.getInformations();
      if(informations){
        this.unite = informations.Solde;
        this.numeroCompteur = informations.NumCompteur;
        this.loading = false; 
      } else {
        alert("Verifier le numero du compteur et recharger la page");
      }
    });
  }
}
