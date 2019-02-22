import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from '../services/analysis.service';
import { LoginService } from '../services/login.service';
import { GROUP } from '../group-model';
import { PROGRAM } from '../program-model';

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

  data: any = null;
  byTest:boolean = false;
  byGroup:boolean = false;

  constructor(private authentication: LoginService, private router: Router, private analysisService: AnalysisService) {
    this.test = this.analysisService.data;
    this.analysisService.setAnalysisByTest(this.analysisService.data.id);

    console.log(this.data, ' front');
    this.analysisService.data = {};



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
  dataByTest() {
    this.byGroup = false;
    this.byTest = !this.byTest;
    this.data = this.analysisService.setAnalysisByTest(this.test.id);
  }

  dataByGroups(){
    this.byTest = false;
    this.byGroup = !this.byGroup;
    

  }
}
