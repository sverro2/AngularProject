import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { OverviewModule } from './overview/overview.module';

import { LoginSuccesComponent } from './auth/login-succes/login-succes.component';


const routes: Routes = [
  { path: "login-succes", component: LoginSuccesComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginSuccesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    CoreModule,
    AuthModule,
    OverviewModule,
    GameModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
