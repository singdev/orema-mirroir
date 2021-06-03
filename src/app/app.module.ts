import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { MainMenuComponent } from './pages/shared/component/main-menu/main-menu.component';
import { GenericWindowComponent } from './pages/shared/component/generic-window/generic-window.component';
import { CompteurComponent } from './pages/shared/component/compteur/compteur.component';
import { AlimentationComponent } from './pages/alimentation/alimentation/alimentation.component';
import { ConsommationComponent } from './pages/consommation/consommation/consommation.component';
import { HistoriqueComponent } from './pages/historique/historique/historique.component';
import { PuissanceComponent } from './pages/puissance/puissance/puissance.component';
import { RechargeComponent } from './pages/recharge/recharge/recharge.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GeolocalisationComponent } from './pages/geolocalisation/geolocalisation/geolocalisation.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    GenericWindowComponent,
    CompteurComponent,
    AlimentationComponent,
    ConsommationComponent,
    HistoriqueComponent,
    PuissanceComponent,
    RechargeComponent,
    GeolocalisationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
