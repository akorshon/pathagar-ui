import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {BookComponent} from "./component/book/book.component";


export const routes: Routes = [
  {
    path: '',
    component: BookComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

