import { Component, OnInit } from '@angular/core';
import { RechargeService } from 'src/app/services/recharge.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {

  montant: number;
  token: number;
  
  constructor(private rechargeService: RechargeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.montant = 0;
    this.token = 0;
  }

  onRecharge(){
    console.log(this.montant);
    console.log(this.token);
    this.rechargeService.requestRecharge(this.montant, this.token).subscribe((result) => {
      // Simple message.
      let snackBarRef = this.snackBar.open(result.message.toString(), "Fermer");
    });
  }
}
