import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditIngredientComponent } from 'src/app/modal/edit-ingredient/edit-ingredient.component';
import { CategoriesIngredientService } from 'src/app/services/categories-ingredient.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { CategorieIngredientInterface } from 'src/models/categIngr.model';
import { IngredientInterface } from 'src/models/ingredient.model';

@Component({
  selector: 'app-liste-ingredients',
  templateUrl: './liste-ingredients.component.html',
  styleUrls: ['./liste-ingredients.component.scss']
})
export class ListeIngredientsComponent implements OnInit {

  idCategIngr : Number = 0;
  listeIngredients : IngredientInterface[] = [];
  constructor(private ingrService: IngredientService,private categIngrService: CategoriesIngredientService, private modal: NgbModal,private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.idCategIngr = params['idCategIngr'].split(':')[1];
          console.log(this.idCategIngr);
        }
    );
    //recuperer tous les ingredients se trouvant dans le tableaux des ingredients
    this.categIngrService.getIngredientsById(this.idCategIngr).subscribe((res: CategorieIngredientInterface) => {
      console.log ("--->Id Ingredient " + res.listIngr);
    });

    /*this.ingrService.getIngredients().subscribe((res: IngredientInterface[]) => {
      this.listeIngredients = res;
    })*/
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
    if (confirm('Are you sure to delete this record ?') == true) {
      this.ingrService.deleteIngredient(ingredient).then(() => 
       console.log('delete successful'));
    }
  }
}
