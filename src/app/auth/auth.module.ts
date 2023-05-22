import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./component/login/login.component";
import {RegistrationComponent} from "./component/registration/registration.component";
import {AuthService} from "./component/auth.service";
import {AuthRoutingModule} from "./auth-routing.module";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    NgbModule,
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent

  ],
  providers: [
    AuthService,
  ],
})
export class AuthModule {
}
