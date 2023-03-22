import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { ResourcesComponent } from './resources/resources.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { RisksComponent } from './risks/risks.component';
import { MatTableModule } from '@angular/material/table';
import { MilestoneDetailsComponent } from './milestone-details/milestone-details.component';
import { ResourcesDetailsComponent } from './resources-details/resources-details.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ResourceHistoryComponent } from './resource-history/resource-history.component';
import { ProjectHistoryComponent } from './project-history/project-history.component';
import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { RiskDetailsComponent } from './risk-details/risk-details.component';
import { ClientDetailsComponent } from './client-history/client-details.component';
import { ProjectStatusDetailsComponent } from './project-status-details/project-status-details.component';
import { InvoicingStatusHistoryComponent } from './invoicing-status-history/invoicing-status-history.component';
import { OrganizationProjectsComponent } from './organization-projects/organization-projects.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalDetailsComponent } from './goal-details/goal-details.component';


@NgModule({
  declarations: [
    ProjectDetailsComponent,
    ResourcesComponent,
    MilestonesComponent,
    ProjectStatusComponent,
    RisksComponent,
    RiskDetailsComponent,
    MilestoneDetailsComponent,
    ResourcesDetailsComponent,
    UpdateProjectComponent,
    ResourceHistoryComponent,
    ProjectHistoryComponent,
    ProjectdetailsComponent,
    ClientDetailsComponent,
    ProjectStatusDetailsComponent,
    InvoicingStatusHistoryComponent,
    OrganizationProjectsComponent,
    EditResourceComponent,
    GoalDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ProjectDetailsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjectDetailsComponent,
    MatButtonModule,
    MatTableModule
  ]
})
export class ProjectDetailsModule { }
