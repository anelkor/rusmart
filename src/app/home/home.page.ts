import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthService } from '../services/google/google-auth.service';
import { GoogleAuthResponse } from '../services/google/googleAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  googleUser: GoogleAuthResponse;

  constructor(private googleAuthService: GoogleAuthService, private router: Router) {
    GoogleAuth.initialize();
  }

  async googleSignup() {
    this.googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    const idToken = this.googleUser.authentication.idToken;
    const stdCode = this.googleUser.email.substring(0, 10);
    this.googleAuthService.googleAuth(idToken, stdCode).subscribe(response => {
      this.googleAuthService.getAccessToken().then(accessToken => {
        this.router.navigate(['/profile']);
      });
    });
  }

} 