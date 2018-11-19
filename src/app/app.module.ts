import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//libreria de iconos

/*
*comando para instalar libreria
* npm install @fortawesome/fontawesome-svg-core --save\nnpm install @fortawesome/free-solid-svg-icons --save\nnpm install @fortawesome/angular-fontawesome --save
*/
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);
////////////////////////////////////////////


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule, //import  FontAwesomeModule paquete de iconos
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
