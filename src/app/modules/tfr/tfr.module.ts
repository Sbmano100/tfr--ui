import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TfrComponent } from './tfr.component';
import { MatTableModule } from '@angular/material/table';
import { AddProjectFormComponent } from './add-project-form/add-project-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TfrRoutingModule } from './tfr-routing.module';


@NgModule({
  declarations: [
    TfrComponent,
    DashboardComponent,
    AddProjectFormComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TfrRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    TfrComponent,
    MatTableModule,
    HttpClientModule
  ]
})
export class TfrModule { }
