import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  login: any = {};
  
  isAuthenticated: boolean = true;

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
    }); }

  ngOnInit() {
  }

  public register() {
    this.authentication.register(this.login.email, this.login.password);
  }
}
