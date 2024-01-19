import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./shared/layout/admin-layout/admin-layout.component";
import {AuthLayoutComponent} from "./shared/layout/auth-layout/auth-layout.component";
import {RoleType} from "./auth/model/role-type";
import {AuthGuard} from "./auth/guard/auth-guard";
import {UserLayoutComponent} from "./shared/layout/user-layout/user-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {requiredRoles: [RoleType.ROLE_ADMIN]},
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { requiredRoles: [RoleType.ROLE_USER]},
    component: UserLayoutComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
