import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-error-notification',
  imports: [],
  templateUrl: './error-notification.html',
  styleUrl: './error-notification.css'
})
export class ErrorNotification {
  errorService = inject(ErrorService)
  
}
