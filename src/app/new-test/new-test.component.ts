import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../services/test.service';
import { TypeQuestionService } from '../services/type-question.service';
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
  icon: string = 'save';
  action: boolean = true;


  tests: any = null;
  test: any = {};
  themes: any = null;
  theme: any = {};
  questions: any = null;
  question: any = {};
  answers: any = null;
  answer: any = {};


  // tstRespuesta:any = {};


  /*                 MODALES                */
  modalTheme: boolean = false;
  modalQuestion: boolean = false;
  modalAnswer: boolean = false;
  /*                 *******                */



  //preguntas

  status: boolean = false;
  textButton: string = 'Respuesta incorrecta';


  /////


  constructor(private login: LoginService, private router: Router, private testServise: TestService, private activatedRoute: ActivatedRoute, private themeService: TypeQuestionService, private answerService: AnswerService, private questionService: QuestionService
  ) {

    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;



        this.test = testServise.data;
        this.themes = this.themeService.getTypeQuestions();
        this.questions = this.questionService.getQuestions();
        this.answers = this.answerService.getAnswers();




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


  /*                 MODALES                */

  openModalTheme() {
    this.modalTheme = !this.modalTheme;
  }

  openModalQuestion(themeId) {
    this.modalQuestion = !this.modalQuestion;
    this.question.themeId = themeId;
  }

  openModalAnswer(questionId) {
    this.modalAnswer = !this.modalAnswer;
    this.answer.questionId = questionId;
  }

  /*                 *******                */


























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




  public idTest() {
    if (this.action) {
      this.test.id = Date.now();
    }
  }


  close() {
    this.isAuthenticated = false;
    this.emailUser = null;
    this.test = {};
    this.tests = null;
    this.icon = 'save';
    this.action = true;
    this.themes = null;
    this.testServise.data = {};
    this.router.navigate(['/test']);
  }


  textBtn() {
    this.status = !this.status;
    if (this.status) {
      this.textButton = 'Respuesta correcta';
    } else {
      this.textButton = 'Respuesta incorrecta';
    }
  }


  saveTheme(){
    this.theme.testId = this.test.id;
    this.theme.id = Date.now();
    this.themeService.setTypeQuestion(this.theme);
    this.theme = {};
    this.openModalTheme();
  }

  saveQuestion() {
    this.question.id = Date.now();
    this.questionService.setQuestion(this.question);
    this.question = {};
    this.modalQuestion = !this.modalQuestion;
  }

  saveAnswer() {
    this.answer.id = Date.now();
    this.answer.status = this.status;
    this.answerService.setAnswer(this.answer);
    this.answer = {};
    this.modalAnswer = !this.modalAnswer;
    this.status = false;
  }




}
