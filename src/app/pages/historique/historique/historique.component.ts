import { Component, OnInit } from '@angular/core';
import { RechargeHistorique } from 'src/app/model/recharge-historique';
import { RechargeResult } from 'src/app/model/recharge-result';
import { RechargeService } from 'src/app/services/recharge.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  recharges: Array<RechargeHistorique> = [];
  totalRecharge: number = 0;
  
  constructor(private rechargeService: RechargeService) { }

  ngOnInit(): void {
    this.loadRecharges();
  }
  
  loadRecharges(){
    this.rechargeService.getRecharges().subscribe(rechargeContrat => {
      this.recharges = [];
      for(let i = 0; i < rechargeContrat.ListRecharge.length; i++){
        let item = rechargeContrat.ListRecharge[i];
        this.recharges.push(new RechargeHistorique(item.Solde, item.token, item.Date));
      }
      this.totalRecharge = this.getTotalRecharge();
    });
  }
  
  getTotalRecharge(){
    let total = 0;
    for(let i = 0; i < this.recharges.length; i++){
      total += this.recharges[i].montant;
    }
    return total;
  }
  
  getRechargeTimeStamp(recharge){
    const now = new Date();
    const date = new Date(recharge.date);
    let diff: any = Math.floor(((now.getTime() - date.getTime()) / 1000));
    let label = "s";
    if(diff > 59){
      label = "min";
      diff = Math.floor(diff / 60);
      if(diff > 59) {
        label = "h";
        diff = Math.floor(diff / 60);
        if(diff > 24) {
          label = " jour(s)";
          diff = Math.floor(diff / 24);
          if(diff > 30) {
            diff = Math.floor(diff/30);
            label = "mois";
            if(diff > 12) {
              label = "";
              diff = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
            }
          }
        }
      }
    } 
    if(label != ''){
      return "Il y'a " + diff + " " + label;
    } else {
      return "Le " + diff;
    }
  }
}
