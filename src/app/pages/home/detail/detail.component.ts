import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  indexConsommation: string = "0";
  indexTarif: string = "0";
  puissanceMaximale: string = "0";
  
  meterId: string = "";
  
  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.loadMeterId();
  }
  
  loadMeterId(){
    this.meterId = this.settingService.getMeterId();
  }
  
  updateMeterId(){
    if(this.meterId != ""){
      this.settingService.persistMeterId(this.meterId);
      location.reload();
    } else {
      alert("Numero de compteur invalide !");
    }
  }

}
