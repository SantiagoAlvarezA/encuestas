import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { GROUP } from '../group-model';
import { PROGRAM } from '../program-model';
import { DataAnalisisService } from '../services/data-analisis.service';


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

  byTest: boolean = false;
  byGroup: boolean = false;
  tableByGroup: boolean = false;

  selectedGroup: string = '';
  selectedProgram: string = '';

  dataGroup = null;
  dataTest = null;

  currentJustify = 'justified';
  constructor(private authentication: LoginService, private dataAnalisisService: DataAnalisisService) {
    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        let id: string = this.authentication.getUser().currentUser.uid;
        this.user = this.authentication.getUs(id).valueChanges().subscribe(user => {
          this.user = user;
        });
        this.test = this.dataAnalisisService.data;
        this.showByTest();
        this.dataAnalisisService.data = {};
      } else {
        this.isAuthenticated = false;
      }
    }, (error) => {
      this.isAuthenticated = false;
    });





  }

  ngOnInit() {

  }


  showByTest() {
    this.dataAnalisisService.dataByTest(this.test.id).then(data => {
      this.dataTest = data;
      this.byTest = true;
    });
  }

  dataByGroups() {
    this.dataAnalisisService.dataByGroups(this.test.id, this.selectedGroup, this.selectedProgram).then(data => {
      this.dataGroup = data;
      this.tableByGroup = true;
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
