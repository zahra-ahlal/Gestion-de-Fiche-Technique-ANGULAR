import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ICout } from 'src/app/models/cout.model';
import { IEtape } from 'src/app/models/etape.model';
import { IFiche } from 'src/app/models/fiche.model';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-view-fiche',
  templateUrl: './view-fiche.component.html',
  styleUrls: ['./view-fiche.component.scss']
})
export class ViewFicheComponent implements OnInit {
  listeIngredientsFiche:any
  listeEtapesFiche:any

  //etape : IEtape = {nomEtape: '',descritpion: '',duree: '', listeIngr : null};

  couts:ICout={coutMatiere : 0,coutPersonnel : 0,coutFluides : 0};
  params:any;
  pHT:number = 0;
  assaisonnement:number=0.5;
  coutFluide:number=0.5;
  coutPers:number=0;
  nbCouverts:number=10;



  tempsTotcalc:number;
  categ : any;
  activeModal: any;
  
  
  fiche: any;
  idFicheSelected:string;
  constructor(private ficheService:FicheService,private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.idFicheSelected =this.route.snapshot.params['idFiche'];
    console.log(this.idFicheSelected)
    this.getFicheById();
    //console.log(this.getFicheById())  
  }

  getFicheById(){
    this.ficheService.getFichesByID(this.idFicheSelected).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.fiche = data[0];
    });
    console.log(this.fiche)
  }

  

}
