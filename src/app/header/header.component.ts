import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authentication: LoginService) { }

  ngOnInit() {
  }

  
  public signOut() {
    this.authentication.signOut();
}

}
