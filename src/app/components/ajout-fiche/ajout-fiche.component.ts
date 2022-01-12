import { Component, OnInit,Input} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FicheService } from 'src/app/services/fiche.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { IFiche } from '../../models/fiche.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { IEtape } from '../../models/etape.model';
import { EtapeService } from 'src/app/services/etape.service';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientInterface } from 'src/app/models/ingredient.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICout } from 'src/app/models/cout.model';
import { ParametreService } from 'src/app/services/parametre.service';



@Component({
  selector: 'app-ajout-fiche',
  templateUrl: './ajout-fiche.component.html',
  styleUrls: ['./ajout-fiche.component.scss']
})
export class AjoutFicheComponent implements OnInit {

  fiche: IFiche = {
    nomPlat: "", nbCouverts: null, tempsTot: 0, idCategFiche: "", nomResponsable: "", listeEtapes: [],
    listeIngr: [],
    listeCouts: null,
    prixV: 0
  }
  etape : IEtape = {nomEtape: '',descritpion: '',duree: '', listeIngr : null};

  categfinal:any;
  idCategSelected:number;


  couts:ICout={coutMatiere : 0,coutPersonnel : 0,coutFluides : 0};
  params:any;
  pHT:number = 0;
  assaisonnement:number=0.5;
  coutFluide:number=0.5;
  coutPers:number=0;
  nbCouverts:number=10;
  isValidate:boolean=false;
  tempsTot : number = 0;

  tempsTotcalc:number;
  categ : any;
  activeModal: any;
  isSelected: boolean;
  ingrSelected:string;
  categSelected:string;
  q:number;
  prixV : number = 0;
  
  
  show: boolean = false;
  listeIngredients : any;
  listeEtapes : any;
  listeCategories : any;

  closeModal: string;

  listeEtapesSelected:IEtape[];
  listeEtapesFinal:  IEtape[] = new Array();
  

  ingredientSelectedArray:IngredientInterface[];
  listeIngredientsFinal:  IngredientInterface[] = new Array();

  nomCateg : string;
 
  idFicheSelected:string =" ";
  @Input() idCategFiche: string; @Input()ficheAmodifier:IFiche={
    nomPlat: '',
    nbCouverts: 0,
    tempsTot: 0,
    idCategFiche: '',
    nomResponsable: '',
    listeEtapes: [],
    listeIngr: [],
    listeCouts: null,
    prixV: 0
  }
  
  constructor(private route: ActivatedRoute,private paramsService: ParametreService,private ingrService: IngredientService,private modalService: NgbModal,
      public afAuth: AngularFireAuth,private ficheService: FicheService, 
      private etapeService : EtapeService, private categService : CategFichesService,private modal: NgbModal,private router : Router) { }

  ngOnInit(): void {
    this.isSelected = false;
    this.getParams();

    //this.idCategFiche =this.route.snapshot.params['idCategFiche'];
    //console.log(this.idCategFiche);
    //console.log(this.idCategFiche);
    this.getListeCategories() ;
    this.getListeIngredients() ;
    
    this.getListeEtapes() ;
    this.ingrSelected = "";
    this.categSelected="";
    this.ingredientSelectedArray = [];
    this.listeEtapesSelected = []
    this.tempsTotcalc=0;


    ///////CAS FICHE A MODIFIER ////////////////////////
    this.idFicheSelected =this.route.snapshot.params['idFiche'];
    if(this.idFicheSelected != undefined){
      console.log(this.idFicheSelected)
      this.getFicheById()
      //console.log("après print "+this.fiche.idCategFiche)
    }
  }

  getFicheById(){
    this.ficheService.getTESTFiches(this.idFicheSelected).subscribe(data => {
      this.fiche=data;
      for(let i=0;i<this.fiche.listeEtapes.length;i++){
        for(let j=0;j<this.fiche.listeEtapes[i].listeIngr.length;j++){
          this.pHT += this.fiche.listeEtapes[i].listeIngr[j].quantite*this.fiche.listeEtapes[i].listeIngr[j].prixU;
        }
      } 
      this.categService.getTESTCategFiche(this.fiche.idCategFiche).subscribe(categ => {
        this.nomCateg=categ.nomCategFiche;
      })
      console.log("avant print "+this.fiche.idCategFiche)
    })
    
  }
  
  print() {
    console.log(this.assaisonnement);
  }
  getParams():void{
    this.paramsService.getParametres().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.params = data;
    });
  }
  
  onSubmit(form: NgForm) {
    this.listeIngredientsFinal = this.ingredientSelectedArray;
   // console.log("ingr 1"+this.listeIngredientsFinal[0])
    this.listeEtapesFinal = this.listeEtapesSelected;
    //console.log("etape 1"+ this.listeEtapesSelected[0])
    this.prixV = this.pHT * 1,2;
    console.log("PRIX VENTE "+this.prixV);
    this.ficheService.addFiche(form.value,this.categfinal.id,this.listeIngredientsFinal,this.listeEtapesFinal,this.tempsTot,this.couts,this.prixV).//,this.listeIngredientsFinal)
      then(() => form.reset());
    this.router.navigate(['/accueil']);
  }

  validerFicheAvantAjout(){
    this.isValidate=true;
    
    for(let i=0;i<this.listeEtapesSelected.length;i++){
      const s = this.listeEtapesSelected[i].duree.split(':');
      const minutes = (+s[0]) * 60  + (+s[1]);
      this.tempsTot += minutes
      console.log(this.tempsTot)
      for(let j=0;j<this.listeEtapesSelected[i].listeIngr.length;j++){
        this.pHT += this.listeEtapesSelected[i].listeIngr[j].quantite*this.listeEtapesSelected[i].listeIngr[j].prixU;
      }
    } 


    this.nbCouverts = this.fiche.nbCouverts;
    this.couts.coutPersonnel =this.params.coutHorMoy*3;
    this.couts.coutMatiere =this.pHT + (this.pHT*this.assaisonnement);
  }


  
  getListeCategories(){
    this.categService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listeCategories = data;
    });

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


  getListeEtapes() : void {
    this.etapeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.listeEtapes = data;
    });
  }


  selectOption(name: string) {
    //getted from event
    console.log(name);
    //getted from binding
    //console.log(this.number)
  }
 

  setShowTrue(name: string){
    //this.ingredientSelectedArray.push(name);
    console.log(name)
  }
  onKey(event: any) { // without type info
    this.assaisonnement= event.target.value ;
  }

  addIngr(ingr: IngredientInterface){
    this.ingredientSelectedArray.push(ingr);
    //console.log(this.ingredientSelectedArray)
  }

  addCateg(categ: string){
    console.log(this.categSelected)
    this.categService.getCategByName(this.categSelected).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categfinal = data[0];
      //console.log(this.categfinal.id)
    });
    //this.idCategSelected = this.categfinal.id;
    

  }

  addEtape(etape: IEtape){
    this.listeEtapesSelected.push(etape);
    //console.log(this.listeEtapesSelected[0].nomEtape)
  }

  


  onDrop(event: CdkDragDrop<any>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }
  
    
    
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  removeEtape = etape => {
    let index = this.listeEtapesSelected.indexOf(etape);
    if (index > -1) this.listeEtapesSelected.splice(index, 1);
    console.log("Suppression de la liste "+etape.nomEtape)
  };


}