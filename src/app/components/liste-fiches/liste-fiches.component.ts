import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFiche } from 'src/app/models/fiche.model';
import { FicheService } from 'src/app/services/fiche.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategFiches } from '../../models/categFiches.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { map } from 'rxjs/operators';
import { EditFicheComponent } from '../modal/edit-fiche/edit-fiche.component';

@Component({
  selector: 'app-liste-fiches',
  templateUrl: './liste-fiches.component.html',
  styleUrls: ['./liste-fiches.component.scss']
})
export class ListeFichesComponent implements OnInit {

  @Input()fiches: any;
  //categorie: ICategFiches ;//= { nomCategFiche: this.router.url.split('/')[1], listeFiches: this.fiches};
  idCategFiche:string;
  nomCateg:string;
  constructor(private ficheService: FicheService,
    private modal: NgbModal,private router: Router,private route: ActivatedRoute) { }
   

  
  ngOnInit(): void {
   
    this.idCategFiche =this.route.snapshot.params['idCategFiche'];
    console.log(this.idCategFiche);
    this.nomCateg= this.route.snapshot.params['nomCateg']

    this.getListeFiche();
    
    /*this.ficheService.getFichesByIDCategorie(this.idCategFiche).subscribe((res: IFiche[]) => {
      this.fiches = res;
    })

    console.log(this.fiches);*/
  }


  getListeFiche() : void {
    this.ficheService.getFichesByIDCategorie(this.idCategFiche).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.fiches = data;
    });
  }

  editModal() {
    const modalRef = this.modal.open(EditFicheComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.idCategFiche= this.idCategFiche;
    //console.log(modalRef.componentInstance.id );
  }
   
  deleteOneFiche(fiche: IFiche) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.ficheService.deleteFiche(fiche.idF).then(() => 
       console.log('delete successful'));
    }
  }

  //Fonction appelée lors du clic
  clicSurBouton(pageName:string){
    this.router.navigate([`${pageName}`]);
  }


  

  

}

/////


