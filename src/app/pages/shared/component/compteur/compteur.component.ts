import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlimentationService } from 'src/app/services/alimentation.service';

@Component({
  selector: 'app-compteur',
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.scss']
})
export class CompteurComponent implements OnInit {

  compteurPower: boolean = false;
  
  constructor(private alimentationService: AlimentationService) { }

  ngOnInit(): void {
    this.checkPower();
  }
  
  checkPower(){
    this.alimentationService.isAllumer().subscribe(isAllumer => {
      this.compteurPower = isAllumer;
      console.log(this.compteurPower);
    } )
  }
}
