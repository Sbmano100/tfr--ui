import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TfrService } from './modules/tfr/tfr.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [TfrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
