import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  isAuthenticated: boolean = true;


  alerts: any = [];


  constructor(private authentication: LoginService, private router: Router) {
    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.router.navigate(['/']);
      } else {
        this.isAuthenticated = false;
      }
    }, (error) => {
      this.isAuthenticated = false;

    });

  }


  ngOnInit() {
  }
  async signIn() {
    this.alerts = [];
    this.authentication.signIn(this.login.email, this.login.password);
  }





}
