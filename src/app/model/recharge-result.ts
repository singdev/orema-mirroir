import { ThrowStmt } from "@angular/compiler";

export class RechargeResult {
  message: String;
  success: boolean;
  
  constructor(message: string, success: boolean){
    this.message = message;
    this.success = success;
  }
}