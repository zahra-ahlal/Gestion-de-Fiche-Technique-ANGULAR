import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { EditIngredientComponent } from 'src/app/modal/edit-ingredient/edit-ingredient.component';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IngredientInterface } from 'src/app/models/ingredient.model';
import {Location} from '@angular/common';
import { IngredientComponent } from '../ingredient/ingredient.component';

@Component({
  selector: 'app-liste-ingredients',
  templateUrl: './liste-ingredients.component.html',
  styleUrls: ['./liste-ingredients.component.scss']
})
export class ListeIngredientsComponent implements OnInit {

  idCategIngr : string = "";
  nomCateg : string = "";
  listeIngredients : any;
  constructor(private ingrService: IngredientService,
      public afAuth: AngularFireAuth,private location: Location, 
      private modal: NgbModal, private route: ActivatedRoute,
      private router : Router) { }
  
  ngOnInit(): void {
    this.idCategIngr = this.route.snapshot.params['idCategIngr'];
    console.log(this.idCategIngr);
    this.nomCateg = this.route.snapshot.params['nomCateg'];
    console.log(this.nomCateg)
    
    this.getIngredients();
  }

  getIngredients() : void {
    this.ingrService.getByIdCateg(this.idCategIngr).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listeIngredients = data;
    });
  }
  
  editModal(ingredient: IngredientInterface) {
    const modalRef = this.modal.open(EditIngredientComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = ingredient.idIngr;
  }

  deleteIngredient(ingredient: IngredientInterface) {
    console.log("ingr à supprimer " + ingredient.idIngr)
    if (confirm('Are you sure to delete this record ?') == true) {
      this.ingrService.deleteIngredient(ingredient).then(() => 
       console.log('delete successful'));
    }
  }

  goBack() {
    this.location.back();
  }

  ajoutIngredient() {
    const modalRef = this.modal.open(IngredientComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.idCategIngr = this.idCategIngr;
  };

}