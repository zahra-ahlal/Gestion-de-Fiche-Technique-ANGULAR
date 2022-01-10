import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

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
    return new Promise<void>(
      (resolve, reject) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email, password).then(
          () => {
            resolve();
          },
          (error: any) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    const auth = getAuth();
    auth.signOut();
  } 

}