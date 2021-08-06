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
    const puissance = this.setting.getPuissance();
    this.unite = Number.parseFloat(this.setting.getPuissance()) / 10;
    if(puissance == null || puissance == ""){
      this.unite = 0;
    }
    return meter_id != "" && meter_id != null;
  }

  checkPower() {
    this.alimentationService.isAllumer().subscribe(async (isAllumer) => {
      const informations = await this.alimentationService.getInformations();
      if(informations){
        this.unite = informations.Solde;
        this.numeroCompteur = informations.NumCompteur;
        this.loading = false; 
      }
    });
  }
  
}
