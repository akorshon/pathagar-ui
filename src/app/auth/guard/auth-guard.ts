import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {TokenData} from "../model/token-data";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  static LOGIN_URL = 'auth/login';

  constructor(
    protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log('auth-guard started ');
    const tokenData = localStorage.getItem('token-data') as unknown as TokenData;
    const userRoles = tokenData.roles;
    if (userRoles == null) {
      this.router.navigate(['/' + AuthGuard.LOGIN_URL], { queryParams: { returnUrl: state.url }});
      return false;
    }

    /*
    if (requiredRoles == null) {
      return true;
    }*/

    const requiredRoles = route.data['requiredRoles'];
    const match = this.roleMatch(requiredRoles, userRoles);
    if (match) {
      return true;
    } else {
      this.router.navigate(['/' + AuthGuard.LOGIN_URL]);
      return false;
    }
  }

  roleMatch(requiredRoles: string[], userRoles: string[]): boolean {
    let isMatch = false;
    requiredRoles.forEach(requiredRole => {
      if (userRoles.indexOf(requiredRole) > -1) {
        isMatch = true;
      }
    });
    return isMatch;
  }
}
