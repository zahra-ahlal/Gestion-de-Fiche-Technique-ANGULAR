import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  [x: string]: any;

  constructor(public router: Router, public auth: AngularFireAuth) { }

  isLoggedIn = false;

  createNewUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }


  signInUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).then(
      res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user))
        this.router.navigate(['/accueil']);
      }).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  signOutUser() {
    this.auth.signOut();
    localStorage.removeItem('user')
  } 

}