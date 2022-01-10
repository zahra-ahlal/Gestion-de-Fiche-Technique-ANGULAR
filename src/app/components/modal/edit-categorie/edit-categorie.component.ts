import { Component,Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { ICategFiches } from 'src/app/models/categFiches.model';
import { NgForm } from '@angular/forms';
import { GalleryComponent } from '../../gallery/gallery.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  categorie: ICategFiches = { nomCategFiche: "", listeFiches: null,urlImage:""};
  activeModal: any;
  choix: boolean;
  
  
  constructor(private categService: CategFichesService) { }

  ngOnInit(): void {
    /*if (this.idC)
      this.categService.getCategFichesByID(this.idC).subscribe(res => {
        this.categorie = res;
        console.log("If :"+this.categorie);
      });*/
    this.choix = false;



      
  }

  onSubmit(form: NgForm) {
    this.categService.addCategFiches(form.value).
      then(() => form.reset());
  }

}


///////////////////////////////////////////


