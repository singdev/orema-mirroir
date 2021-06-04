import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControleAccesComponent } from './pages/auth/controle-acces/controle-acces.component';
import { HomeComponent } from './pages/home/home/home.component';
import { CompteurComponent } from './pages/shared/component/compteur/compteur.component';
import { GenericWindowComponent } from './pages/shared/component/generic-window/generic-window.component';
import { ControleAccesGuardService } from './services/controle-acces-guard.service';

const routes: Routes = [
  { path: 'controle', component: ControleAccesComponent },
  {
    path: '', component: HomeComponent, canActivate: [ControleAccesGuardService],
    children: [
      { path: '', component: CompteurComponent },
      { path: 'window/:page', component: GenericWindowComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
