import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Login} from "../model/login";
import {observable, Observable} from "rxjs";
import {Registration} from "../model/registration";
import {isPlatformBrowser} from "@angular/common";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static LOGIN_API = environment.backendUrl +  '/api/auth/login';
  static REGISTRATION_API = environment.backendUrl +  '/api/auth/registration';
  static RECOVER_PASSWORD_API = environment.backendUrl +  '/api/auth/recover-password';

  constructor(
    @Inject(PLATFORM_ID) private platformId : any,
    private http: HttpClient ) {
  }

  login(login: Login): Observable<any>  {
    return this.http.post(AuthService.LOGIN_API, login);
  }

  registration(registration: Registration): Observable<any> {
    return  this.http.post(AuthService.REGISTRATION_API, registration);
  }

  recoverPassword(email: string): Observable<any> {
    return  this.http.post(AuthService.RECOVER_PASSWORD_API, email);
  }

  logout() {
    this.getLocalStorage().removeItem('token');
  }

  isLoggedIn() {
    const token = this.getLocalStorage().getItem('token');
    return token != null;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    } else {
      return {
        getItem() {},
        setItem() {},
        removeItem() {} ,
      };
    }
  }
}
