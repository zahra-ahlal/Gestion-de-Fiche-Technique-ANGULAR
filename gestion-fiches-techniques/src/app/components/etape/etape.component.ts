import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EtapeService } from 'src/app/services/etape.service';
import { IEtape } from 'src/app/models/etape.model';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit {

  etape : IEtape = {
    nomEtape: '',
    descritpion: '',
    duree: ''
  };
  constructor(private etapeService: EtapeService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.etapeService.create(form.value).
      then(() => form.reset());
  }

}
