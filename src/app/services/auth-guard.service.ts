import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Observable } from 'rxjs-compat';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        const auth = getAuth();
        auth.onAuthStateChanged(
          (user: any) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'login']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
