import {Component, OnInit} from "@angular/core";
import {Registration} from "../model/registration";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../service/auth.service";
import {AuthPageType} from "../auth-page-type";
import {Error} from "../../shared/error/error";

@Component({
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent implements OnInit {

  submitted = false;
  registration = new Registration('', '', '');
  authPageType =  AuthPageType
  error!: Error;

  constructor(
    private title: Title,
    protected router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.title.setTitle('REGISTRATION | BUSINEZ BOOK ');
  }

  onSubmit(registration: Registration) {
    this.submitted = true;
    this.authService.registration(registration).subscribe({
      next: () => {
        this.router.navigate(['auth/login']);
      }, error: (err) => {
        this.error = err.error;
        this.submitted = false;
      }
    })
  }

}
