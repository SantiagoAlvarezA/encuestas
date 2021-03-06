import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

//libreria de iconos///////////////////////////////////////
/*
*comando para instalar libreria
* npm install @fortawesome/fontawesome-svg-core --save\nnpm install @fortawesome/free-solid-svg-icons --save\nnpm install @fortawesome/angular-fontawesome --save
*
*libreria de ng-boostrap
*npm install --save @ng-bootstrap/ng-bootstrap
*
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


//angular material

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterial } from './app.angular-material';
import { LoginService } from './services/login.service';
import { TestService } from './services/test.service';
import { NewTestComponent } from './new-test/new-test.component';
import { GamesCatComponent } from './games-cat/games-cat.component';
import { GamesListComponent } from './games-list/games-list.component';
import { Page404nofoundComponent } from './page404nofound/page404nofound.component';
import { CommentsComponent } from './comments/comments.component';
import { SolveTestComponent } from './solve-test/solve-test.component';
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import { EditTestComponent } from './edit-test/edit-test.component';

import { ChartsModule } from 'ng2-charts/ng2-charts';//libreria para graficos
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// Importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InformationComponent },
  { path: 'test', component: TestComponent },
  { path: 'edit-test', component: EditTestComponent },
  { path: 'games', component: GamesComponent },
  // { path: 'gamesList/:id_juego', component: GamesCatComponent },
  { path: 'register/:rol', component: RegisterComponent },
  { path: 'test/:action', component: NewTestComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'solve', component: SolveTestComponent },
  { path: 'data-analysis', component: DataAnalysisComponent },
  { path: '**', component: Page404nofoundComponent },
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
    RegisterComponent,
    NewTestComponent,
    GamesCatComponent,
    GamesListComponent,
    Page404nofoundComponent,
    CommentsComponent,
    SolveTestComponent,
    DataAnalysisComponent,
    EditTestComponent,


  ],

  imports: [
    BrowserModule,
    FontAwesomeModule,//import  FontAwesomeModule paquete de iconos
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,


    //angular material
    AngularMaterial,
    BrowserAnimationsModule,

    //libreria para graficos estadisticos
    ChartsModule,
    NgbModule,

    HttpClientModule,
    FusionChartsModule // Include in imports

  ],
  providers: [LoginService, TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
