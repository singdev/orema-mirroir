import { Component, OnInit } from '@angular/core';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

declare var ol: any;

@Component({
  selector: 'app-geolocalisation',
  templateUrl: './geolocalisation.component.html',
  styleUrls: ['./geolocalisation.component.scss']
})
export class GeolocalisationComponent implements OnInit {

  boitierLat: number;
  boitierLng: number;
  map: any;

  constructor(private geolocalisationService: GeolocalisationService) { }

  ngOnInit(): void {
    this.loadGeocalisationBoitier();
  }

  loadGeocalisationBoitier() {
    this.geolocalisationService.getCompteurGeolocalisation().subscribe(localization => {
      this.boitierLat = localization.latitude;
      this.boitierLng = localization.longitude;
      this.loadMap();
    })
  }

  loadMap() {
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([this.boitierLng, this.boitierLat])),
      name: 'Boitier Orema',
    });
    
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        color: 'rgba(255, 0, 0, .5)',
        crossOrigin: 'anonymous',
        src: 'assets/img/pin.png',
      }),
    });
    
    iconFeature.setStyle(iconStyle);
    
    var vectorSource = new ol.source.Vector({
      features: [iconFeature],
    });
    
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
    
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        vectorLayer,
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.boitierLng, this.boitierLat]),
        zoom: 17
      })
    });
  }

}
