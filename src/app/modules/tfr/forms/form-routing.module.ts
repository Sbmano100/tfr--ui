import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import { AddDivisionComponent } from './add-division/add-division.component';
import { AddGoalsComponent } from './add-goals/add-goals.component';
import { AddMilestonesComponent } from './add-milestones/add-milestones.component';
import { AddProjectstatusComponent } from './add-projectstatus/add-projectstatus.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { AddRiskComponent } from './add-risk/add-risk.component';
import { FormComponent } from './form.component';

const routes: Routes = [
{
  path:'',
  component:FormComponent,
  children:[
    {
      path:'adddesignation',
      component:AddDesignationComponent
    },
    {
      path:'adddivision',
      component:AddDivisionComponent
    },
    {
      path:'addresource',
      component:AddResourceComponent,
    },
    {
      path:'addclient',
      component:AddClientComponent,
    },
    {
      path:'addmilestone/:id',
      component:AddMilestonesComponent,
    },
    {
      path:'addgoals/:id',
      component:AddGoalsComponent,
    },
    {
      path:'addrisk/:id',
      component:AddRiskComponent,
    },
    {
      path:'addprojectstatus/:id',
      component:AddProjectstatusComponent,
    },
  ]
}
];

@NgModule({
  declarations:[FormComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
