import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { ICategFiches } from 'src/app/models/categFiches.model';
import { map } from 'rxjs/operators';
import { FicheService } from 'src/app/services/fiche.service';
import { IngredientService } from 'src/app/services/ingredient.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


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
  listeIngredients : any;
  categSelectedArray : string[];
  isSearched : boolean = false;
  nomPlats: string[] = new Array();

  formGroup : FormGroup;
  constructor(private fb : FormBuilder,private ingrService: IngredientService,private http: HttpClient, private categService:CategFichesService,private ficheService: FicheService){ 
  }

  ngOnInit(): void {
    this.categSelectedArray = [];
    this.getCategFiche();
    this.initForm();
    this.getFiches();
    this.getListeIngredients() ;
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
    this.listFiches = this.nomPlats.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
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
    this.categSelectedArray.push(name);
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

}
