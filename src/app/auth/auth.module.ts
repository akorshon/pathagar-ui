import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {NgModule} from "@angular/core";
import {RecoverPasswordComponent} from "./recover-password/recover-password.component";
import {AuthpageNavigationComponent} from "./component/authpage-navigation/authpage-navigation.component";
import {AuthpageDescriptionComponent} from "./component/authpage-description/authpage-description.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    NgbModule,
    SharedModule,
  ],
  declarations: [
    // Pages
    LoginComponent,
    RegistrationComponent,
    RecoverPasswordComponent,

    // Partial
    AuthpageNavigationComponent,
    AuthpageDescriptionComponent,
  ],
  providers: [
  ],
})
export class AuthModule {
}
