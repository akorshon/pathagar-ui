import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import {TokenData} from "../model/token-data";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  static LOGIN_URL = 'auth/login';

  constructor(
    protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log('auth-guard started ');
    const tokenDataStr: string | null = localStorage.getItem('token-data');
    if (tokenDataStr == null) {
      this.router.navigate(['/' + AuthGuard.LOGIN_URL], { queryParams: { returnUrl: state.url }});
      return false;
    }

    const  tokenData: TokenData = JSON.parse(tokenDataStr);
    const userRoles = tokenData.roles;
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
