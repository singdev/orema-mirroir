import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlimentationService } from 'src/app/services/alimentation.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  @Output() alimentationEvent = new EventEmitter<boolean>();
  
  constructor(private alimentationService: AlimentationService) { }

  ngOnInit(): void {
  }
  
  onAlimentationClick(){
    this.alimentationService.isAllumer().subscribe(state => {
      if(state == true){
        this.alimentationService.eteindreCompteur();
      } else {
        this.alimentationService.allumerCompteur();
      }
      this.alimentationEvent.emit(state);
    })
  }

}
