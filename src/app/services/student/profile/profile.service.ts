import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { Token } from '../student/student';
import { Token } from 'src/app/services/student/student';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  token: Token = {
    accessToken: '',
    isAuth: false,
  };

  constructor(private http: HttpClient) { }

  googleAuthCall(idToken: string, stdCode: string): Observable<Token> {
    const headers = new HttpHeaders({})
    const body = { 'std_code': stdCode, };
    return this.http.post<Token>(`${environment.googleAuthURL2}`, body,{headers}).pipe(
      tap(res => {
        this.setAccessToken(res.accessToken);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async getAccessToken(): Promise<string> {
    const { value } = await Storage.get({ key: 'accessToken' });
    const access_token = value;    
    return access_token;
  }

  async setAccessToken(accessToken: string) {
    await Storage.set({ key: 'accessToken', value: accessToken });
  }


}
