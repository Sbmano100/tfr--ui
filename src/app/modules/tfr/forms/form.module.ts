import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddDivisionComponent } from './add-division/add-division.component';
import { RouterModule,} from '@angular/router';
import { FormRoutingModule } from './form-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMilestonesComponent } from './add-milestones/add-milestones.component';
import { AddGoalsComponent } from './add-goals/add-goals.component';
import { AddRiskComponent } from './add-risk/add-risk.component';
import { AddProjectstatusComponent } from './add-projectstatus/add-projectstatus.component';


@NgModule({
  declarations: [
    AddDesignationComponent,
    AddResourceComponent,
    AddClientComponent,
    AddDivisionComponent,
    AddMilestonesComponent,
    AddGoalsComponent,
    AddRiskComponent,
    AddProjectstatusComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
