import { Component,Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategFichesService } from 'src/app/services/categ-fiches.service';
import { ICategFiches } from 'src/app/components/models/categFiches.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  categorie: ICategFiches = { nomCategFiche: "", listeFiches: null,urlImage:""};
  activeModal: any;

  constructor(private categService: CategFichesService) { }

  ngOnInit(): void {
    /*if (this.idC)
      this.categService.getCategFichesByID(this.idC).subscribe(res => {
        this.categorie = res;
        console.log("If :"+this.categorie);
      });*/
  }

  onSubmit(form: NgForm) {
    this.categService.addCategFiches(form.value).
      then(() => form.reset());
  }

}


///////////////////////////////////////////


