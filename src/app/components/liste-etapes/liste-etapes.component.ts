import { Component, OnInit,Input,Output } from '@angular/core';

import { IEtape } from 'src/app/models/etape.model';
import { EtapeService } from 'src/app/services/etape.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-liste-etapes',
  templateUrl: './liste-etapes.component.html',
  styleUrls: ['./liste-etapes.component.scss']
})
export class ListeEtapesComponent implements OnInit {

  @Input()etapes: any;

  constructor() { }

  ngOnInit(): void {
  }

}
