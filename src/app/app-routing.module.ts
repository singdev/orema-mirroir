import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CompteurComponent } from './pages/shared/component/compteur/compteur.component';
import { GenericWindowComponent } from './pages/shared/component/generic-window/generic-window.component';

const routes: Routes = [
  { path: '', component: CompteurComponent},
  { path: 'window/:page', component: GenericWindowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
