import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TfrComponent } from './tfr.component';

const routes: Routes = [
  {path:'',
   component:TfrComponent,
   children:[
     {
        path: 'dashboard',   
        component: DashboardComponent,
      },
     {
        path: 'details',
        loadChildren:()=>
        import('../tfr/project-details/project-details.module').then((m)=>m.ProjectDetailsModule),
      },
      {
        path: 'forms',
        loadChildren:()=>
        import('../tfr/forms/form.module').then((m)=>m.FormModule),
      },
      {
        path: 'add-project',
        component: AddProjectFormComponent
      },
      { 
        path: '', 
        redirectTo:'/tfr/dashboard',
        pathMatch:'full'
      },
   ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfrRoutingModule { }
