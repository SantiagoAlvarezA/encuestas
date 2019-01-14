import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  isAuthenticated: boolean = false;
  emailUser: any = null;
  test: any = {};
  tests = null;
  icon: string = 'plus';
  action: boolean = true;
  user: any = {};
  tes: any;
  rol: boolean;

  constructor(private login: LoginService, private router: Router, private testServise: TestService) {
    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;

        let id: string = this.login.getUser().currentUser.uid;
        this.user = this.login.getUs(id).valueChanges().subscribe(user => {
          this.user = user;
          this.rol = (this.user.rol == 'teacher') ? true : false;
        });
        this.tests = testServise.getTests();



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

  public deleteTest(id) {
    this.testServise.deleteTest(id);
    this.router.navigate(['test']);
  }

  public getTest(test) {
    this.testServise.data = test;

    // this.testServise.getTest(id).valueChanges().subscribe(test => {
    //   this.testServise.data = test;
    this.router.navigate(['/test/update']);
    // });

  }

  public newTest() {
    this.testServise.data = {};
    this.router.navigate(['/test/new']);
  }


  setComment(test){
    this.testServise.data = test;
    this.router.navigate(['/comments']);
  }

 solveTest(test){
    this.testServise.data = test;
    this.router.navigate(['/solve']);
  }

  setDataAnalysis(test:any){
    this.testServise.data = test;
    this.router.navigate(['/data-analysis']);
  }


}
