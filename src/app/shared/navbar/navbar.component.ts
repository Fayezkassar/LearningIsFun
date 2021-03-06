import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeTab = '';
  pages :any[];

  constructor(public loginPage: LoginComponent, public router: Router) { }

  ngOnInit(): void {
    this.pages = [
      {
      pageDisplayName: 'Home',
      routeName: 'home'
      },
      {
        pageDisplayName: 'Find A Teacher',
        routeName: 'findTeacher',
      },
      {
        pageDisplayName: 'Dedicated For Teachers',
        routeName: 'findStudents',
      },
      {
        pageDisplayName: 'Contact Us',
        routeName: 'contact-us',
      },
      {
        pageDisplayName: localStorage.user ? 'Profile' : 'Sign in',
        routeName: 'login',
      },
    ];
  }

  navigateToPage(pageName: string): void {
    this.activeTab = pageName;
    if (pageName === 'login') {
      this.loginPage.open();
    }else{
      this.router.navigate([pageName]);
    }
  }
}
