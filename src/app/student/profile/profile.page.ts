import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/student/profile/profile.service';
import { StudentProfile, Token } from 'src/app/services/student/student';
import { GoogleAuthService } from '../../services/google/google-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  studentProfile: StudentProfile;

  constructor(private http: HttpClient, 
    private profileService: ProfileService, 
    private router: Router,
    private googleAuth: GoogleAuthService) { }

  ngOnInit() {
    this.fetchStudentProfile();    
  }

  private fetchStudentProfile() {
    const stdCode = this.googleAuth.getStudentCode();
    this.profileService.fetchStudentProfile(stdCode).subscribe(response => {
      this.studentProfile = response;
      console.log(this.studentProfile)
    });
  }

}
