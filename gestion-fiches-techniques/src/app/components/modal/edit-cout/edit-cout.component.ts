import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoutService } from 'src/app/services/cout.service';
import { ICout } from 'src/app/components/models/cout.model';

@Component({
  selector: 'app-edit-cout',
  templateUrl: './edit-cout.component.html',
  styleUrls: ['./edit-cout.component.scss']
})
export class EditCoutComponent implements OnInit {

  @Input() 
  idCout !: string ;
  cout !: ICout;

  constructor(
    private coutService: CoutService,
    public activeModal: NgbActiveModal)
     { }
  
  ngOnInit() {
    console.log("Cout table "+this.cout);
    if (this.idCout)
      this.coutService.getCoutByID(this.idCout).subscribe(res => {
        this.cout = res;
      });
    
  }

  onUpdate() {
    this.coutService.updateCout(this.cout).then(() => {
      this.activeModal.close();
      console.log('Data add successfully');
      
    })
  }

  setCoutMatiere(cout: ICout, coutN: number) {
    this.coutService.modifyCoutMatiere(cout, coutN)
  }

}