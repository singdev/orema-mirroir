import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  indexConsommation: string = "0";
  indexTarif: string = "0";
  puissanceMaximale: string = "0";
  
  constructor() { }

  ngOnInit(): void {
  }

}
