import {Component, OnInit} from "@angular/core";
import {Login} from "../../model/login";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import jwtDecode from "jwt-decode";
import {TokenData} from "../../model/token-data";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: []
})
export class LoginComponent  implements OnInit {
  login = new Login('', '');
  returnUrl!: string;
  loading = false;
  submitted = false;
  error = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(
    private title: Title,
    private activeRoute: ActivatedRoute,
    protected router: Router,
    //private storageService: StorageService,
    private authService: AuthService) {
  }


  ngOnInit() {
    this.title.setTitle('LOGIN | PATHAGAR ');
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || 'admin';
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(login: Login) {
    this.submitted = true;
    this.authService.login(login).subscribe({
      next: (resp) => {
        const tokenData =  jwtDecode<TokenData>(resp.token);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('tokenData', JSON.stringify(tokenData));
        this.submitted = false;
      }, error: (err) => {
        this.submitted = false;
      }, complete: () => {
        this.submitted = false;
      }
    })
  }
}
