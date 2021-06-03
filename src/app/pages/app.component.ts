import { Component, OnInit } from '@angular/core';
import { AlimentationService } from '../services/alimentation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'orema-mirror';
  
  compteurPower: boolean = false;
  
  constructor(private alimentationService: AlimentationService) {}
  
  ngOnInit(): void {
    this.checkPower();
  }
  
  onAlimentationChange(event) {
    this.checkPower();
  }
  
  checkPower(){
    this.alimentationService.isAllumer().subscribe(isAllumer => {
      this.compteurPower = isAllumer;
      console.log(this.compteurPower);
    } )
  }
}
