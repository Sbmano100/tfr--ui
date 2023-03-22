import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'tfr', 
    canActivate:[AuthGuard],
    loadChildren:()=>
    import('./modules/tfr/tfr.module').then((m)=>m.TfrModule),
  },
  { 
    path: '', 
    component: WelcomeComponent,
  },
  { 
    path: '**', 
    redirectTo:'',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
