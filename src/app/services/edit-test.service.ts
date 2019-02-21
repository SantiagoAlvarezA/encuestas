import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EditTestService {

  data: any = {};
  constructor(private db: AngularFireDatabase) { }

  public getDataForEditTest(testId: 0) {
    const ref = this.db.database.ref();
    //este metodo deve optener todos los datos relacioados a un test 
    // como preguntas, respuestas, temas

    var theme: Array<any> = [];
    var question: Array<any> = [];
    var answer: Array<any> = [];
    var data: any = { 'theme': theme, 'question': question, 'answer': answer };
    ref.child('typeQuestion').orderByChild('testId').equalTo(testId).once('value', typeQuestion => {
      console.log('theme', typeQuestion.val());
      theme.push(typeQuestion.val());

      typeQuestion.forEach(typeQuestion => {
        ref.child('question').orderByChild('themeId').equalTo(typeQuestion.val().id).once('value', questionSnap => {
          question.push(questionSnap.val());
          questionSnap.forEach(questionSnap => {
            ref.child('answer').orderByChild('questionId').equalTo(questionSnap.val().id).once('value', answerSnap => {
              answer.push(answerSnap.val());
            });
          })

        });
      });





    });


    console.log('data', data);
    return data;
  }

}
