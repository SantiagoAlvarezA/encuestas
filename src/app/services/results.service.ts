import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private db: AngularFireDatabase) { }

  public setRersult(resultData) {
    resultData.forEach(result => {
     this.db.database.ref('results/' + result.id).set(result);

    });
  }

  public getRersults() {
    return this.db.list('results').valueChanges();
  }
}
