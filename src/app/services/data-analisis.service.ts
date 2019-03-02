import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAnalisisService {

  data: any = {};
  constructor(private db: AngularFireDatabase) { }

  async dataByTest(testId: any = 0) {
    var dataTest: Array<any> = [];
    var db = this.db.database;
    db.ref('question').orderByChild('testId').equalTo(testId).on('child_added', question => {
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
        dataTest.push(
          { correctas: correctas, incorrectas: incorrectas, question: question.val().question }
        );
      });
    });
    return await new Observable(observer => {
      setInterval(() => observer.next(dataTest))
    });
  }

  async dataByGroups(testId: any = 0, groupSelected: any = '', programSelected: any = '') {
    var db = this.db.database;
    var dataByGroup: Array<any> = [];
    db.ref('users').orderByChild('group_program').equalTo(groupSelected + '_' + programSelected).on('child_added', student => {
      var good: number = 0;
      var bad: number = 0;
      db.ref('question').orderByChild('testId').equalTo(testId).on('child_added', question => {
        db.ref('results').orderByChild('student_question').equalTo(student.val().id + '_' + question.val().id).once('value', snapshot => {
          snapshot.forEach(result => {
            if (result.val().status) {
              good++;
            } else {
              bad++;
            }
          });
        }).then(() => {
          dataByGroup.push({
            studentId: student.val().id, name: student.val().firstName + ' ' + student.val().firstSurname, good: good, bad: bad, average: (((good + bad) * good) / 100) * 100 + ' PUNTOS DE 100 POSIBLES'
          });
        });
      });
    });
    return await new Observable(observer => {
      setInterval(() => observer.next(this.removeDuplicates(dataByGroup, "studentId")))
    });


  }


  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};
    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
}
