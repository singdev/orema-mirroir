import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-generic-window',
  templateUrl: './generic-window.component.html',
  styleUrls: ['./generic-window.component.scss']
})
export class GenericWindowComponent implements OnInit {

  pageId: String;
  
  constructor(private route: ActivatedRoute, private router: Router) { 
    router.events.subscribe(v => {
      if(v instanceof NavigationEnd){
        this.loadWindowContentId();
      }
    })
  }

  ngOnInit(): void {
    this.loadWindowContentId();
  }
  
  loadWindowContentId(){
    const routeParams = this.route.snapshot.paramMap;
    this.pageId = routeParams.get('page');
  }
}
