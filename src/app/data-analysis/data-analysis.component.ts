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

  data: Array<any> = [];
  byTest: boolean = false;
  byGroup: boolean = false;

  correctas: Array<any> = [];
  incorrectas: Array<any> = [];
  preguntas: any[] = [];
  selectedGroup: string = '';
  selectedProgram: string = '';

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
      } else {
        this.isAuthenticated = false;
      }
    }, (error) => {
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {

  }
  imprimeGroup() {
    console.log(this.selectedGroup, ' gruuporrrrrr');

  }

  dataByGroups() {
    this.byTest = false;
    this.byGroup = !this.byGroup;
    var db = this.db.database;
    let students = db.ref('users').orderByChild('group').equalTo(this.selectedGroup);
    students.on('child_added', students => {
      console.log(students.child('program'));
      if (students.val().program == this.selectedProgram)
        console.log(students.val(), ' estudiantes');
    });

    db.ref('typeQuestion').orderByChild('testId').equalTo(this.test.id).on('child_added', theme => {
      db.ref('question').orderByChild('themeId').equalTo(theme.val().id).on('child_added', question => {
        db.ref('results').orderByChild('questionId').equalTo(question.val().id).once('value', snapshot => {

          // console.log(theme.val());
          // console.log(question.val());
          // console.log(snapshot.val());


        });
      });
    });

  }


  dataByTest() {
    this.data = [];
    this.byGroup = false;
    this.byTest = !this.byTest;
    var db = this.db.database;
    db.ref('typeQuestion').orderByChild('testId').equalTo(this.test.id).on('child_added', theme => {
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
          this.data.push(
            { correctas: correctas, incorrectas: incorrectas, question: question.val().question }
          );

        });
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
