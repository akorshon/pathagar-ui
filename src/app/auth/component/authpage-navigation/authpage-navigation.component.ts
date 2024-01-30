import {Component, Input} from "@angular/core";
import {AuthPageType} from "../../auth-page-type";

@Component({
  selector: 'auth-navigation',
  templateUrl: 'authpage-navigation.component.html',
  styleUrls: []
})
export class AuthpageNavigationComponent {

  @Input()
  page!: AuthPageType;

  protected readonly AuthPageType = AuthPageType;
}
