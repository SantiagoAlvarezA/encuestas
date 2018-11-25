import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.isAuthenticated();
  }
  
  public isAuthenticated() {
    return this.angularFireAuth.authState;
  }

  // Metodo para iniciar sesion
  public signIn = (email, password) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('usuario autenticado con exito');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
        console.log('El usuario no esta registrado.');
      });
  }

  // Metodo para cerrar sesion
  public signOut() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['']);
  }

  // Metodo para registrar usuario
  public register = (email, password) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('usuario registrado con exito');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Metodo para obtener los datos del usuario
  public getUser() {
    return this.angularFireAuth.auth;
  }
}
