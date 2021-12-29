import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategFiches } from 'src/app/components/models/categFiches.model';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCategorieComponent } from '../modal/edit-categorie/edit-categorie.component';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-categories-fiches',
  templateUrl: './categories-fiches.component.html',
  styleUrls: ['./categories-fiches.component.scss']
})
export class CategoriesFichesComponent implements OnInit {
  categories: ICategFiches[] = [];
  //@Output() newItemEvent = new EventEmitter<string>();

  constructor(private categService: CategFichesService,
    private modal: NgbModal,private router: Router) { }

    ngOnInit(): void {
      this.categService.getCategFiches().subscribe((res: ICategFiches[]) => {
        this.categories = res;
      })
    }
    
  
    deleteCateg(categorie: ICategFiches) {
      if (confirm('Are you sure to delete this record ?') == true) {
        this.categService.deleteCategFiches(categorie).then(() => 
         console.log('delete successful'));
      }
    }

    editModal() {
      const modalRef = this.modal.open(EditCategorieComponent, {
        size: 'lg',
        centered: true,
        windowClass: 'dark-modal',
      });
      //modalRef.componentInstance.idCout= cout.idCout;
      //console.log(modalRef.componentInstance.id );
    }

    

    clicSurBouton(pageName:string,categ: ICategFiches){
      //const queryParams: Params = { categorie: categ ,fiches : categ.listeFiches};
      //console.log(queryParams)
      this.router.navigate([`${pageName}`]);
    }

    /*recupCateg(categ:ICategFiches){
      //this.newItemEvent.emit(categ);
      
    }*/
  

}


//////////////
