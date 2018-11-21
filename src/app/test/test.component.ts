import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  isAuthenticated: boolean = false;
  emailUser: any = null;

  constructor(private login: LoginService, private router: Router) {
    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;
        this.router.navigate(['']);
      } else {
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    }, (error) => {
      this.isAuthenticated = false;
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

}
