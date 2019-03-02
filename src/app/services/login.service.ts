import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  data: any = {};
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
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
        this.Toast.fire({
          type: 'success',
          title: 'Bienvenido'
        })
        this.router.navigate(['/']);

      })
      .catch((error) => {
        this.Toast.fire({
          type: 'error',
          title: 'Usuario y/o contraseña incorrectos'
        });
      });
  }


  // Metodo para cerrar sesion
  public signOut() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['']);
    this.Toast.fire({
      type: 'success',
      title: 'Se a cerrado sesión con exito'
    })
  }

  // Metodo para registrar usuario
  public register = (email, password, user) => {

    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        user.id = response.user.uid;
        this.db.database.ref('users/' + user.id).set(user);
        this.Toast.fire({
          type: 'success',
          title: 'El usuario se a registrado con exito'
        })
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.Toast.fire({
          type: 'error',
          title: 'Se a presentado un error al momento de registrar el usuario'
        })
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
