import { Component, inject, signal } from '@angular/core';
import { InfoalertService } from '../../../service/infoalert.service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  infoMess = inject(InfoalertService);
  
}
