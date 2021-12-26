import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFiche } from 'src/app/components/models/fiche.model';
import { FicheService } from 'src/app/services/fiche.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategFiches } from '../models/categFiches.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategFichesService } from 'src/app/services/categ-fiches.service';

@Component({
  selector: 'app-liste-fiches',
  templateUrl: './liste-fiches.component.html',
  styleUrls: ['./liste-fiches.component.scss']
})
export class ListeFichesComponent implements OnInit {

  @Input()fiches: IFiche[] = [];
  //categorie: ICategFiches ;//= { nomCategFiche: this.router.url.split('/')[1], listeFiches: this.fiches};
  idCategFiche:string;
  constructor(private ficheService: FicheService,
    private modal: NgbModal,private router: Router,private route: ActivatedRoute) { }
   

  
  ngOnInit(): void {
   
    this.idCategFiche =this.route.snapshot.params['idCategFiche'];
    console.log(this.idCategFiche);
    
    this.ficheService.getFichesByIDCategorie(this.idCategFiche).subscribe((res: IFiche[]) => {
      this.fiches = res;
    })

    console.log(this.fiches);
  }

  

}
