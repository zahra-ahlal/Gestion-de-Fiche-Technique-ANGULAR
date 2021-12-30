import { Component,ElementRef, OnInit, ViewChild} from '@angular/core';

import { NgForm } from '@angular/forms';
import { deleteDoc } from 'firebase/firestore';
import { ICout } from 'src/app/models/cout.model';
import { IParametre } from 'src/app/models/parametre.model';

import { CoutService } from 'src/app/services/cout.service';

@Component({
  selector: 'app-cout',
  templateUrl: './cout.component.html',
  styleUrls: ['./cout.component.scss']
})
export class CoutComponent implements OnInit {

  cout: ICout = { coutMatiere: 0, coutPersonnel: 0, coutFluides: 0};
  activeModal: any;
  constructor(private coutService: CoutService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.coutService.addCout(form.value).
      then(() => form.reset());
  }



 

}
