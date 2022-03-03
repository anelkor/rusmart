import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token } from '../student/student';


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  token: Token = {
    accessToken: '',
    isAuth: false,
  };

  constructor(private http: HttpClient) { }

  googleAuth(idToken: string, stdCode: string): Observable<Token> {

    const playLoad = {
      'std_code': stdCode
    };
    this.setGoogleIdToken(idToken);
    this.setStudentCode(stdCode);
    return this.http.post<Token>(`${environment.googleAuthURL}`, playLoad).pipe(
      tap(res => {
        this.setAccessToken(res.accessToken);
        this.setIsAuthenticated(res.isAuth);
      }),
      catchError(err => {
        return throwError(err);
      })
    );

  }

  setGoogleIdToken(idToken: string) {
    localStorage.setItem('idToken', idToken);
  }

  getGoogleIdToken(): string {
    return localStorage.getItem('idToken');
  }

  setStudentCode(stdCode: string) {
    localStorage.setItem('stdCode', stdCode);
  }

  getStudentCode(): string {
    return localStorage.getItem('stdCode');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setIsAuthenticated(isAuth: boolean) {
    localStorage.setItem('isAuth',  JSON.stringify(isAuth));
  }

  getIsAuthenticated(): string {
    return localStorage.getItem('isAuth');
  }

  revokeGoogleIdToken() {
    localStorage.removeItem('idToken');
  }

  revokeStudentCode() {
    localStorage.removeItem('stdCode');
  }

  revokeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  revokeIsAuthenticated() {
    localStorage.removeItem('isAuth');
  }

  signOut() {
    this.revokeGoogleIdToken();
    this.revokeStudentCode();
    this.revokeIsAuthenticated();
    this.revokeAccessToken();
  }
}
