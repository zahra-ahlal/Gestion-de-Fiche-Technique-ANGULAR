import { Component,Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FicheService } from 'src/app/services/fiche.service';
import { IFiche } from 'src/app/components/models/fiche.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-fiche',
  templateUrl: './edit-fiche.component.html',
  styleUrls: ['./edit-fiche.component.scss']
})
export class EditFicheComponent implements OnInit {
 
  fiche: IFiche = { nomPlat: "", nbCouverts: 0, tempsTot: 0,idCategFiche:""}
  activeModal: any;
  
  @Input() 
  idCategFiche:string;
  

  constructor(private ficheService: FicheService) { }

  ngOnInit(): void {
    console.log(this.idCategFiche)
  }

  onSubmit(form: NgForm) {
    this.ficheService.addFicheByIDCateg(form.value,this.idCategFiche).
      then(() => form.reset());
  }

}



