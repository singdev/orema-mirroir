import { Component, OnInit } from '@angular/core';
import { AlimentationService } from 'src/app/services/alimentation.service';
import { ControleAccesService } from 'src/app/services/controle-acces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  compteurPower: boolean;
  
  isOpenSidebar: boolean;
  
  constructor(private alimentationService: AlimentationService, private controleAccesService: ControleAccesService) { }

  ngOnInit(): void {
    this.compteurPower = true;
    this.isOpenSidebar = false;
    this.checkPower();
  }

  logout(){
    this.controleAccesService.clearSession().subscribe(v => {
      window.location.href = "/";
    });
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
  
  openSidebar(){
    this.isOpenSidebar = true;
  }
  
  closeSidebar(){
    this.isOpenSidebar = false;
  }
}
