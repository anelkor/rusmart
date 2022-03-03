import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StudentProfile, Token } from 'src/app/services/student/student';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  studentProfile: StudentProfile;

  constructor(private http: HttpClient) { }

  fetchStudentProfile(stdCode: string): Observable<StudentProfile> {

    const playLoad = {
      'std_code': stdCode
    };
    return this.http.post<StudentProfile>(`${environment.studentProfile}`, playLoad);

  }


}
