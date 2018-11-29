import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css']
})
export class NewTestComponent implements OnInit {

  isAuthenticated: boolean = false;
  emailUser: any = null;
  test: any = {};
  tests = null;
  icon: string = 'plus';
  action: boolean = true;

  constructor(private login: LoginService, private router: Router, private testServise: TestService) {
    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;
        //this.router.navigate(['/test']);
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


  public setTest() {
    this.test.id = Date.now();
    this.testServise.setTest(this.test);
    this.clearForm();
  }

  public clearForm() {
    this.test = {};
  }


  public updateTest() {
    this.testServise.updateTest(this.test);
    this.clearForm();
    this.icon = 'plus';
    this.action = true;
  }

  public deleteTest(id) {
    this.testServise.deleteTest(id);
  }

  public getTest(id) {
    this.testServise.getTest(id).valueChanges().subscribe(test => {
      this.test = test;
      this.router.navigate(['/test/update']);
      // this.icon = 'sync-alt';
      // this.action = false;
    });
  }
  public newTest() {

    this.router.navigate(['/test/new']);


  }

  setAction() {
    if (this.action) {
      this.setTest();
    } else {
      this.updateTest();
    }
  }

}
