import { Component, OnInit,Input} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FicheService } from 'src/app/services/fiche.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IFiche } from '../../models/fiche.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { IEtape } from '../../models/etape.model';
import { EtapeService } from 'src/app/services/etape.service';
import { EtapeComponent } from '../etape/etape.component';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { ActivatedRoute } from '@angular/router';
import { ICategFiches } from 'src/app/models/categFiches.model';
import { IngredientInterface } from 'src/app/models/ingredient.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditIngredientsFicheComponent } from '../../modal/edit-ingredients-fiche/edit-ingredients-fiche.component';
import { Console } from 'console';



@Component({
  selector: 'app-ajout-fiche',
  templateUrl: './ajout-fiche.component.html',
  styleUrls: ['./ajout-fiche.component.scss']
})
export class AjoutFicheComponent implements OnInit {

  fiche: IFiche = { nomPlat: "", nbCouverts: null, tempsTot: 0,idCategFiche:"", nomResponsable:"",listeEtapes:null}
  etape : IEtape = {nomEtape: '',descritpion: '',duree: '', listeIngr : null};
  
  tempsTotcalc:number;
  categ : any;
  activeModal: any;
  isSelected: boolean;
  ingrSelected:string;
  categSelected:string;
  etapeSelected:string;
  
  show: boolean = false;
  listeIngredients : any;
  listeEtapes : any;
  listeCategories : any;

  closeModal: string;
  ingredientSelectedArray:string[];


  @Input() idCategFiche: string; 
  
  
  //@Input()etapes: IEtape[] = [];
  

  constructor(private ingrService: IngredientService,private route: ActivatedRoute,private modalService: NgbModal,
      public afAuth: AngularFireAuth,private ficheService: FicheService, 
      private etapeService : EtapeService, private categService : CategFichesService,private modal: NgbModal) { }

  ngOnInit(): void {
    this.isSelected = false;

    //this.idCategFiche =this.route.snapshot.params['idCategFiche'];
    //console.log(this.idCategFiche);
    //console.log(this.idCategFiche);
    this.getListeCategories() ;
    this.getListeIngredients() ;
    //this.getCategFicheByID();
    
    this.getListeEtapes() ;
    this.ingrSelected = "";
    this.ingredientSelectedArray = [];
    this.tempsTotcalc=0;
   

  }

  
  
  onSubmit(form: NgForm) {
    this.ficheService.addFiche(form.value).
      then(() => form.reset());
  }

  /*getCategFicheByID(){
    this.categService.getCategByID(this.idCategFiche).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categ = data;
    });
  }*/

  
  getListeCategories(){
    this.categService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listeCategories = data;
    });

  }

  getListeIngredients() : void {
    this.ingrService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listeIngredients = data;
    });
    
  }


  getListeEtapes() : void {
    this.etapeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listeEtapes = data;
    });
  }


  selectOption(name: string) {
    //getted from event
    console.log(name);
    //getted from binding
    //console.log(this.number)
  }


  addItem(ingrSelected : string ){
    //console.log(ingrSelected);
    //this.ingredientSelectedArray.push(ingrSelected);
    //console.log("coucouuu");
  }

  

  setShowTrue(name: string){
    this.ingredientSelectedArray.push(name);
  }

  valider(){

  }

  onDrop(event: CdkDragDrop<any>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }
  
    
    
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
