import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { GoogleAuthService } from '../services/google/google-auth.service';

@Injectable()
export class RuSmartInterceptor implements HttpInterceptor {

  constructor(private googleAuth: GoogleAuthService) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("this intercept here...")
    httpRequest = httpRequest.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkZDZjYTJhODFkYzJmZWE4YzM2NDI0MzFlN2UyOTZkMmQ3NWI0NDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjY4NTk0MDI2MzY5LXBia2k0Ymo5bDAyc3ZyODQxMmFoZ25odTk5dnBpMGszLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjY4NTk0MDI2MzY5LXBia2k0Ymo5bDAyc3ZyODQxMmFoZ25odTk5dnBpMGszLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MDkxODYzNzIyOTEzNjkzMTIwIiwiaGQiOiJydW1haWwucnUuYWMudGgiLCJlbWFpbCI6IjYyOTk5OTk5OTFAcnVtYWlsLnJ1LmFjLnRoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJfelROTjhZNGx0cmY3WWtRQ1RPRWJ3IiwibmFtZSI6IlBsZXd0aWFuIFJha3JhbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6MjhXdFdoeFZiSHB0TWxIbTd3WXQycFZTbkwwX3BMYXd6cUIybT1zOTYtYyIsImdpdmVuX25hbWUiOiJQbGV3dGlhbiIsImZhbWlseV9uYW1lIjoiUmFrcmFtIiwibG9jYWxlIjoidGgiLCJpYXQiOjE2NDYyOTk5MDEsImV4cCI6MTY0NjMwMzUwMSwianRpIjoiY2FjNGRmMTNjYmYyYTlkYTBiYzk4ZGUwYjRlZWM3ZDBiNzlhOTA2YiJ9.IaTOSEHFvPPaYNOBNtWs-ckAw75PuE2AhFsKXlSplQMlIf7LboAlAztLHzNZEwgDLD49XwFXTR5mTPvlmAPshXq4wwa4DEa2KPu6lcuA5tmwgXJT6SYycch9rHYKa-M6VWYk-FmI1y75hIH2E0GLI10Uv0QIxp9pOiXMu70azi30jER72P7dI8l_vrt3qLIxF3h6yWHMEjo8n4iYz9ph7XmCs_2MkVZ72Lzb0SFU_6vC3JcGXJeTorDsR8eV8jlfamqCy_VuWgvlCcLczTJSxpMHvDy1glk9RV9sWjhgRGWi3ABNeqmFD4-KSBSATbSkH8Op-P-JSYKYmbcd2ZoRlg`,
        'Content-Type': 'application/json'
      })
    });
    return next.handle(httpRequest);
  }
}