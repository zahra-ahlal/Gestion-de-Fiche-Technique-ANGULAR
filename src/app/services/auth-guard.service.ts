import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs-compat';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, public auth: AngularFireAuth) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve,reject) => {
        this.auth.onAuthStateChanged(
          (user) =>{
            if (user){
              resolve(true);
            }else {
              this.router.navigate(['/auth','Login'])
              resolve(false);
            }
          }
        );
      }
    );
  }
}
