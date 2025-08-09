import { Component, inject } from '@angular/core';
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
export class Profile {
  private profileService = inject(ProfileService)
  private route = inject(ActivatedRoute)

  profile$:Observable<User>

  constructor(){
    this.profile$ = this.profileService.getProfile(this.route.snapshot.paramMap.get('userId'))
  }
}
