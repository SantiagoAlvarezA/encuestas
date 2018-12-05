import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../services/test.service';
import { TypeQuestionService } from '../services/type-question.service';

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
  icon: string = 'save';
  action: boolean = true;
  add: boolean = false;
  modal: boolean = false;
  typeQuestion: any = {};
  themes: any = null;


  constructor(private login: LoginService,
    private router: Router,
    private testServise: TestService,
    private activatedRoute: ActivatedRoute,
    private typeQuestionService: TypeQuestionService
  ) {
    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;
        this.test = testServise.data;
        this.tests = testServise.getTests();
        this.action = (this.activatedRoute.snapshot.params.action == 'new') ? true : false;
        this.idTest();
        this.icon = (this.activatedRoute.snapshot.params.action == 'new') ? 'save' : 'sync-alt';
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
    this.icon = 'save';
    this.action = true;
  }




  setAction() {
    if (this.action) {
      this.setTest();
    } else {
      this.updateTest();
    }
  }

  public addQ() {
    this.add = !this.add;
  }
  public openModal() {
    this.modal = !this.modal;
  }

  public idTest() {
    if (this.action) {
      this.test.id = Date.now();
    }
  }

  public setTypeQuestion() {
    this.typeQuestion.id = Date.now();
    this.typeQuestion.testId = this.test.id;
    this.typeQuestionService.setTypeQuestion(this.typeQuestion);
    this.modal = !this.openModal;
  }


  public getThemes() {
    this.typeQuestionService.getTypeQuestions().subscribe(themes => {
      this.themes = themes;
    });
  }

}
