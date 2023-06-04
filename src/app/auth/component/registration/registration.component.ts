import {Component, OnInit} from "@angular/core";
import {Registration} from "../../model/registration";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../service/auth.service";

@Component({
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent implements OnInit {

  submitted = false;
  registration = new Registration('', '', '');

  constructor(
    private title: Title,
    protected router: Router,
    private route: ActivatedRoute,
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

      }, complete: () => {
        this.submitted = false;
      }
    })
  }
}
