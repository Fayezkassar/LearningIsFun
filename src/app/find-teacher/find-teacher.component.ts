import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { course } from './course.model';

@Component({
  selector: 'app-find-teacher',
  templateUrl: './find-teacher.component.html',
  styleUrls: ['./find-teacher.component.css']
})
export class FindTeacherComponent implements OnInit {
  form: FormGroup;

  esibCourses: any[];
  internationalTest: any[];
  languageList: any[];
  computerLanguageList: any[];
  hoursNeededList: any[];

  learningTypeLabel: string;
  showDD2 = false;
  showDD3 = false;

  learningOption: any[];
  secondDD: any[];
  thirdDD: any[];

  isLoggedIn = localStorage.user != null;

  userUrl = 'https://learningisfun-328b1-default-rtdb.firebaseio.com/courses.json'


  constructor(public loginPage: LoginComponent,
    private http: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.user != null;
    this.form = new FormGroup ({
      LearningType: new FormControl(''),
      LearningType2: new FormControl(''),
      LearningType3: new FormControl(''),
      HoursNeeded: new FormControl(''),
    });

    this.form.controls.LearningType.valueChanges.subscribe(x => {
      if (x) {
        switch (x) {
          case '1':
            this.secondDD = this.esibCourses;
            this.learningTypeLabel = "In which year are you ?";
            this.showDD2 = true;
            break;
          case '2':
            this.thirdDD = this.internationalTest;
            this.learningTypeLabel = "Choose your international test";
            this.showDD3 = true;
            this.showDD2 = false;
            break;
          case '3':
            this.thirdDD = this.languageList;
            this.learningTypeLabel = "Which language do you want to learn ?";
            this.showDD3 = true;
            this.showDD2 = false;
            break;
          case '4':
            this.thirdDD = this.computerLanguageList;
            this.learningTypeLabel = "Which computer language do you want to learn ?";
            this.showDD3 = true;
            this.showDD2 = false;
            break;

        }
      }
    });

    this.form.controls.LearningType2.valueChanges.subscribe(x => {
      if (x && this.form.controls.LearningType.value == '1') {
        this.showDD3 = true;
        switch (x) {
          case "1":
            this.thirdDD = [{NAME: "Chimie Générale", REF:"1"},
            {NAME: "Mécanique 1", REF:"2"},
            {NAME: "Mathématiques Discrètes", REF:"3"},
            {NAME: "Signaux Physiques", REF:"4"},
          ];
            break;
          case "2":
            this.thirdDD = [{NAME: "Mathématiques", REF:"1"},
            {NAME: "Gestion de projets", REF:"2"},
            {NAME: "Electronique analogique", REF:"3"},
            {NAME: "Probabilités et statistiques", REF:"4"},
          ]
            break;
          case "3":
            this.thirdDD = [{NAME: "Bases de données relationnelles", REF:"1"},
            {NAME: "Analyse de projets", REF:"2"},
            {NAME: "CAN", REF:"3"},
            {NAME: "Analyse de projets", REF:"4"},
          ]
            break;
          case "4":
            this.thirdDD = [{NAME: "Web ", REF:"1"},
            {NAME: "Programmation fonctionnelle", REF:"2"},
            {NAME: "Java", REF:"3"},
            {NAME: "Intelligence artificielle", REF:"4"},
          ]
            break;
        }
      }
    })

    this.learningOption = [{NAME: "Esib courses", REF:1},
    {NAME: "Prepare a Test (SAT, IELTS...)", REF:2}, 
    {NAME:"A language", REF:3},
    {NAME:"Computer language", REF:4}
    ],

    this.esibCourses = [{NAME: "SUP", REF:"1"},
      {NAME: "SPE", REF:"2"},
      {NAME: "1er", REF:"3"},
      {NAME: "2eme", REF:"4"}
    ],

    this.internationalTest = [{NAME: "SAT", REF:"1"},
      {NAME: "IELTS", REF:"2"},
      {NAME: "GMAT", REF:"3"},
      {NAME: "GRI", REF:"4"},
      {NAME: "TOEFEL", REF:"5"}
    ],

    this.languageList = [{NAME: "English", REF:"1"},
      {NAME: "Spanish", REF:"2"},
      {NAME: "German", REF:"3"},
      {NAME: "Arabic", REF:"4"},
      {NAME: "Russian", REF:"5"}
    ],

    this.computerLanguageList = [{NAME: "Python", REF:"1"},
      {NAME: "C++", REF:"2"},
      {NAME: "Java", REF:"3"},
      {NAME: "Angular", REF:"4"}
    ],


    this.hoursNeededList = ["1-5", "5-10", "10+"]
  }

  login() {
    this.loginPage.open();
  }

  addReport() {
    var json = JSON.parse(localStorage.userInfo);
    if (this.form.valid) {
      const course: course = {
        firstName: json.firstName,
        lastName: json.lastName,
        phoneNumber: json.phoneNumber,
        username: json.username,
        course: this.form.get('LearningType3').value,
        numberOfHours: this.form.get('HoursNeeded').value
      } 
      this.http.post<course>(this.userUrl, course).subscribe(res =>
        console.log(res))

        const dialogRef = this.dialog.open(MessageDialogComponent, {
          width: '400px',
          height: '200px',
      })
    }
    this.form.reset();
  }
}
