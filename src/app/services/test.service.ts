import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private db: AngularFireDatabase) {

  }

  public setTest(test) {
    this.db.database.ref('test/' + test.id).set(test);
  }

  public getTests() {
    return this.db.list('test').valueChanges();
  }

  public updateTest(test) {
    this.db.database.ref('test/' + test.id).set(test);
  }

  public deleteTest(id) {
    this.db.object('test/' + id).remove();
  }

  public getTest(id){
    return this.db.object('test/' + id);
  }

}
