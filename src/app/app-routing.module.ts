import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HodComponent } from './page/hod/hod.component';
import { LoginComponent } from './page/login/login.component';
import { NocomponentComponent } from './page/nocomponent/nocomponent.component';
import { SignupComponent } from './page/signup/signup.component';
import { StaffComponent } from './page/staff/staff.component';
import { AuthGuard } from './shared/gard/auth.guard';

const routes: Routes = [
  {path : '' , redirectTo : 'login' , pathMatch : 'full'},
  {path : 'login' , component : LoginComponent},
  {path : 'signup' , component : SignupComponent},
  {path : 'hod' ,  canActivate : [AuthGuard], component : HodComponent},
  {path : 'staff' ,   canActivate : [AuthGuard], component : StaffComponent},
  {path : '**' , component : NocomponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
