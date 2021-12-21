import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditIngredientComponent } from 'src/app/modal/edit-ingredient/edit-ingredient.component';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IngredientInterface } from 'src/models/ingredient.model';

@Component({
  selector: 'app-liste-ingredients',
  templateUrl: './liste-ingredients.component.html',
  styleUrls: ['./liste-ingredients.component.scss']
})
export class ListeIngredientsComponent implements OnInit {

  listeIngredients : IngredientInterface[] = [];
  constructor(private ingrService: IngredientService, private modal: NgbModal) { }

  ngOnInit() {
    this.ingrService.getIngredients().subscribe((res: IngredientInterface[]) => {
      this.listeIngredients = res;
    })
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
