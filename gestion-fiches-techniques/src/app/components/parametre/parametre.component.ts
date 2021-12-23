import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametreService } from 'src/app/services/parametre.service';
import { IParametre } from '../models/parametre.model';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss']
})
export class ParametreComponent implements OnInit {
  
  parametre: IParametre = {coutHorMoy : 0, coutHorForf : 0, coeffMulti: 0, coeff : 0}
  
  parametres: IParametre[] = [];

  activeModal: any;
  constructor(private parametreService: ParametreService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.parametreService.getParametres().subscribe((res: IParametre[]) => {
      this.parametres = res;
      
    })
  }

  onSubmit(form: NgForm) {
    //this.parametreService.addCout(form.value).
      //then(() => form.reset());
  }


  setCoutHorMoy(coutHorMoy: number) {
    this.parametre.coutHorMoy = coutHorMoy;
  }

  setCoutHorForf(coutHorForf: number) {
    this.parametre.coutHorForf = coutHorForf;
  }
 
  setCoeffMulti(coeffMulti: number) {
    this.parametre.coeffMulti = coeffMulti;
  }
  
  setCoeff(coeff: number) {
    this.parametre.coeff = coeff;
  }

}
