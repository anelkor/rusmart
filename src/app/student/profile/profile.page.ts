import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/student/profile/profile.service';
import { Token } from 'src/app/services/student/student';
import { environment } from 'src/environments/environment';
import { GoogleAuthService } from '../../services/google/google-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  token: Token = {
    accessToken: '',
    isAuth: false,
  };

  constructor(private http: HttpClient, private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    console.log("this here....");
    this.profileService.googleAuthCall("1234_TOKEN", "6299999991").subscribe(response => {
      this.profileService.getAccessToken().then(accessToken => {
        // this.router.navigate(['/profile']);
        console.log("hhhhhhhh")
      });
    });
  }

}
