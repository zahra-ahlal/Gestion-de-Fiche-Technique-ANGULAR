import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EtapeService } from 'src/app/services/etape.service';
import { IEtape } from 'src/app/models/etape.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {
  [x: string]: any;

  ingredientSelectedArray:string[];
  listeIngredients : any;

  etape : IEtape = {
    nomEtape: '',
    descritpion: '',
    duree: '',
    listeIngr : null
  };
  constructor(private etapeService: EtapeService, private ingrService : IngredientService) { }

  ngOnInit(): void {
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
    this.etapeService.create(form.value).
      then(() => form.reset());
  }

  setShowTrue(name: string){
    this.ingredientSelectedArray.push(name);
  }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

}
