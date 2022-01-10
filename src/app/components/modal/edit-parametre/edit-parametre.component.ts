import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametreService } from 'src/app/services/parametre.service';
import { IParametre } from 'src/app/models/parametre.model';

@Component({
  selector: 'app-edit-parametre',
  templateUrl: './edit-parametre.component.html',
  styleUrls: ['./edit-parametre.component.scss']
})
export class EditParametreComponent implements OnInit {
  @Input() 
  idP : string ;
  parametre : IParametre;
  constructor(private parametreService: ParametreService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.parametre);
    console.log(this.idP);
    if (this.idP)
      this.parametreService.getParametreByID(this.idP).subscribe(res => {
        this.parametre = res;
        console.log("If :"+this.parametre);
      });
  }


  onUpdate() {

    this.parametreService.updateParametre(this.parametre).then(() => {
      this.activeModal.close();
      console.log('Data add successfully');
      
    })

  }

  setCoutHorMoy(parametre: IParametre, coutHorMoy: number) {
    this.parametreService.modifyCoutHorMoy(parametre, coutHorMoy)
  }

  
  setCoutHorForf(parametre: IParametre, coutHorForf: number) {
    this.parametreService.modifyCoutHorForf(parametre, coutHorForf)
  }

  setCoeffMulti(parametre: IParametre, coeffMulti: number) {
    this.parametreService.modifyCoeffMulti(parametre, coeffMulti)
  }

  setCoeff(parametre: IParametre, coeff: number) {
    this.parametreService.modifyCoeff(parametre, coeff)
  }

}
