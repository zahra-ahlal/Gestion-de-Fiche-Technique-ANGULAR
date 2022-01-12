import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EtapeService } from 'src/app/services/etape.service';
import { IEtape } from 'src/app/models/etape.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { map } from 'rxjs/operators';
import { IngredientInterface } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {
  [x: string]: any;

  ingredientSelectedArray: IngredientInterface[] = new Array();
  listeIngredientsFinal :  IngredientInterface[] = new Array();

  quantite : number = 0;

  listEtapes : IEtape[] = new Array();

  etape : IEtape = {
    nomEtape: '',
    descritpion: '',
    duree: '',
    listeIngr : new Array()
  };
  constructor(private etapeService: EtapeService, private ingrService : IngredientService) { }

  ngOnInit(): void {

    this.etapeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listEtapes = data;
    });

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

  onSubmit(form: NgForm) {
    this.listeIngredientsFinal = this.ingredientSelectedArray;
    this.etapeService.create(form.value,this.listeIngredientsFinal).
       then(() => form.reset());
  }

  setShowTrue(name: string){
    //this.ingredientSelectedArray.push(name);
  }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  addIngredient(ingredient : IngredientInterface){
    //console.log(ingredient.nomIngr);
    this.ingredientSelectedArray.push(ingredient);
  }

  removeIngredient = ingredient => {
    let index = this.ingredientSelectedArray.indexOf(ingredient);
    if (index > -1) this.ingredientSelectedArray.splice(index, 1);
    console.log("Suppression de la liste "+ingredient.nomIngr)
  };

  

}
