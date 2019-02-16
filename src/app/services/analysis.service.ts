import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  data: any = {};
  constructor(private db: AngularFireDatabase) { }



  public setAnalysisByTest(testId = 0) {
    var db = this.db.database;
    var result = [];

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
          result.push({ 'correctas': correctas, 'incorrectas': incorrectas, 'question': question.val().question });
        });
      });
    });
    return result;
  }
}