import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICout } from 'src/app/components/models/cout.model';
import { CoutService } from 'src/app/services/cout.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCoutComponent } from '../modal/edit-cout/edit-cout.component';
import { CoutComponent } from '../cout/cout.component';

@Component({
  selector: 'app-couts',
  templateUrl: './couts.component.html',
  styleUrls: ['./couts.component.scss']
})
export class CoutsComponent implements OnInit {
  @Input()couts: ICout[] = [];
  @Output()  public selectedFestival: EventEmitter<CoutComponent> = new EventEmitter<CoutComponent>();

  
  

  constructor(private coutService: CoutService,
    private modal: NgbModal){ }

  ngOnInit(): void {
    this.coutService.getCouts().subscribe((res: ICout[]) => {
      this.couts = res;
    })
  }
  

  editModal(cout: ICout) {
    console.log(cout);
    const modalRef = this.modal.open(EditCoutComponent, {
      size: 'lg',
      centered: true,
      windowClass: 'dark-modal',
    });
    modalRef.componentInstance.id = cout.idCout;
  }

  deleteCout(cout: ICout) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.coutService.deleteCout(cout).then(() => 
       console.log('delete successful'));
    }
  }

}

//////////////
