import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FicheService } from 'src/app/services/fiche.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IFiche } from '../models/fiche.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { IEtape } from '../models/etape.model';
import { EtapeService } from 'src/app/services/etape.service';

@Component({
  selector: 'app-ajout-fiche',
  templateUrl: './ajout-fiche.component.html',
  styleUrls: ['./ajout-fiche.component.scss']
})
export class AjoutFicheComponent implements OnInit {
  fiche: IFiche = { nomPlat: "", nbCouverts: 0, tempsTot: 0,idCategFiche:"", nomResponsable:"",listeEtapes:null}
  etape : IEtape = {nomEtape: '',descritpion: '',duree: ''};
  activeModal: any;
  isSelected: boolean;
  ingrSelected:string;
  ingredientSelectedArray:string[];
  show: boolean = false;
  listeIngredients : any;
  listeEtapes : any;
  

  constructor(private ingrService: IngredientService,
      public afAuth: AngularFireAuth,private ficheService: FicheService, private etapeService : EtapeService) { }

  ngOnInit(): void {
    this.isSelected = false;
    //console.log(this.idCategFiche);
    this.getListeIngredients() ;
    this.getListeEtapes() ;
    this.ingrSelected = "";
    this.ingredientSelectedArray = [];

  }

  

  onSubmit(form: NgForm) {
    this.ficheService.addFiche(form.value).
      then(() => form.reset());
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
