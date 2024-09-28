import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class InterceptService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Retrieve the currentUser from localStorage
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Retrieve the token from the currentUser
    let token = currentUser.accessToken;

    if (token) {
      // Create the headers object with the token and Content-Type
      const headers = req.headers
        .set('Authorization', 'Bearer ' + token)
        .append('Content-Type', 'application/json');

      // Clone the request and update the headers
      const reqClone = req.clone({ headers });

      // Pass the cloned request with updated headers to the next interceptor or handler
      return next.handle(reqClone);
    }

    // If token is not available, pass the original request to the next interceptor or handler
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle error logic here
        return throwError(error);
      })
    );
  }
}
