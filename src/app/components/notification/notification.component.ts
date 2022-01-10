import { Component,
  OnInit, Output,
  EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationServicesService } from 'src/app/services/notification-services.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  modalItem: string;
  notification = {
    title: '',
    message: ''
  };
  @Output() delEvent = new EventEmitter();
  subscription: Subscription;
  constructor(private noteSvc: NotificationServicesService) { }

  ngOnInit() {
    this.subscription = this.noteSvc.getNotification()
    .subscribe(notification => {
      this.notification = notification;
    });
  }
  deleteItem() {
    this.delEvent.emit();
  }

}