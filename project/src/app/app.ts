import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./feature/sidebar/sidebar";
import { ErrorNotification } from './shared/components/error-notification/error-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar,ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'project';
}
