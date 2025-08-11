import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  private profileService = inject(ProfileService)
  private route = inject(ActivatedRoute)

  profile$:Observable<User>

  userId:string = ''

  constructor(){
    this.profile$ = this.profileService.getProfile(this.route.snapshot.paramMap.get('userId'))
  }
    ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadProfile(this.userId); // тук зареждаш новите данни
    });
  }
    loadProfile(id: string) {
     this.profile$ = this.profileService.getProfile(this.route.snapshot.paramMap.get('userId'))
    }
  
}
