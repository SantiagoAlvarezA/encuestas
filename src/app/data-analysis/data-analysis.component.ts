import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { GROUP } from '../group-model';
import { PROGRAM } from '../program-model';
import { AngularFireDatabase } from '@angular/fire/database';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  test: any = {};
  user: any = {};
  isAuthenticated: boolean = false;
  group = GROUP;
  program = PROGRAM;

  dataTest: Array<any> = [];
  byTest: boolean = false;
  byGroup: boolean = false;
  tableByGroup: boolean = false;

  correctas: Array<any> = [];
  incorrectas: Array<any> = [];
  preguntas: any[] = [];
  selectedGroup: string = '';
  selectedProgram: string = '';

  dataByGroup: Array<any> = [];

  constructor(private authentication: LoginService, private router: Router, private db: AngularFireDatabase, private testService: TestService) {
    this.test = this.testService.data;
    this.testService.data = {};
    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        let id: string = this.authentication.getUser().currentUser.uid;
        this.user = this.authentication.getUs(id).valueChanges().subscribe(user => {
          this.user = user;
        });

        this.dataByTest();
      } else {
        this.isAuthenticated = false;
      }
    }, (error) => {
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {

  }
  showByGroups() {
    this.byTest = false;
    this.byGroup = !this.byGroup;
  }

  showByTest() {
    this.byGroup = false;
    this.dataByTest();
  }

  dataByGroups() {
    this.tableByGroup = false;
    this.dataByGroup = [];
    var db = this.db.database;
    var dataByGroup: Array<any> = [];
    db.ref('users').orderByChild('group_program').equalTo(this.selectedGroup + '_' + this.selectedProgram).on('child_added', student => {
      var good: number = 0;
      var bad: number = 0;
      db.ref('question').orderByChild('testId').equalTo(this.test.id).on('child_added', question => {
        db.ref('results').orderByChild('student_question').equalTo(student.val().id + '_' + question.val().id).once('value', snapshot => {
          snapshot.forEach(result => {
            if (result.val().status) {
              good++;
            } else {
              bad++;
            }
          });
        }).then(res => {
          dataByGroup.push({
            studentId: student.val().id, name: student.val().firstName + ' ' + student.val().firstSurname, good: good, bad: bad
          });
          this.dataByGroup = this.removeDuplicates(dataByGroup, "studentId");
          this.tableByGroup = true;
        });
      });
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


  dataByTest() {
    this.byTest = false;
    this.dataTest = [];
    var db = this.db.database;
    db.ref('question').orderByChild('testId').equalTo(this.test.id).on('child_added', question => {
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
        this.dataTest.push(
          { correctas: correctas, incorrectas: incorrectas, question: question.val().question }
        );
        this.byTest = true;
      });
    });

  }











  // public barChartOptions: any = {
  //   scaleShowVerticalLines: true,
  //   responsive: true
  // };





  // public barChartLabels: string[] = this.preguntas;
  // public barChartType: string = 'bar';
  // public barChartLegend: boolean = true;

  // public barChartData: any[] = [
  //   { data: [2,3,0], label: 'correctas' },
  //   { data: [4,6,0], label: 'incorrectas' },
  // ];


  // // events
  // public chartClicked(e: any): void {
  //   console.log(e, 'eeeeeeeeeeeee');
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }


}
