import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { snapshotChanges } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { IVente } from 'src/app/models/vente.model';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  ventes :  any;

  constructor(private venteService:VenteService, private location: Location) { }

  ngOnInit(): void {
    this.venteService.getAllVentes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.ventes = data;
    });
  }

  goBack() {
    this.location.back();
  }

}
