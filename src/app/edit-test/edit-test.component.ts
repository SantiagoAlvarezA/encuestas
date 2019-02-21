import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { EditTestService } from '../services/edit-test.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  login: any = {};
  isAuthenticated: boolean = true;
  test: any = null;
  constructor(private authentication: LoginService, private router: Router, private editTestService: EditTestService) {
    this.authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        this.test = this.editTestService.data;
        
        this.editTestService.data = {};
        this.editTestService.getDataForEditTest(this.test.id);
      } else {
        this.isAuthenticated = false;
      }
    }, (error) => {
      this.isAuthenticated = false;
    });

  }

  ngOnInit() {
  }

}
