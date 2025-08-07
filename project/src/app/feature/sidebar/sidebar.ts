import { Component, inject, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private authService = inject(AuthService)
  private router = inject(Router)
  isLogged:Signal<boolean> = this.authService.isLoggedIn;
  logout():void{
    this.authService.logout().subscribe({
      next:()=>{
        this.router.navigate(['/home'])
      }
    })
  }
}
