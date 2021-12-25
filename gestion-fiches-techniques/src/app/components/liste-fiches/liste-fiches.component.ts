import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFiche } from 'src/app/components/models/fiche.model';
import { FicheService } from 'src/app/services/fiche.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategFiches } from '../models/categFiches.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-fiches',
  templateUrl: './liste-fiches.component.html',
  styleUrls: ['./liste-fiches.component.scss']
})
export class ListeFichesComponent implements OnInit {

  @Input()fiches: IFiche[] = [];
  categorie: ICategFiches = { nomCategFiche: "", listeFiches: this.fiches};

  constructor(private ficheService: FicheService,
    private modal: NgbModal) { }

  ngOnInit(): void {
    this.ficheService.getFichesByCategorie(this.categorie).subscribe((res: IFiche[]) => {
      this.fiches = res;
    })
  }

  

}
