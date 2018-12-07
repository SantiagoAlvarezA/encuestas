import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  data: any = {};

  constructor(private db: AngularFireDatabase) {

  }

  public setComment(comment) {
    this.db.database.ref('comment/' + comment.id).set(comment);
  }

  public getComments() {
    return this.db.list('comment').valueChanges();
  }

  public updateComment(comment) {
    this.db.database.ref('comment/' + comment.id).set(comment);
  }

  public deleteComment(id) {
    this.db.object('comment/' + id).remove();
  }

  public getComment(id) {
    return this.db.object('comment/' + id);
  }
}
