import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GROUP } from '../group-model';
import { PROGRAM } from '../program-model';

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
  group = GROUP;
  program = PROGRAM;




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
    if (this.rol) {
      this.user.email = this.login.email;
      this.user.group_program = this.user.group+'_'+this.user.program;
      this.authentication.register(this.login.email, this.login.password, this.user);
    } else {
      this.user.email = this.login.email;
      this.authentication.register(this.login.email, this.login.password, this.user);
    }
  }
}
