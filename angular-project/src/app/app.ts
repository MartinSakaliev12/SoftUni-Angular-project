import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './feature/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-project';
}
