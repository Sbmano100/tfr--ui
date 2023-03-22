import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-history/client-details.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';
import { InvoicingStatusHistoryComponent } from './invoicing-status-history/invoicing-status-history.component';
import { MilestoneDetailsComponent } from './milestone-details/milestone-details.component';
import { OrganizationProjectsComponent } from './organization-projects/organization-projects.component';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectHistoryComponent } from './project-history/project-history.component';
import { ProjectStatusDetailsComponent } from './project-status-details/project-status-details.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { ResourceHistoryComponent } from './resource-history/resource-history.component';
import { ResourcesDetailsComponent } from './resources-details/resources-details.component';
import { RiskDetailsComponent } from './risk-details/risk-details.component';
import { UpdateProjectComponent } from './update-project/update-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailsComponent,
    children: [
      {
        path: 'project-details/:id',
        component: ProjectdetailsComponent
      },
      {
        path: 'project-history/:id',
        component: ProjectHistoryComponent
      },
      {
        path: 'milestone-details/:id',
        component: MilestoneDetailsComponent
      },
      {
        path: 'resource-details/:id',
        component: ResourcesDetailsComponent
      },
      {
        path: 'update-project/:id',
        component: UpdateProjectComponent
      },
      {
        path: 'resource-history/:id',
        component: ResourceHistoryComponent
      },
      {
        path: 'risk-details/:id',
        component: RiskDetailsComponent
      },
      {
        path: 'project-status-details/:id',
        component: ProjectStatusDetailsComponent
      },
      {
        path: 'client-details/:id',
        component: ClientDetailsComponent
      },
      {
        path: 'invoicing-status-history/:id',
        component: InvoicingStatusHistoryComponent
      },
      {
        path: 'organization-projects/:id',
        component: OrganizationProjectsComponent
      },
      {
        path: 'goal-details/:id',
        component: GoalDetailsComponent
      },
      {
        path: '',
        redirectTo: '/details/project-details/:id',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailsRoutingModule { }