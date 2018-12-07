import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { CommentsService } from '../services/comments.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  test: any = {};
  comments: any = {};
  comment: any = {};
  user: any = {};
  isAuthenticated: boolean = false;
  constructor(private testService: TestService, private commentsServise: CommentsService, private authentication: LoginService) {





    authentication.isAuthenticated().subscribe((result) => {
      if (result && result.uid) {
        this.isAuthenticated = true;
        let id: string = this.authentication.getUser().currentUser.uid;
        this.user = this.authentication.getUs(id).valueChanges().subscribe(user => {
          this.user = user;
        });

        this.test = this.testService.data;
        this.testService.data = {};
        this.comments = commentsServise.getComments();


      } else {
        this.isAuthenticated = false;
      }

    }, (error) => {
      this.isAuthenticated = false;

    });
  }

  ngOnInit() {
  }

  setCommnet() {

    this.comment.id = Date.now();
    this.comment.userName = this.user.firstName + ' ' + this.user.secondName + ' ' + this.user.firstSurname + ' ' + this.user.secondSurname;
    this.commentsServise.setComment(this.comment);


  }

}
