import { HttpClient , HttpBackend} from '@angular/common/http';
import { Injectable , EventEmitter} from '@angular/core';
import { BehaviorSubject, of, Subject , observable, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class userService {


  constructor(private http : HttpClient , private handler: HttpBackend) {

  }

  getAllNotification(){
    return  this.http.get(environment.apiUrl+'/user/notifications' )
     .pipe(catchError((err)=>of(err)))
   }
   getUsersByDomain() {
    return this.http.get(`${environment.apiUrl}/user/AllUsersByDomain`);
  }

  getUserQuestions(){
    return this.http.get(`${environment.apiUrl}/user/questions`);
  }

  deleteNotification(id:any){
    return this.http.delete(`${environment.apiUrl}/notification/` + id);
  }

}
