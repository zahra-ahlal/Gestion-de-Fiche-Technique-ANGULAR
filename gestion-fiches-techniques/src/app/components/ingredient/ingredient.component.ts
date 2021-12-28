import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IngredientInterface } from 'src/models/ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredient: IngredientInterface = { nomIngr: '', prixU : 0, unite : '', allergene: false, stock : 0,idCategIngr : '', typeIngr: '' };
  @Input() idCategIngr : string = "";
  nomCateg : string = "";
  
  constructor(private ingrService: IngredientService,
    public afAuth: AngularFireAuth, 
    private modal: NgbModal, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ingredient.idCategIngr = this.idCategIngr;
  }

  onSubmit(form: NgForm) {
    this.ingrService.addIngrByIDCateg(form.value,this.idCategIngr).
      then(() => form.reset());
  }
}
