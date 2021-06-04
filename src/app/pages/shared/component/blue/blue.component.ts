import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blue',
  templateUrl: './blue.component.html',
  styleUrls: ['./blue.component.scss']
})
export class BlueComponent implements OnInit {

  @Input() onOff: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
