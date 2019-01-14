import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { ResultsService } from '../services/results.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { TypeQuestionService } from '../services/type-question.service';
import { AnswerService } from '../services/answer.service';
import { forEach } from '@angular/router/src/utils/collection';
import { database } from 'firebase';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  test: any = {};
  user: any = {};
  isAuthenticated: boolean = false;

  data: any = [];

  constructor(private testService: TestService, private resultServise: ResultsService, private authentication: LoginService, private router: Router, private questionService: QuestionService, private typeQuestionService: TypeQuestionService, private answerService: AnswerService) {




    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {

        this.test = this.testService.data;
        this.dataAnalysis(this.testService.data.id);
        this.testService.data = {};

        this.isAuthenticated = true;
        let id: string = this.authentication.getUser().currentUser.uid;
        this.user = this.authentication.getUs(id).valueChanges().subscribe(user => {
          this.user = user;
        });



      } else {
        this.isAuthenticated = false;
      }

    }, (error) => {
      this.isAuthenticated = false;

    });


  }

  ngOnInit() {
  }

  dataAnalysis(id) {
    this.typeQuestionService.getTypeQuestions().subscribe(theme => {
      theme.forEach(theme => {
        if (theme['testId'] == id) {
          this.questionService.getQuestions().subscribe(question => {

            question.forEach(question => {
              if (question['themeId'] == theme['id']) {
                var correctas = 0;
                var incorrectas = 0;
                
                this.answerService.getAnswers().subscribe(answer => {
                  answer.forEach(answer => {
                    if (answer['questionId'] == question['id']) {

                      this.resultServise.getRersults().subscribe(result => {
                        result.forEach(result => {


                          if (answer['id'] == result['answerId']) {

                            this.answerService.getAnswer(result['answerId']).valueChanges().subscribe(status => {

                              if (status['status']) {
                                correctas++;
                              } else {
                                incorrectas++;
                              }

                              question['correctas']=  correctas ;
                              question['incorrectas']=  incorrectas ;
                            });


                          }


                        });


                      })





                      // console.log(answer);
                    }
                  });

                });

             
                this.data.push(question);







              }
            });
          });
        }

      });

    });
    console.log(this.data)
  }


}
