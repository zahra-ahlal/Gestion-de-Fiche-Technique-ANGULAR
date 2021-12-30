import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesIngredientService } from 'src/app/services/categories-ingredient.service';
import { CategorieIngredientInterface } from 'src/models/categIngr.model';

@Component({
  selector: 'app-edit-categorie-ingredient',
  templateUrl: './edit-categorie-ingredient.component.html',
  styleUrls: ['./edit-categorie-ingredient.component.scss']
})
export class EditCategorieIngredientComponent implements OnInit {

  @Input() 
  categIngredient : CategorieIngredientInterface = {nomCategIngr : "" , listIngr : []};

  constructor(
    private categIngrService: CategoriesIngredientService,
    public activeModal: NgbActiveModal) 
  { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.categIngrService.addCategorieIngredient(form.value)
    .then(() => form.reset());
  }

}
