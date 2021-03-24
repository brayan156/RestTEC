import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeComponentChef } from './home-chef/home-chef.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/login/auth.guard';

const platosModule = () => import('./platos/platos.module').then(x => x.PlatosModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'platos', loadChildren: platosModule },
  { path: 'login', component: LoginComponent },
  { path: 'chefview', component: HomeComponentChef, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
