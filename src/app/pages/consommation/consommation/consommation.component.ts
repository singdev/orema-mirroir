import { Component, OnInit } from '@angular/core';
import { ConsommationTimeStampContrat } from 'src/app/model/contrat/ConsommationTimeStampContrat';
import { ConsommationService } from 'src/app/services/consommation.service';

declare var google: any;

@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrls: ['./consommation.component.scss']
})
export class ConsommationComponent implements OnInit {

  consommationHistorique: Array<ConsommationTimeStampContrat> = [];
  
  constructor(private consommationService: ConsommationService) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
    this.consommationService.getHistoriqueConsommation().subscribe(historique => {
      this.consommationHistorique = historique;
      google.charts.load('current', { packages: ['corechart', 'line'] });
      google.charts.setOnLoadCallback(() => {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'X');
        data.addColumn('number', 'Y');
    
        let rows = [];
        for(let i = 0; i < this.consommationHistorique.length; i++){
          rows.push([
            new Date(this.consommationHistorique[i].Date),
            this.consommationHistorique[i].Unite
          ])
        }
        
        data.addRows(rows);
    
        var options = {
          hAxis: {
            title: 'Temps',
            logScale: true
          },
          vAxis: {
            title: 'Consommations',
            logScale: false
          },
          colors: ['#a52714']
        };
    
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      });
    })
  }

  drawLogScales() {

  }

}
