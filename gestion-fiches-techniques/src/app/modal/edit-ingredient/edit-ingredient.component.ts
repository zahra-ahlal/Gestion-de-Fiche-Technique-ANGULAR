import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IngredientInterface } from 'src/models/ingredient.model';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent implements OnInit {

  @Input() 
  id !: string ;
  ingredient !: IngredientInterface;

  constructor(
    private ingrService: IngredientService,
    public activeModal: NgbActiveModal)
     { }

  ngOnInit() {
    if (this.id)
      this.ingrService.getIngredientByID(this.id).subscribe(res => {
        this.ingredient = res
      });
  }

  onUpdate() {
    this.ingrService.updateIngredient(this.ingredient).then(() => {
      this.activeModal.close();
      console.log('Data add successfully');
    })
  }

  setAllergene(ingredient: IngredientInterface, allerg: boolean) {
    this.ingrService.modifyAllergene(ingredient, allerg)
  }

}
