import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginSuccesComponent } from './auth/login-succes/login-succes.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: "overview", component: OverviewComponent, canActivate: [AuthGuard] },
  { path: "login-succes", component: LoginSuccesComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginSuccesComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CoreModule,
    HttpModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
