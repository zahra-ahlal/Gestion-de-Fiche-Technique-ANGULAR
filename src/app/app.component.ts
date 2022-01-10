import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'gestion-fiches-techniques';

  login : boolean = false;

  constructor (private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/') {
          this.login= true;
        } else {
          this.login= false;
        }
      }
    });
  }
  
  
}