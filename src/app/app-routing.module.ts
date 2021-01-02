import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FindStudentsComponent } from './find-students/find-students.component';
import { FindTeacherComponent } from './find-teacher/find-teacher.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path : 'home', component: HomeComponent},
  { path : 'findTeacher', component: FindTeacherComponent},
  { path : 'contact-us', component: ContactUsComponent},
  { path : 'findStudents', component: FindStudentsComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
