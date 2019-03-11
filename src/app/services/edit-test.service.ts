import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditTestService {

  data: any = {};
  constructor(private db: AngularFireDatabase) { }

  async getDataForEditTest(testId: 0) {
    const ref = this.db.database.ref();
    //este metodo deve optener todos los datos relacioados a un test 
    // como preguntas, respuestas, temas

    var theme: Array<any> = [];
    var question: Array<any> = [];
    var answer: Array<any> = [];
    var data: any = { 'theme': theme, 'question': question, 'answer': answer };
    ref.child('typeQuestion').orderByChild('testId').equalTo(testId).on('child_added', typeQuestion => {
      // console.log(typeQuestion.val());
      theme.push(typeQuestion.val());

      typeQuestion.forEach(typeQuestion => {
        ref.child('question').orderByChild('themeId').equalTo(typeQuestion.val().id).on('child_added', questionSnap => {
          question.push(questionSnap.val());

          questionSnap.forEach(questionSnap => {
            ref.child('answer').orderByChild('questionId').equalTo(questionSnap.val().id).on('child_added', answerSnap => {
              answer.push(answerSnap.val());
            });
          })
        });
      });
    });
    console.log(data, ' back');
    return await new Observable(observer => {
      setInterval(() => observer.next(data))
    });
  }

}
