import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  data: any = {};
  alert: any = null;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.isAuthenticated();
  }

  public isAuthenticated() {
    return this.angularFireAuth.authState;
  }

  // Metodo para iniciar sesion
  public signIn = (email, password) => {

    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.router.navigate(['/']);
        this.alert = [{
          type: 'success',
          message: 'Bienvenido',
        }]
      })
      .catch((error) => {
        this.alert = [{
          type: 'danger',
          message: 'Usuario y/o contraseña incorrectos'
        }];
      });
  }

  async getMsg() {
    return await this.alert;
  }
  // Metodo para cerrar sesion
  public signOut() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['']);
  }

  // Metodo para registrar usuario
  public register = (email, password, user) => {

    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        user.id = response.user.uid;
        this.db.database.ref('users/' + user.id).set(user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Metodo para obtener los datos del usuario
  public getUid() {

    this.isAuthenticated().subscribe((resutl) => {

      return resutl.uid;
    });

  }

  public getUs(id) {
    return this.db.object('users/' + id);
  }


  public getUser() {
    return this.angularFireAuth.auth;
  }

}
