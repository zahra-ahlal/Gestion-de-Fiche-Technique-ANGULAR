import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCategorieIngredientComponent } from 'src/app/modal/edit-categorie-ingredient/edit-categorie-ingredient.component';
import { CategoriesIngredientService } from 'src/app/services/categories-ingredient.service';
import { CategorieIngredientInterface } from 'src/models/categIngr.model';
import { ListeIngredientsComponent } from '../liste-ingredients/liste-ingredients.component';

@Component({
  selector: 'app-categories-ingredients',
  templateUrl: './categories-ingredients.component.html',
  styleUrls: ['./categories-ingredients.component.scss']
})
export class CategoriesIngredientsComponent implements OnInit {

  categoriesIngredients : CategorieIngredientInterface[] = [];
  constructor(private categIngrService: CategoriesIngredientService, private modal: NgbModal,private router: Router) { }

  ngOnInit() {
    this.categIngrService.getCategoriesIngredient().subscribe((res: CategorieIngredientInterface[]) => {
      this.categoriesIngredients = res;
    })
  }

  editModal() {
    const modalRef = this.modal.open(EditCategorieIngredientComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
  }

  selectCategorie(categorie : CategorieIngredientInterface) {
    console.log('listeIngr/:' + this.getIdByCategory(categorie));
    this.router.navigate(['listeIngr/:' + this.getIdByCategory(categorie)]);
  }

  getIdByCategory(categorie : CategorieIngredientInterface){
    return categorie.idCategIngr;
  }

}
