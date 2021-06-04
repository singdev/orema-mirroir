import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ControleAccesService } from './controle-acces.service';

@Injectable({
  providedIn: 'root'
})
export class ControleAccesGuardService implements CanActivate {

  
  constructor(private controleAccesService: ControleAccesService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isSignedIn = this.controleAccesService.verifySession();
    if(isSignedIn !== true){
      this.router.navigate(["controle"]);
    }
    return isSignedIn;
  }
}
