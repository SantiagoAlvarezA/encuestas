import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  isAuthenticated: boolean = false;

  id_cat: string = '';


  constructor(private login: LoginService, private router: Router) {
    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        // this.emailUser = this.login.getUser().currentUser.email;
        this.router.navigate(['/games']);
      } else {
        this.isAuthenticated = false;
        this.router.navigate(['']);
      }
    }, (error) => {
      this.isAuthenticated = false;
      this.router.navigate(['']);
    });
  }

  ngOnInit() {
  }

  setIdCat(event) {
    this.id_cat = event.data;
  }

}
