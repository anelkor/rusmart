import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, throwError ,BehaviorSubject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StudentProfile, Token } from 'src/app/services/student/student';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  public currentUser: Observable<StudentProfile>;
  private currentUserSubject: BehaviorSubject<StudentProfile>;
  studentProfile: StudentProfile;
  private user;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<StudentProfile>(this.user);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  fetchStudentProfile(stdCode: string): Observable<StudentProfile> {

    const playLoad = {
      'std_code': stdCode
    };
    return this.http.post<StudentProfile>(`${environment.studentProfile}`, playLoad);

  }


}
