import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { HodComponent } from './page/hod/hod.component';
import { StaffComponent } from './page/staff/staff.component';

import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import {DialogModule} from 'primeng/dialog';
import { LeavediologComponent } from './leavediolog/leavediolog.component';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { NocomponentComponent } from './page/nocomponent/nocomponent.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HodComponent,
    StaffComponent,
    LeavediologComponent,
    NocomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    DialogModule,
    CalendarModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
