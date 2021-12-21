import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IngredientInterface } from 'src/models/ingredient.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredient: IngredientInterface = { nomIngr: '', allergene: false, typeIngr: ''};
  
  constructor(private ingrService: IngredientService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.ingrService.addIngredient(form.value).
      then(() => form.reset());
  }
}
