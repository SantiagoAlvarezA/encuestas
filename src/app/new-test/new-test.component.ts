import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../services/test.service';
import { TypeQuestionService } from '../services/type-question.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { QuestionService } from '../services/question.service';

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

  //preguntas

  answer: any = {};
  modalAnswer: boolean = false;
  status: boolean = false;
  textButton: string = 'Respuesta incorrecta';
  themeId: string;
  question:any = {};

  /////


  constructor(private login: LoginService, private router: Router, private testServise: TestService, private activatedRoute: ActivatedRoute, private typeQuestionService: TypeQuestionService, private answerService: AnswerService, private questionService:QuestionService
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
        this.themes = this.typeQuestionService.getTypeQuestions();
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

  close() {
    this.isAuthenticated = false;
    this.emailUser = null;
    this.test = {};
    this.tests = null;
    this.icon = 'save';
    this.action = true;
    this.add = false;
    this.modal = false;
    this.typeQuestion = {};
    this.themes = null;
    this.testServise.data = {};
    this.router.navigate(['/test']);
  }

  openModalAnswer() {
    this.modalAnswer = !this.modalAnswer;
  }

  textBtn() {
    this.status = !this.status;
    if (this.status) {
      this.textButton = 'Respuesta correcta';
    } else {
      this.textButton = 'Respuesta incorrecta';
    }

    console.log(this.textButton);
  }

  saveAnswer() {
    this.answer.id = Date.now();
    this.answer.status = this.status;
    this.answerService.setAnswer(this.answer);
    this.openModalAnswer();
  }

  setIdTheme(id) {
    this.themeId = id;
  }


  saveQuestion(){

    this.question.id = Date.now();
    this.question.themeId = this.themeId;
    this.questionService.setQuestion(this.question);

  }

}
