import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app.component';
import { MainMenuComponent } from './pages/shared/component/main-menu/main-menu.component';
import { GenericWindowComponent } from './pages/shared/component/generic-window/generic-window.component';
import { CompteurComponent } from './pages/shared/component/compteur/compteur.component';
import { ConsommationComponent } from './pages/consommation/consommation/consommation.component';
import { HistoriqueComponent } from './pages/historique/historique/historique.component';
import { PuissanceComponent } from './pages/puissance/puissance/puissance.component';
import { RechargeComponent } from './pages/recharge/recharge/recharge.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GeolocalisationComponent } from './pages/geolocalisation/geolocalisation/geolocalisation.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';
import { ControleAccesComponent } from './pages/auth/controle-acces/controle-acces.component';
import { HomeComponent } from './pages/home/home/home.component';
import { BlueComponent } from './pages/shared/component/blue/blue.component';
import { SidebarComponent } from './pages/shared/component/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    GenericWindowComponent,
    CompteurComponent,
    ConsommationComponent,
    HistoriqueComponent,
    PuissanceComponent,
    RechargeComponent,
    GeolocalisationComponent,
    ControleAccesComponent,
    HomeComponent,
    BlueComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
