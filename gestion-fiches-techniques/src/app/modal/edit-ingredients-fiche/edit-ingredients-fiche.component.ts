import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-edit-ingredients-fiche',
  templateUrl: './edit-ingredients-fiche.component.html',
  styleUrls: ['./edit-ingredients-fiche.component.scss']
})
export class EditIngredientsFicheComponent implements OnInit {

  listeIngredients : any;
  ingrSelected:string;
  @Output()
  ingredientSelectedArray:string[];
 
  //@ViewChild('closebutton') closebutton;
  constructor(private ingrService: IngredientService) { }

  ngOnInit(): void {
    
    this.getListeIngredients() ;
    this.ingrSelected = "";
    this.ingredientSelectedArray = [];


  }

  @ViewChild('closeBtn') closeBtn: ElementRef;

    yourFunction() {
        //do something
        //close your modal
        this.closeModal();
    }

    //call this wherever you want to close modal
    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }

  

  setShowTrue(name: string){
    console.log(name);
    this.ingredientSelectedArray.push(name);
    //console.log(this.ingredientSelectedArray[0])
  }

  getListeIngredients() : void {
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


  valider(listeIngredients:string[]){

  }
  onUpdate() {

    /*this.parametreService.updateParametre(this.parametre).then(() => {
      this.activeModal.close();
      console.log('Data add successfully');
      
    })*/

  }


  /////////////////////////////////////////////////////////////////////////////////
  




}
