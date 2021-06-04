import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-geolocalisation',
  templateUrl: './geolocalisation.component.html',
  styleUrls: ['./geolocalisation.component.scss']
})
export class GeolocalisationComponent implements OnInit {

  boitierLat: number;
  boitierLng: number;
  
  constructor() { }

  ngOnInit(): void {
    this.loadGeocalisationBoitier();
  }

  loadGeocalisationBoitier(){
    this.boitierLat = 37.41;
    this.boitierLng = 8.82;
    this.loadMap();
  }
  
  loadMap(){
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.boitierLat, this.boitierLng]),
        zoom: 4
      })
    });
  }
  
}
