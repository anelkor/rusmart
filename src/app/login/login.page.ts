import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { GoogleAuthService } from '../services/google/google-auth.service';
import { GoogleAuthResponse } from '../services/google/googleAuth';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  googleUser: GoogleAuthResponse;

  constructor(private googleAuthService: GoogleAuthService, private router: Router, private navCtrl: NavController) {
    GoogleAuth.initialize();
  }

  async googleSignup() {
    this.googleUser = await Plugins.GoogleAuth.signIn(null) as any;
    const idToken = this.googleUser.authentication.idToken;
    const stdCode = this.googleUser.email.substring(0, 10);
    this.googleAuthService.googleAuth(idToken, stdCode).subscribe(response => {
      this.router.navigate(['/profile']);
    });
  }

  goToHome(){
    this.navCtrl.navigateBack('/home');
  }

}
