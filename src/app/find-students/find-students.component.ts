import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { course } from '../find-teacher/course.model';

@Component({
  selector: 'app-find-students',
  templateUrl: './find-students.component.html',
  styleUrls: ['./find-students.component.css']
})
export class FindStudentsComponent implements OnInit {

  form: FormGroup;  
  userUrl = 'https://learningisfun-328b1-default-rtdb.firebaseio.com/courses.json'

  courses : course[] = [];
  courses2 : course[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<course>(this.userUrl).pipe(map(resData =>{
      for(const key in resData) {
        this.courses.push(resData[key])
      }
    })).subscribe(res =>
      console.log(res))

    this.courses2 =this.courses
    
    this.form = new FormGroup({
      searchText: new FormControl(null),
    });
    this.form.get('searchText').valueChanges.subscribe(x => {
      this.courses2 = this.courses.filter(y => y.firstName.toLowerCase().startsWith(x) || y.lastName.toLowerCase().startsWith(x) || y.course.toLowerCase().startsWith(x)  )
    })
  } 

}
