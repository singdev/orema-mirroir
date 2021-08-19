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
  token: string;
  loading: boolean = false;
  
  constructor(private rechargeService: RechargeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.montant = 0;
    this.token = "0";
    this.loading = false;
  }

  async onRecharge(){
    this.loading = true;
    const result = await this.rechargeService.requestRecharge(this.montant, this.token);
    this.loading = false;
    if(result == null){
      alert("La recharge ne s'est pas faite !");
    } else {
      this.snackBar.open(result.message.toString(), "Fermer");
    }
  }
  
}
