import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  data: any = {};
  result: Array<any> = [];
  constructor(private db: AngularFireDatabase) { }



  public setAnalysisByTest(testId = 0) {
    var db = this.db.database;
    this.result = [];

    db.ref('typeQuestion').orderByChild('testId').equalTo(testId).on('child_added', theme => {
      db.ref('question').orderByChild('themeId').equalTo(theme.val().id).on('child_added', question => {
        db.ref('results').orderByChild('questionId').equalTo(question.val().id).on('value', snapshot => {
          var correctas = 0;
          var incorrectas = 0;
          snapshot.forEach(i => {
            if (i.val().status) {
              correctas++;
            } else {
              incorrectas++;
            }
          });
          this.result.push({ 'correctas': correctas, 'incorrectas': incorrectas, 'question': question.val().question });
        });
      });
    });
    // return this.result;
  }
}