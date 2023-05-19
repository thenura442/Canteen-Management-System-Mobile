import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';


const URL = 'https://cms-backend-d9n7.onrender.com/';
const PATH = 'api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER : any ;
  private dataSub: BehaviorSubject<any>;
  currentData: Observable<any>;

  constructor(private http: HttpClient) {
    this.dataSub = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentData")!)
    );
    this.currentData = this.dataSub.asObservable();
  }

  public getUser(): any {
    const user = localStorage.getItem(this.USER);
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }

  public get currentUserValue(): any {
    return this.dataSub.value;
  }


  login(loginForm: any) {
    return this.http.post<any>(URL+PATH+'login/mobile',loginForm).pipe(
      map(user => {

          const email = Object.getOwnPropertyDescriptor(user, 'email');
          const access = Object.getOwnPropertyDescriptor(user, 'dle_access');

          let body = { email:email?.value , access: access?.value }

          localStorage.setItem("currentData", JSON.stringify(body));
          this.dataSub.next(body);
          localStorage.setItem(this.USER, JSON.stringify(body));
          return user;
      })
    );
  }

  public loggedIn() : boolean {
    return !!localStorage.getItem('currentData');
  }

  public logOut():Observable<any> {
    localStorage.removeItem('currentData');
    this.dataSub.next(null);
    return this.http.get<any>(URL+PATH+'logout');
  }
}
