import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { ICategFiches } from 'src/app/models/categFiches.model';
import { map } from 'rxjs/operators';
import { FicheService } from 'src/app/services/fiche.service';
import { IngredientService } from 'src/app/services/ingredient.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-brouillon',
  templateUrl: './brouillon.component.html',
  styleUrls: ['./brouillon.component.scss']
})
export class BrouillonComponent implements OnInit {

  title = 'angular13';
  fiche: any;
  searchText = "";
  listOfContacts:any ;
  listCategFiche:any ;
  listFiches:any ;
  listFichesSearched:any ;
  
  listeIngredients : any;
  categSelectedArray : string[];
  isSearched : boolean = false;
  nomPlats: string[] = new Array();
  nbCouverts: number[] = new Array();
  tempsTot: number[] = new Array();
  nomResponsable: string[] = new Array();
  closeModal: string;

  formGroup : FormGroup;
  constructor(private router: Router,private modalService: NgbModal,private fb : FormBuilder,private ingrService: IngredientService,private http: HttpClient, private categService:CategFichesService,private ficheService: FicheService){ 
  }

  ngOnInit(): void {
    this.categSelectedArray = [];
    this.getCategFiche();
    this.initForm();
    this.getFiches();
    this.getListeIngredients() ;
    //this.listFiches = [];
  }

  initForm(){
    this.formGroup = this.fb.group({
      'ficheTechnique' : ['']
    })
    this.formGroup.get('ficheTechnique').valueChanges.subscribe(response => {
      console.log('data is ', response);
      this.filterData(response);
    })
  }

  filterData(enteredData){
   
    //console.log(this.nomPlats[0])
      this.listFiches=this.listFiches.filter(item => {
        return item.nomPlat.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
      })
    
  }

  getCategFiche(){
    this.categService.getCategFiches().subscribe((res: ICategFiches[]) => {
      this.listCategFiche = res;
    })
  }

  getCategFicheByName(text: string){
    //this.categService.getCategByName(text).subscribe((res: ICategFiches[]) => {
      return this.categService.getCategByName(text);
    //})
  }

  setShowTrue(name: string){
    //this.categSelectedArray.push(name);
    console.log(name)
  }

  getFiches(){
    
    this.ficheService.getAllFiches().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log("eaeaeaea")
      this.listFiches = data;
      for(let i =0;i<data.length;i++){
        this.nomPlats.push(data[i].nomPlat)
        this.nbCouverts.push(data[i].nbCouverts)
        this.tempsTot.push(data[i].tempsTot)
        this.nomResponsable.push(data[i].nomResponsable)
        
        console.log(this.nomPlats[i]);
      }
      
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
  getFichesByName(text:string){
    return this.ficheService.getFicheByName(text);
  }

  Search(text:string){
    console.log(text)
    console.log(this.listFiches)
     if(this.searchText!== ""){
       let searchValue = this.searchText.toLocaleLowerCase();
       this.listFiches = this.getFichesByName(text);
       /*this.listCategFiche.filter((text:any) =>{
         return text.name
         .match(searchValue )
         ;
       // you can keep on adding object properties here   
             });*/
             console.log(this.listFiches);
           }/*
           else { 
            this.http.get('https://www.testjsonapi.com/users/').subscribe(data => {
               this.listOfContacts = data;
                   }, error => console.error(error));             
           } */
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

      clicSurBouton(pageName:string){
        //const queryParams: Params = { categorie: categ ,fiches : categ.listeFiches};
        console.log(pageName)
        this.router.navigate([`${pageName}`]);
      }

}
