import { Component, OnInit, isDevMode } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  isModalEps: boolean = false;
  isModalCondicional: boolean = false;
  isModalOpenEps: boolean = false;
  isModalOpenCondicional: boolean = false;
  panelOpenState = false;

  constructor() { }

  ngOnInit() {

  }
  toggleModalEps() {
    this.isModalEps = !this.isModalEps;
    
  }

  toggleModalOpenEps(){
    if (this.isModalOpenEps){
      this.isModalEps= false;
      this.isModalOpenEps = false;
    } else{
      this.isModalEps= true;
      this.isModalOpenEps = true;
    }
  }
  toggleModalCondicional() {
    this.isModalCondicional = !this.isModalCondicional;
    
  }
  toggleModalOpenCondicional(){
    if (this.isModalOpenCondicional){
      this.isModalCondicional= false;
      this.isModalOpenCondicional = false;
    } else{
      this.isModalCondicional= true;
      this.isModalOpenCondicional = true;
    }
  }

}
