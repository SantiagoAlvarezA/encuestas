import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  data: any = {};
  constructor(private db: AngularFireDatabase) { }


  setAnalysisByTest(testId = 0) {
    var result: Array<any> = [];
    var data = [];
    var db = this.db.database;
    db.ref('typeQuestion').orderByChild('testId').equalTo(testId).on('child_added', theme => {
      db.ref('question').orderByChild('themeId').equalTo(theme.val().id).on('child_added', question => {
        db.ref('results').orderByChild('questionId').equalTo(question.val().id).once('value', snapshot => {
          var correctas = 0;
          var incorrectas = 0;
          snapshot.forEach(i => {
            if (i.val().status) {
              correctas++;
            } else {
              incorrectas++;
            }
          });
          result.push({
            'correctas': correctas,
            'incorrectas': incorrectas,
            'question': question.val().question
          });
        });
      });
    });
    return result;

  }
}