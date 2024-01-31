import {Component, Input} from '@angular/core';
import {Error} from "./error";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: []
})
export class ErrorComponent {

  @Input()
  error!: Error
}
