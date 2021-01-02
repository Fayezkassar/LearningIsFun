import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { HttpClient } from  '@angular/common/http';
import { user } from './user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginOpen = false;
  isloggedIn = false;
  signinPage = true;
  signupPage = false;
  userInfo: any;
  error: string;
  emailAddress: string;
  userUrl = 'https://learningisfun-328b1-default-rtdb.firebaseio.com/users.json'

  constructor(public firebaseService: FirebaseService,
              private http: HttpClient) { }

  ngOnInit(): void {
    if(localStorage.user != null) {
      var json = JSON.parse(localStorage.user);
      this.emailAddress = json.email;
    }
    this.isloggedIn = localStorage.user != null;
    this.form = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null)
  });
  }

  async onSignin() {
    if (this.form.valid) {
      const user = this.form.getRawValue();
      const username = user.username !== undefined && user.username !== null ? user.username.trim() : '';
      const password = user.password !== undefined && user.password !== null ? user.password.trim() : '';
      this.http.get<user>(this.userUrl).pipe(map(resData =>{
        for(const key in resData) {
          if(resData[key].username == username)
            this.userInfo = resData[key]
        }
      }))
      .subscribe(res =>
        console.log(res))
      await this.firebaseService.signin(username,password).catch(error =>
        this.error = error);
        
      if(this.firebaseService.isLoggedIn) {
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        this.isloggedIn = true
        var json = JSON.parse(localStorage.user);
        this.emailAddress = json.email;
        this.form.reset();
        this.close()
      }
    }
  }


  async onSignup() {
    if (this.form.valid) {
      const user = this.form.getRawValue();
      const username = user.username !== undefined && user.username !== null ? user.username.trim() : '';
      const password = user.password !== undefined && user.password !== null ? user.password.trim() : '';
      const userInfo: user = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: username,
        phoneNumber: user.phoneNumber
      }
      
      await this.firebaseService.signup(username,password).catch(error =>
        this.error = error)
      if(this.firebaseService.isLoggedIn) {
        this.http.post<user>(this.userUrl, user).subscribe(res =>
          console.log(res))
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        this.isloggedIn = true
        var json = JSON.parse(localStorage.user);
        this.emailAddress = json.email;
        this.form.reset();
        this.close()
      }
    }
  }

  signOut() {
    this.firebaseService.logout()
    this.form.reset();
    this.isloggedIn = false;
  }

  switchToSignUp() {
    this.form.get("firstName").setValidators(Validators.required)
    this.form.get("lastName").setValidators(Validators.required)
    this.form.get("phoneNumber").setValidators(Validators.required)
    this.signinPage = false;
    this.signupPage = true;
  }

  switchToSignIn() {
    this.form.get("firstName").setValidators(null)
    this.form.get("lastName").setValidators(null)
    this.form.get("phoneNumber").setValidators(null)
    this.signinPage = true;
    this.signupPage = false;
  }

  open(): void {
    document.querySelector('#app_login').classList.add('open');
    this.loginOpen = true;
  }

  close(): void {
    document.querySelector('#app_login').classList.remove('open');
    this.loginOpen = false;
  }

}
