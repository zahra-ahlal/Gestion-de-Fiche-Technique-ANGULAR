import { Component,Input, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICout } from 'src/app/models/cout.model';
import { CoutService } from 'src/app/services/cout.service';

@Component({
  selector: 'app-edit-cout',
  templateUrl: './edit-cout.component.html',
  styleUrls: ['./edit-cout.component.scss']
})
export class EditCoutComponent implements OnInit {
  @Input() idCout!: string;
  cout!: ICout;
  constructor(private coutService: CoutService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.idCout)
      this.coutService.getCoutByID(this.idCout).subscribe(res => {
        this.cout = res
      });
  }

  onUpdate() {
    this.coutService.updateCout(this.cout).then(() => {
      this.activeModal.close();
      console.log('Data add successfully');
    })
  }

  setCoutMatiere(cout: ICout, coutMatiere: number) {
    this.coutService.modifyCoutMatiere(cout, coutMatiere)
  }

  setCoutPersonnel(cout: ICout, coutPersonnel: number) {
    this.coutService.modifyCoutPersonnel(cout, coutPersonnel)
  }
 
  setCoutFluides(cout: ICout, coutFluides: number) {
    this.coutService.modifyCoutFluides(cout, coutFluides)
  }


}
