import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PuissanceService } from 'src/app/services/puissance.service';

@Component({
  selector: 'app-puissance',
  templateUrl: './puissance.component.html',
  styleUrls: ['./puissance.component.scss']
})
export class PuissanceComponent implements OnInit {

  min: number = 3;
  max: number = 15;
  step: number = 3;
  
  puissance: number;
  newPuissance: number;
  
  constructor(private puissanceService: PuissanceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCurrentPuissance();
  }

  loadCurrentPuissance(){
    this.puissanceService.getPuissance().subscribe(v => {
      this.puissance = v;
      this.newPuissance = v;
    });
  }
  
  onUpdatePuissance(){
    this.puissanceService.updatePuissance(this.newPuissance).subscribe(v => {
      if(v) {
        this.snackBar.open("Mise a jour effectue", "Fermer");
        this.loadCurrentPuissance();
      } else {
        this.snackBar.open("Echec de la modification de la puissance", "Fermer");
      }
    })
  }
  
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
