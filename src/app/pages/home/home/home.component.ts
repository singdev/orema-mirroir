import { Component, OnInit } from '@angular/core';
import { AlimentationService } from 'src/app/services/alimentation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  compteurPower: boolean = false;
  
  constructor(private alimentationService: AlimentationService) { }

  ngOnInit(): void {
    this.checkPower();
  }

  
  onAlimentationChange(event) {
    this.checkPower();
    window.location.href="/";
  }
  
  checkPower(){
    this.alimentationService.isAllumer().subscribe(isAllumer => {
      this.compteurPower = isAllumer;
      console.log(this.compteurPower);
    } )
  }
}
