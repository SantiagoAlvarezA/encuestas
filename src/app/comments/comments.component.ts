import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { CommentsService } from '../services/comments.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  test: any = {};
  comments: any;
  comment: any = {};
  user: any = {};
  isAuthenticated: boolean = false;
  delete:Boolean = false;


  constructor(private testService: TestService, private commentsService: CommentsService, private authentication: LoginService, private router : Router) {

    this.test = this.testService.data;
    this.testService.data = {};
    this.comments = commentsService.getComments();

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

  setComment() {

    this.comment.id = Date.now();
    this.comment.userName = this.user.firstName + ' ' + this.user.secondName + ' ' + this.user.firstSurname + ' ' + this.user.secondSurname;
    this.comment.testId = this.test.id;
    this.comment.userId = this.user.id;
    this.commentsService.setComment(this.comment);
    this.comment = {};


  }
  close() {
    this.test = {};
    this.comment = {};
    this.user = {};
    this.testService.data = {};
    this.router.navigate(['/test']);

  }
  deleteComment(id){
    this.commentsService.deleteComment(id);
  }


}
