import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private login: LoginService, private router: Router, private testServise: TestService, private activatedRoute: ActivatedRoute) {
    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;
        this.test = testServise.data;
        this.tests = testServise.getTests();
        this.action = (this.activatedRoute.snapshot.params.action == 'new') ? true : false;
        this.icon = (this.activatedRoute.snapshot.params.action == 'new') ? 'plus' : 'sync-alt';
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
    this.test.userId = this.login.getUser().currentUser.uid;
    this.testServise.setTest(this.test);
    this.clearForm();
  }

  public clearForm() {
    this.test = {};
  }


  public updateTest() {
    this.testServise.updateTest(this.test);
    // this.testServise.data = {};
    this.clearForm();
    this.icon = 'plus';
    this.action = true;
  }

 

  public getTest(id) {
    this.testServise.getTest(id).valueChanges().subscribe(test => {
      // this.test = test;
      this.router.navigate(['/test/update']);
      // this.icon = 'sync-alt';
      // this.action = false;
    });
  }


  setAction() {
    if (this.action) {
      this.setTest();
    } else {
      this.updateTest();
    }
  }

}
