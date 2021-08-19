import { Component, OnInit } from '@angular/core';
import { ConsommationTimeStampContrat } from 'src/app/model/contrat/ConsommationTimeStampContrat';
import { RechargeHistorique } from 'src/app/model/recharge-historique';
import { ConsommationService } from 'src/app/services/consommation.service';
import { RechargeService } from 'src/app/services/recharge.service';

declare var google: any;

@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrls: ['./consommation.component.scss']
})
export class ConsommationComponent implements OnInit {

  
  constructor(private consommationService: ConsommationService, private rechargeService: RechargeService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  async onLoad() {
    const historique = await this.rechargeService.getRecharges();
    const consommations = historique.ListRecharge;
      console.log(historique);
      google.charts.load('current', { packages: ['corechart', 'line', 'annotationchart'] });
      google.charts.setOnLoadCallback(() => {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'X');
        data.addColumn('number', 'Y');
    
        let rows = [];
        for(let i = 0; i < consommations.length; i++){
          const d = new Date(consommations[i].Date);
          rows.push([
            d,
            consommations[i].Solde
          ])
        }
        console.log(rows);
        data.addRows(rows);
        var options = {
          interpolateNulls: true,
          hAxis: {
            title: 'Date',
            logScale: true,
          },
          vAxis: {
            title: 'Consommations',
            logScale: false
          },
          colors: ['#a52714']
        };
    
        var chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      });
  }

  getFormattedDate(d){
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours + ":" + d.getMinutes();
  }
  
  drawLogScales() {

  }

}
