import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'gestion-fiches-techniques';

  constructor(){
    // Import the functions you need from the SDKs you need
    // Your web app's Firebase configuration
    
    const firebaseConfig = {
      apiKey: "AIzaSyB5hP4r6e4GfuFRPcTY3EIBk26sqndbaP8",
      authDomain: "gestion-fiches-techniques.firebaseapp.com",
      projectId: "gestion-fiches-techniques",
      storageBucket: "gestion-fiches-techniques.appspot.com",
      messagingSenderId: "635487850988",
      appId: "1:635487850988:web:0a7ca2363fb6a750e330c9"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
  }
  
}