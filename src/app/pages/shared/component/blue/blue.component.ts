import { Component, Input, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-blue',
  templateUrl: './blue.component.html',
  styleUrls: ['./blue.component.scss']
})
export class BlueComponent implements OnInit {

  @Input() onOff: boolean;
  
  warning: string ="";
  
  constructor(private setting: SettingService) { }

  ngOnInit(): void {
    const meter_id = this.setting.getMeterId();
    if(meter_id == null || meter_id == ""){
      this.warning = "Attention! Numero de compteur invalide. Veuillez le changer dans le menu plus (+)";
    }
  }

}
