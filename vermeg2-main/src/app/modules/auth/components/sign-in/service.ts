import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from 'rxjs/operators';
import {of} from 'rxjs';


//model
import { CONFIG } from "../../../../../environments/environment";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser")|| '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(credentials:any) {
    return this.http.post<any>(`${CONFIG.URL}auth/signin`, credentials).pipe(
      map((user) => {
        if (user && user.accessToken) {
          //if user is found and token exists store it
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("domaine", user.domaine);
          localStorage.setItem("id", user.id);

          this.currentUserSubject.next(user);
          return user;
        }
      })
    );
  }
  signUp(credentials:any) {
    return this.http.post<any>(`${CONFIG.URL}auth/signup`, credentials).pipe(catchError((err)=>of(err)))
  }

}
