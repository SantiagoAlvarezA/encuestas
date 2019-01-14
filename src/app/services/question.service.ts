import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  data: any = {};

  constructor(private db: AngularFireDatabase) {

  }

  public setQuestion(questionData) {
    questionData.forEach(question => {
      this.db.database.ref('question/' + question.id).set(question);
    });
  }

  public getQuestions() {
    return this.db.list('question').valueChanges();
  }

  public updateQuestion(question) {
    this.db.database.ref('question/' + question.id).set(question);
  }

  public deleteQuestion(id) {
    this.db.object('question/' + id).remove();
  }

  public getQuestion(id) {
    return this.db.object('question/' + id);
  }

  getQuestionOfThemeId(themeId) {
    var data = [];
    this.db.list('question/').valueChanges().subscribe(d => {

      d.forEach(element => {
        if (element['themeId'] == themeId) {

          data.push(element);

        }
      });
    });
    return data;

  }
}
