import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isAuthenticated: boolean = false;
  textButton: string;
  icon: string = 'power-off';
  iconUser: string = 'user-graduate';
  user: any = {};
  constructor(private authentication: LoginService, private router: Router) {
    //this.user = authentication.getUid();
    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        let id: string = this.authentication.getUser().currentUser.uid;
        this.user = this.authentication.getUs(id).valueChanges().subscribe(user => {
          this.user = user;
          //this.iconUser = (this.user.rol == 'teacher') ? 'chalkboard-teacher' : 'user-graduate';
        });


      } else {
        this.isAuthenticated = false;

      }
      this.icon = (this.isAuthenticated) ? 'power-off' : 'sign-in-alt';
      this.textButton = (this.isAuthenticated) ? 'Cerrar sesión' : 'Iniciar sesión';

    }, (error) => {
      this.isAuthenticated = false;

    });


  }

  ngOnInit() {
  }

  public action() {
    if (this.isAuthenticated) {
      this.signOut();
      this.textButton = 'Iniciar sesión';
      this.icon = 'sign-in-alt';
    } else {
      this.router.navigate(['/login']);
    }
  }


  public signOut() {
    this.authentication.signOut();
    this.isAuthenticated = false;
    this.user = {};
  }



}
