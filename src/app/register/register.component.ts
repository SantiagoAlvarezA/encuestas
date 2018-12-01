import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  icon:string="user-graduate";
  login: any = {};
  user: any = {};

  isAuthenticated: boolean = true;

  constructor(private authentication: LoginService, private router: Router, private route: ActivatedRoute) {
    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.router.navigate(['']);
      } else {
        this.isAuthenticated = false;
        this.user.rol = this.route.snapshot.params.rol;
        this.icon = (this.user.rol == 'teacher')? 'chalkboard-teacher':'user-graduate';
        // console.log(this.rol);
      }
    }, (error) => {
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {

  }

  public register() {
    this.user.email = this.login.email;
    this.authentication.register(this.login.email, this.login.password, this.user);
  }
}
