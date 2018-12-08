import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { TypeQuestionService } from '../services/type-question.service';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solve-test',
  templateUrl: './solve-test.component.html',
  styleUrls: ['./solve-test.component.css']
})
export class SolveTestComponent implements OnInit {

  isAuthenticated: boolean = true;
  user: any = null;

  test: any = null;

  theme: any = null;
  themes: any = null;
  questions: any = null;
  answers: any = null;

  data: any = {};

  constructor(private testServise: TestService, private themeService: TypeQuestionService, private questionService: QuestionService, private answerService: AnswerService, private loginService: LoginService, private router: Router) {

    this.loginService.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.test = this.testServise.data;
        this.themes = this.themeService.getTypeQuestions();
        this.questions = this.questionService.getQuestions();
        this.answers = this.answerService.getAnswers();

        let id: string = this.loginService.getUser().currentUser.uid;
        this.user = this.loginService.getUs(id).valueChanges().subscribe(user => {
          this.user = user;
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

  public setAnswer(questionId, answerId) {




  }


}
