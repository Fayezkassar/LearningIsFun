import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FindTeacherComponent } from './find-teacher/find-teacher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReportCardComponent } from './shared/report-card/report-card.component';
import { FindStudentsComponent } from './find-students/find-students.component';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    FindTeacherComponent,
    ReportCardComponent,
    FindStudentsComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCoXn9gEQNhkpt3vJpLy_yuL2Dc6OGg9fY",
      authDomain: "learningisfun-328b1.firebaseapp.com",
      projectId: "learningisfun-328b1",
      storageBucket: "learningisfun-328b1.appspot.com",
      messagingSenderId: "242181564294",
      appId: "1:242181564294:web:3a4a4060f7b816ad45ae07",
      measurementId: "G-CH03S43Y0N"
    })
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
