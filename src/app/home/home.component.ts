import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1, 2, 3].map(() => `https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/50469991_242412170002805_3679487508841758720_n.jpg?alt=media&token=22c1f366-3dc1-4c96-a165-91c6a19ba2f2`);

  constructor(config: NgbCarouselConfig, private _http: HttpClient,
      private authentication: LoginService) {
    
    // customize default values of carousels used by this component tree
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;


    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    }, (error) => {
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {
  }

}
