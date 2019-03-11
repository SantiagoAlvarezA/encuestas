import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean = false;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  arrayImg: Array<string> = [
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/50469991_242412170002805_3679487508841758720_n.jpg?alt=media&token=22c1f366-3dc1-4c96-a165-91c6a19ba2f2',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/50719301_236486020568360_5783085125176655872_n.jpg?alt=media&token=f3498523-45a8-43f0-920e-fd057df70604',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/50666615_244394243153755_3967444149547827200_n.jpg?alt=media&token=0162cb83-bfd9-4238-b782-d58e713df2e7'

  ];
  pos = 3;
  images = [1, 2, 3].map(() =>
    this.arrayImg[this.position()]
  );

  position() {
    if (this.pos < 0) {
      this.pos = 0
    } else {
      this.pos--;
    }
    return this.pos;
  }

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
