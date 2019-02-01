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
  userId: any = null;
  icon: string = 'save';
  action: boolean = true;


  title: string = '';
  description: string = '';


  test: Array<any> = [];
  testList: Array<any> = [];
  theme: Array<any> = [];
  themeList: Array<any> = [];
  question: Array<any> = [];
  questionList: Array<any> = [];
  answer: Array<any> = [];
  answerList: Array<any> = [];



  constructor(private login: LoginService, private router: Router, private testServise: TestService, private activatedRoute: ActivatedRoute, private themeService: TypeQuestionService, private answerService: AnswerService, private questionService: QuestionService
  ) {

    login.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.emailUser = this.login.getUser().currentUser.email;
        this.userId = this.login.getUser().currentUser.uid;

        this.action = (this.activatedRoute.snapshot.params.action == 'new') ? true : false;
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




  /*                   TEST                 */

  createTest(title, description) {
    this.testList.push({
      title: title,
      userId: this.userId,
      description: description,
      id: Date.now()
    });

    this.test = [];
    this.title = '';
    this.description = '';
  }


  deleteTest(data: any) {
    this.testList.splice(this.testList.indexOf(data), 1);

    for (let t = 0; t < this.themeList.length; t++) {
      if (data.id == this.themeList[t].testId) {

        for (let q = 0; q < this.questionList.length; q++) {
          if (this.themeList[t].id == this.questionList[q].themeId) {

            for (let r = 0; r < this.answerList.length; r++) {
              if (this.questionList[q].id == this.answerList[r].questionId) {
                this.answerList.splice(r, 1);
                r--;
              }

            }
            this.questionList.splice(q, 1);
            q--;
          }
        }
        this.themeList.splice(t, 1);
        t--;
      }

    }


  }

  deleteTheme(data: any) {
    this.themeList.splice(this.themeList.indexOf(data), 1);
    for (let q = 0; q < this.questionList.length; q++) {
      if (data.id == this.questionList[q].themeId) {

        for (let r = 0; r < this.answerList.length; r++) {
          if (this.questionList[q].id == this.answerList[r].questionId) {
            this.answerList.splice(r, 1);
            r--;
          }

        }
        this.questionList.splice(q, 1);
        q--;
      }
    }
  }

  deleteQuestion(data: any) {
    this.questionList.splice(this.questionList.indexOf(data), 1);

    for (let r = 0; r < this.answerList.length; r++) {
      if (data.id == this.answerList[r].questionId) {
        this.answerList.splice(r, 1);
        r--;
      }

    }

  }

  deleteAnswer(data: any) {
    this.answerList.splice(this.answerList.indexOf(data), 1);
  }

  saveTheme(theme: any, testId: any) {
    this.themeList.push({
      theme: theme.theme,
      id: Date.now(),
      testId: testId
    });
    this.theme = [];
  }

  saveQuestion(question: any, themeId: any) {
    this.questionList.push({
      question: question.question,
      id: Date.now(),
      themeId: themeId
    });
    this.question = [];

  }
  saveAnswer(answer: any, questionId: any) {
    this.answerList.push({
      answer: answer.answer,
      id: Date.now(),
      questionId: questionId,
      status: false
    });
    this.answer = [];

  }

  status(answer: any) {
    let index = 0;
    this.answerList.forEach(element => {

      if (element.questionId == answer.questionId) {
        if (element.id == answer.id) {
          element.status = true;
          this.answerList.splice(index, 1, element);
        } else {
          element.status = false;
          this.answerList.splice(index, 1, element);
        }
      }
      index++;
    })

  }


  /*                 *******                */


  close() {
    this.isAuthenticated = false;
    this.emailUser = null;
    this.test = [];
    this.title = '';
    this.description = '';
    this.icon = 'save';
    this.action = true;
    this.testServise.data = {};
    this.router.navigate(['/test']);
  }


  saveAll() {

    this.testServise.setTest(this.testList);
    this.themeService.setTypeQuestion(this.themeList);
    this.questionService.setQuestion(this.questionList);
    this.answerService.setAnswer(this.answerList);
    
    this.title = '';
    this.description = '';


    this.answerList = [];
    this.themeList = [];
    this.questionList = [];
    this.testList = [];
    this.answer = [];
    this.theme = [];
    this.question = [];
    this.test = [];
  }


}
