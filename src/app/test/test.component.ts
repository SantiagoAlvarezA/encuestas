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
  user:any = {};
  rol:boolean;

  constructor(private login: LoginService, private router: Router, private testServise: TestService) {
    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;
        this.router.navigate(['/test']);
        this.tests = testServise.getTests();


        let id:string = this.login.getUser().currentUser.uid;
        this.user = this.login.getUs(id).valueChanges().subscribe(user =>{
          this.user = user;
          this.rol = (this.user.rol == 'teacher') ? true : false;
        });
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
  }

  public getTest(id) {
    this.testServise.getTest(id).valueChanges().subscribe(test => {
            this.testServise.data = test;
      this.router.navigate(['/test/update']);
    });
  }

  public newTest( ){
    this.router.navigate(['/test/new']);
  }

}
