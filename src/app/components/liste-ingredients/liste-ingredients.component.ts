import { NgForm } from '@angular/forms';



import { Component, OnInit,Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
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

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions:NgbModalOptions;



  idCategIngr : string = "";
  nomCateg : string = "";
  listeIngredients : any;



  ingredient: IngredientInterface = { nomIngr: '', prixU : 0, unite : '', allergene: false, stock : 0,idCategIngr : '', typeIngr: '' , quantite : 0};
  @Input() idCategIngr2:string=""
  nomCateg2 : string = "";

  constructor(private ingrService: IngredientService,
      public afAuth: AngularFireAuth,private location: Location, 
      private modalService: NgbModal, private route: ActivatedRoute,
      private router : Router) { this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      } }
  
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
    const modalRef = this.modalService.open(EditIngredientComponent, {
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

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  goBack() {
    this.location.back();
  }

  ajoutIngredient() {
    const modalRef = this.modalService.open(IngredientComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.idCategIngr = this.idCategIngr;
  };


  onSubmit(form: NgForm) {
    this.ingrService.addIngrByIDCateg(form.value,this.idCategIngr).
      then(() => form.reset());
  }
}