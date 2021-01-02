import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public loginPage: LoginComponent,
              public router: Router) { }

  ngOnInit(): void {
  }

  public openLogin(): void {
    this.loginPage.open();
  }

  public openProfile(): void {
    this.router.navigate(['../profile']);
  }

}
