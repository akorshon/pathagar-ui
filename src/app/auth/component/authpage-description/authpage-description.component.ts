import {Component, Input} from "@angular/core";

@Component({
  selector: 'authpage-description',
  templateUrl: 'authpage-description.component.html',
  styleUrls: []
})
export class AuthpageDescriptionComponent {

  @Input()
  title: string = 'PATHAGAR';

  @Input()
  description: string = 'Books for everyone everyday everywhere.';
}
