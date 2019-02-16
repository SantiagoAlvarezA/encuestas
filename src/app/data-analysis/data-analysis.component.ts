import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from '../services/analysis.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  test: any = {};
  user: any = {};
  isAuthenticated: boolean = false;

  data: any = [];

  constructor(private authentication: LoginService, private router: Router, private analysisService: AnalysisService) {




    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {

        this.test = this.analysisService.data;

        // this.data = this.analysisService.getAnalysisByTest(this.analysisService.data.id);

        this.dataAnalysis(this.analysisService.data.id)

        this.analysisService.data = {};

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

  dataAnalysis(id) {
    console.log(this.analysisService.setAnalysisByTest(id), ' ret front');
    this.data = this.analysisService.result;
    console.log(this.data, ' front');
    // this.analysisService.result = [];
  }
}
