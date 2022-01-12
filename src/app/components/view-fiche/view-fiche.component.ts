import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ICategFiches } from 'src/app/models/categFiches.model';
import { ICout } from 'src/app/models/cout.model';
import { IEtape } from 'src/app/models/etape.model';
import { IFiche } from 'src/app/models/fiche.model';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { FicheService } from 'src/app/services/fiche.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { VenteService } from 'src/app/services/vente.service';

@Component({
  selector: 'app-view-fiche',
  templateUrl: './view-fiche.component.html',
  styleUrls: ['./view-fiche.component.scss']
})
export class ViewFicheComponent implements OnInit {
  

  couts:ICout={coutMatiere : 0,coutPersonnel : 0,coutFluides : 0};
  params:any;
  pHT:number = 0;
  assaisonnement:number=0.5;
  coutFluide:number=0.5;
  coutPers:number=0;
  nbCouverts:number=10;
  vente:boolean=false ;
  


  tempsTotcalc:number;
  nomCateg : string;
  idCategfiche:string;
  activeModal: any;
  
  
  //fiche: IFiche;
  idFicheSelected:string =" ";
  @Input()fiche:IFiche={
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
  ;//categFiche:ICategFiches;
  //fiches: { idF?: string; nomPlat: string; nbCouverts: number; tempsTot: number; idCategFiche: string; nomResponsable: string; listeEtapes: IEtape[]; listeIngr: import("c:/Users/afaf/Documents/COURS_POLYTECH/S7/AWI/Gestion-de-Fiche-Technique-ANGULAR/gestion-fiches-techniques/src/app/models/ingredient.model").IngredientInterface[]; listeCouts: ICout; id: string; }[];
  constructor(private ingrService:IngredientService,private venteService:VenteService,private router: Router,private ficheService:FicheService,private route: ActivatedRoute,private categService:CategFichesService) { }
 
  ngOnInit(): void {
    this.idFicheSelected =this.route.snapshot.params['idFiche'];
    console.log(this.idFicheSelected)
  
    this.getFicheById()
    //console.log("Id de la categ Fiche: "+this.idCategfiche)
    console.log("après print "+this.fiche.idCategFiche)
    //this.getCategFicheByCateg(this.fiche.idCategFiche);
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

  modifierFiche(){
    //console.log(this.idFicheSelected)
    this.router.navigate([`${"/modifierFiche/"+this.idFicheSelected}`]);
  }

  supprimerFiche(){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.ficheService.deleteFiche(this.idFicheSelected).then(() =>
        this.router.navigate([`${"/rechercher"}`]))
    }
    
  }


  printComponent(){
    window.print();
  }


  afficher(){
    this.vente=true;
  }
  

  vendreFiche(){
    //this.vente=true;
    if (confirm('Voulez-vous vendre cette fiche ?') == true) {
    this.ficheService.getTESTFiches(this.idFicheSelected).subscribe(data => {
      this.fiche=data;
      const prixVente = (this.fiche.listeCouts.coutFluides+this.fiche.listeCouts.coutMatiere+this.fiche.listeCouts.coutPersonnel)*1.2
      const cValue = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
      this.venteService.addVente(this.fiche,cValue)

      for(let i=0;i<this.fiche.listeEtapes.length;i++){
        for(let j=0;j<this.fiche.listeEtapes[i].listeIngr.length;j++){
          console.log(this.fiche.listeEtapes[i].listeIngr[j].nomIngr)
          this.ingrService.updateStock(this.fiche.listeEtapes[i].listeIngr[j].nomIngr,this.fiche.listeEtapes[i].listeIngr[j].stock-this.fiche.listeEtapes[i].listeIngr[j].quantite)
        }
      } 

     })
    }
    
    //window.print();
  }
}
