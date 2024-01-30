import {Component, OnInit} from "@angular/core";
import {Login} from "../model/login";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import jwtDecode from "jwt-decode";
import {TokenData} from "../model/token-data";
import {Error} from "../../shared/error/error";
import {AuthPageType} from "../auth-page-type";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: []
})
export class LoginComponent  implements OnInit {
  login = new Login('', '');
  loading = false;
  submitted = false;
  error!: Error;
  authPageType =  AuthPageType

  constructor(
    private title: Title,
    protected router: Router,
    private authService: AuthService) {
  }


  ngOnInit() {
    this.title.setTitle('LOGIN | PATHAGAR ');
    if (this.authService.isLoggedIn()) {
      const tokenStr = localStorage.getItem('token-data')
      const tokenData: TokenData = JSON.parse(tokenStr!);
      this.redirectToReturnUrl(tokenData);
    }
  }

  onSubmit(login: Login) {
    this.submitted = true;
    this.authService.login(login).subscribe({
        next: (resp) => {
          const tokenData =  jwtDecode<TokenData>(resp.token);
          localStorage.setItem('token', resp.token);
          localStorage.setItem('token-data', JSON.stringify(tokenData));
          this.redirectToReturnUrl(tokenData);
        },
        error: (err) => {
          console.log(err);
          this.error = err.error;
          this.loading = false;
          this.submitted = false;
        }}
      );
  }

  private redirectToReturnUrl(tokenData: TokenData) {
    if(tokenData.roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['admin']);
    } else if(tokenData.roles.includes('ROLE_USER')) {
      this.router.navigate(['user']);
    }
  }
}
