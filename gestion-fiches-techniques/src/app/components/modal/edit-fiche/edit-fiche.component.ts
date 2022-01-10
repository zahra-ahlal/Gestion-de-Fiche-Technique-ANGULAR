import { Component,ElementRef,EventEmitter,Input, OnInit } from '@angular/core';
import { FicheService } from 'src/app/services/fiche.service';
import { IFiche } from 'src/app/models/fiche.model';
import { NgForm } from '@angular/forms';
import { IngredientService } from 'src/app/services/ingredient.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-edit-fiche',
  templateUrl: './edit-fiche.component.html',
  styleUrls: ['./edit-fiche.component.scss']
})
export class EditFicheComponent implements OnInit {
 
  fiche: IFiche = {
    nomPlat: "", nbCouverts: 0, tempsTot: 0, idCategFiche: "", nomResponsable: "", listeEtapes: [],
    listeIngr: [],
    listeCouts: null
  }
  activeModal: any;
  isSelected: boolean;
  ingrSelected:string;
  ingredientSelectedArray:Array<string>;
  show: boolean = false;
  htmlToAdd:string;
  d1 = this.elementRef.nativeElement.querySelector('.one');
  //ingredients: any;
  
  @Input() 
  idCategFiche:string;
  
  

  listeIngredients : any;
  constructor(private ingrService: IngredientService,
      public afAuth: AngularFireAuth,private ficheService: FicheService,private elementRef:ElementRef) { }
  

  ngOnInit(): void {
    this.isSelected = false;
    console.log(this.idCategFiche);
    this.getListeIngredients() ;
    this.ingrSelected = "";
    

    
  }


  onSubmit(form: NgForm) {
    this.ficheService.addFicheByIDCateg(form.value,this.idCategFiche).
      then(() => form.reset());
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


  selectOption(name: string) {
    //getted from event
    console.log(name);
    //getted from binding
    //console.log(this.number)
  }


  addItem(ingrSelected : string ){
    console.log(this.ingrSelected)
  }

  setShowTrue(name: string){
    console.log(name);
    this.show = true;
    this.htmlToAdd += this.d1.insertAdjacentHTML('beforeend', '<button >{{ingrSelected}}</button> <br>');
    //'<button >{{ingrSelected}}</button> <br>';

    
  }




}


/////////////////////////////////////////////////////




