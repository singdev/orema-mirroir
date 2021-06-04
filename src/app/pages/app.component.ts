import { Component, OnInit } from '@angular/core';
import { AlimentationService } from '../services/alimentation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'orema-mirror';
  
  constructor() {}
  
  ngOnInit(): void {
  }
  
}
