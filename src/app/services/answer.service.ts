import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  data: any = {};

  constructor(private db: AngularFireDatabase) {

  }

  public setAnswer(answer) {
    this.db.database.ref('answer/' + answer.id).set(answer);
  }

  public getAnswers() {
    return this.db.list('answer').valueChanges();
  }

  public updateAnswer(answer) {
    this.db.database.ref('answer/' + answer.id).set(answer);
  }

  public deleteAnswer(id) {
    this.db.object('answer/' + id).remove();
  }

  public getAnswer(id) {
    return this.db.object('answer/' + id);
  }
}
