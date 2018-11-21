import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

//libreria de iconos///////////////////////////////////////
/*
*comando para instalar libreria
* npm install @fortawesome/fontawesome-svg-core --save\nnpm install @fortawesome/free-solid-svg-icons --save\nnpm install @fortawesome/angular-fontawesome --save
*/
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
////////////////////////////////////////////


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';


import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InformationComponent } from './information/information.component';
import { TestComponent } from './test/test.component';
import { GamesComponent } from './games/games.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InformationComponent },
  { path: 'test', component: TestComponent },
  { path: 'games', component: GamesComponent },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    LoginComponent,
    InformationComponent,
    TestComponent,
    GamesComponent,
    RegisterComponent
  ],

  imports: [
    BrowserModule,
    FontAwesomeModule, //import  FontAwesomeModule paquete de iconos
    RouterModule.forRoot(appRoutes),
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
