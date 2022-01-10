import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  //Fonction appelée lors du clic
  clicSurBouton(pageName:string){
    this.router.navigate([`${pageName}`]);
  }


}
