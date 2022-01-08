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


@Component({
  selector: 'app-ajout-fiche',
  templateUrl: './ajout-fiche.component.html',
  styleUrls: ['./ajout-fiche.component.scss']
})
export class AjoutFicheComponent implements OnInit {

  fiche: IFiche = { nomPlat: "", nbCouverts: null, tempsTot: 0,idCategFiche:"", nomResponsable:"",listeEtapes:null}
  etape : IEtape = {nomEtape: '',descritpion: '',duree: ''};
  categ : any;
  activeModal: any;
  isSelected: boolean;
  ingrSelected:string;
  categSelected:string;
  etapeSelected:string;
  ingredientSelectedArray:string[];
  show: boolean = false;
  listeIngredients : any;
  listeEtapes : any;
  listeCategories : any;

  @Input() idCategFiche: string;
  
  //@Input()etapes: IEtape[] = [];

  constructor(private ingrService: IngredientService,private route: ActivatedRoute,
      public afAuth: AngularFireAuth,private ficheService: FicheService, private etapeService : EtapeService, private categService : CategFichesService) { }

  ngOnInit(): void {
    this.isSelected = false;

    this.idCategFiche =this.route.snapshot.params['idCategFiche'];
    console.log(this.idCategFiche);
    //console.log(this.idCategFiche);
    this.getListeCategories() ;
    this.getCategFicheByID();
    this.getListeIngredients() ;
    this.getListeEtapes() ;
    this.ingrSelected = "";
    this.ingredientSelectedArray = [];
   

  }

  

  onSubmit(form: NgForm) {
    this.ficheService.addFiche(form.value).
      then(() => form.reset());
  }

  getCategFicheByID(){
    this.categService.getCategByID(this.idCategFiche).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categ = data;
    });
  }

  
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
      console.log(this.listeIngredients)
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
    console.log(name);
    this.ingredientSelectedArray.push(name);
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



}
