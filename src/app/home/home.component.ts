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
  isAuthenticated = false;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  arrayImg: Array<string> = [
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/50469991_242412170002805_3679487508841758720_n.jpg?alt=media&token=22c1f366-3dc1-4c96-a165-91c6a19ba2f2',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/50719301_236486020568360_5783085125176655872_n.jpg?alt=media&token=f3498523-45a8-43f0-920e-fd057df70604',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/50666615_244394243153755_3967444149547827200_n.jpg?alt=media&token=0162cb83-bfd9-4238-b782-d58e713df2e7',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/3d85c670-851d-47d1-acf0-89a94a090717.jpg?alt=media&token=8effec1e-265d-4099-98b4-8cca56c3c44d',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/3a1c3412-aa37-4796-b5e8-c785d460ee85.jpg?alt=media&token=ea0f43a6-d5de-4b69-9813-e38a7185b637',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/371ef810-9020-47fb-9a00-2a63e4b4106a.jpg?alt=media&token=faf08070-767b-4cde-9d01-53167729e041',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/2b0cda14-171c-4fad-883a-7b05e8824ee3.jpg?alt=media&token=ac7e0947-67fc-433d-b32e-b750edcd6269',
    'https://firebasestorage.googleapis.com/v0/b/algoritbuild-10.appspot.com/o/151ee191-0b93-4b81-8283-374d676e6235.jpg?alt=media&token=4ba6b795-19b4-489e-8251-844a78b86834'
  ];
  pos = 8;
  images = [1, 2, 3, 4, 5, 6, 7, 8].map(() =>
    this.arrayImg[this.position()]
  );

  position() {
    if (this.pos < 0) {
      this.pos = 0;
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
