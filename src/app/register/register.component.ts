import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  icon: string = "user-graduate";
  login: any = {};
  user: any = {};

  rol: boolean = false;
  isAuthenticated: boolean = true;

  group: Array<any> = [
    '2019A', '2019B',
    '2020A', '2020B',
    '2021A', '2021B',
    '2022A', '2022B',
    '2023A', '2023B',
    '2024A', '2024B',
    '2025A', '2025B',
    '2026A', '2026B',
    '2027A', '2027B',
    '2028A', '2028B'
  ];

  constructor(private authentication: LoginService, private router: Router, private route: ActivatedRoute) {
    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.router.navigate(['']);
      } else {
        this.isAuthenticated = false;
        this.user.rol = this.route.snapshot.params.rol;
        this.icon = (this.user.rol == 'teacher') ? 'chalkboard-teacher' : 'user-graduate';
        this.rol = (this.user.rol == 'teacher') ? false : true;
        // console.log(this.rol);
      }
    }, (error) => {
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {

  }

  public register() {
    //pendiente para validaciones
    this.user.email = this.login.email;
    this.authentication.register(this.login.email, this.login.password, this.user);

  }
}
