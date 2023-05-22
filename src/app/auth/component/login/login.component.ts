import {Component, OnInit} from "@angular/core";
import {Login} from "../../model/login";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

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
    //private jwtService: JwtService,
    //private storageService: StorageService,
    private authService: AuthService) {
  }


  ngOnInit() {
    this.title.setTitle('LOGIN | BUSINEZ BOOK ');
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || 'admin/dashboard';
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(login: Login) {
    this.submitted = true;
    this.authService.login(login).subscribe({
      next: (resp) => {

      }, error: (err) => {

      }, complete: () => {
        this.submitted = false;
      }
    })

    /*resp => {
        //const tokenData =  this.jwtService.decodedAccessToken(resp.token);
        //this.storageService.saveToken(resp.token);
        //this.storageService.saveUser(tokenData);
        this.submitted = false;
        this.router.navigate([this.returnUrl]);
      }
    );*/
  }
}
