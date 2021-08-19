import { Component, OnInit } from '@angular/core';
import { InformationGeneralContrat } from 'src/app/model/contrat/InformationGeneraleContrat';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';
import { SettingService } from 'src/app/services/setting.service';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

declare var ol: any;

@Component({
  selector: 'app-geolocalisation',
  templateUrl: './geolocalisation.component.html',
  styleUrls: ['./geolocalisation.component.scss']
})
export class GeolocalisationComponent implements OnInit {

  boitierLat: number;
  boitierLng: number;

  map: mapboxgl.Map;
  mapStyle = "mapbox://styles/mapbox/satellite-v9";
  mapScr: string = null;
  marker: mapboxgl.Marker;
  mapboxAccessToken = "pk.eyJ1Ijoibmlja2V6ZWtpYXMiLCJhIjoiY2tndnFsM2hkMDJ4czM2cW16ajV3dXY4eCJ9.6yqYNQSaXhGieOf8p3_CKw";
  
  loading:boolean  = true;

  constructor(private geolocalisationService: GeolocalisationService, private setting: SettingService) { }

  ngOnInit(): void {
    this.loadFromCache();
    this.loadGeocalisationBoitier();
  }

  async loadFromCache(){
    let localisation: Object = { coordonnes: "0.00000,0.000000" };
    let cache = this.setting.getGeoloc();
    console.log(cache);
    if(cache != "" && cache != null){
      localisation = { coordonnes: cache };
    }
    const informationGenerales = new InformationGeneralContrat( {
      "NumCompteur": this.setting.getMeterId(),
      "Solde": 0.0,
      "Coordonne": localisation["coordonnes"],
    });
    this.boitierLat = informationGenerales.Latitude;
    this.boitierLng = informationGenerales.Longitude;
    //this.loadMap();
    // this.setGoogleMapsView();
    this.setMapboxView();
  }
  
  async loadGeocalisationBoitier() {
    const localization = await this.geolocalisationService.getCompteurGeolocalisation();
    if(localization){
      this.boitierLat = localization.latitude;
      this.boitierLng = localization.longitude;
      //this.setMapView();
      this.setGoogleMapsView();
      this.loading = false; 
    }
  }

  createMapLayer(lat, lng){
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat])),
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
    return vectorLayer;
  }
  
  loadMap() {
    const vectorLayer = this.createMapLayer(this.boitierLat, this.boitierLng);
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
        zoom: 16
      })
    });
  }
  
  setMapView(){
    const vectorLayer = this.createMapLayer(this.boitierLat, this.boitierLng);
    this.map.getLayers().pop();
    this.map.getLayers().push(vectorLayer);
    this.map.getView().setCenter(ol.proj.fromLonLat([this.boitierLng, this.boitierLat]),)
  }
  
  setGoogleMapsView(){
    const lat = this.boitierLng;
    const lng = this.boitierLat;
    this.mapScr = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15958.852102929153!2d${lat}!3d${lng}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sga!4v1629371304233!5m2!1sfr!2sga" width="600" height="450" style="border:0;"`;
  }

  setMapboxView() {
    mapboxgl.accessToken = this.mapboxAccessToken;
    const boitierCoordinates = [this.boitierLng, this.boitierLat]; //l'ordre lng,lat
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapStyle,
      center: boitierCoordinates,
      zoom: 15
    });
    // Ajouter un marqueur pour le boitier
    const marker1 = new mapboxgl.Marker()
    .setLngLat(boitierCoordinates)
    .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());
  }

}
