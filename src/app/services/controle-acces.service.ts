import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { compareSync } from 'bcryptjs';


@Injectable({
  providedIn: 'root'
})
export class ControleAccesService {

  private PASSWORD_HASH: string = '$2a$10$8DrK4OCdyKt3UB.Oo3Gkp.TvBQbkhMbJRluOoWg0aG4dY3jn6eSP6';
  private FAKE_DB_KEY = "acces-token";

  constructor(private router: Router) { }

  verifySession() {
    const token = localStorage.getItem(this.FAKE_DB_KEY);
    if (token != null) {
      const now = new Date();
      const expireAt = new Date(token);
      console.log(expireAt.toTimeString());
      console.log(now.toTimeString());
      const compare = now.getTime() < expireAt.getTime();
      return compare;
    } else {
      return false;
    }
  }

  createSession() {
    var expireAt = new Date();
    expireAt.setHours( expireAt.getMinutes() + 30 );
    localStorage.setItem(this.FAKE_DB_KEY, expireAt.toString());
  }

  authentifyAccessCode(code) {
    const resultat = compareSync(code, this.PASSWORD_HASH);
    if(resultat) {
      this.createSession();
      this.router.navigate(['']);
      return true;
    } else {
      return false;
    }
  }
}
