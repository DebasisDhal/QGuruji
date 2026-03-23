import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { Token } from '@angular/compiler';
import { TokenComponent } from './pages/token/token.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'layout',
    component: LayoutComponent,

    children: [
      {
        path:'',
        pathMatch:'full',
        redirectTo:'admin'
      },
      {
        
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'token',
        component: TokenComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
