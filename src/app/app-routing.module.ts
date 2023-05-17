import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./shared/component/admin-layout/admin-layout.component";
import {PublicLayoutComponent} from "./shared/component/public-layout/public-layout.component";
import {PrivateLayoutComponent} from "./shared/component/private-layout/private-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: PublicLayoutComponent,
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'private',
    component: PrivateLayoutComponent,
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
