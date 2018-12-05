import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TypeQuestionService {
  data: any = {};

  constructor(private db: AngularFireDatabase) {

  }

  public setTypeQuestion(typeQuestion) {
    this.db.database.ref('typeQuestion/' + typeQuestion.id).set(typeQuestion);
  }

  public getTypeQuestions() {
    return this.db.list('typeQuestion').valueChanges();
  }

  public updateTypeQuestion(typeQuestion) {
    this.db.database.ref('typeQuestion/' + typeQuestion.id).set(typeQuestion);
  }

  public deleteTypeQuestion(id) {
    this.db.object('typeQuestion/' + id).remove();
  }

  public getTypeQuestion(id) {
    return this.db.object('typeQuestion/' + id);
  }


}
