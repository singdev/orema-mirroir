import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControleAccesService } from 'src/app/services/controle-acces.service';

@Component({
  selector: 'app-controle-acces',
  templateUrl: './controle-acces.component.html',
  styleUrls: ['./controle-acces.component.scss']
})
export class ControleAccesComponent implements OnInit {

  codeAcces: string;
  
  constructor(private controleAccesService: ControleAccesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onLogin(){
    const resultat = this.controleAccesService.authentifyAccessCode(this.codeAcces);
    if(resultat){
      this.snackBar.open("Bienvenue !", 'Ok');
    } else {
      this.snackBar.open("Code d'accès incorrecte", 'Réessayer');
    }
  }
}
