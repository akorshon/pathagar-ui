import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('request intercepted');
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }

    return next.handle(req).pipe(catchError(err => {
      console.log(err.status);
      if (err.status === 401) {
        //localStorage.removeItem('token')
        //localStorage.removeItem('tokenData')
        this.router.navigate(['/auth/login']);
      }
      return throwError(err);
    }));
  }

}
