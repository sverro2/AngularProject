import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule, BsDropdownModule} from 'ngx-bootstrap';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

//import services
import { ThemeService } from './../shared/theme.service';
import { BackendService } from '../shared/backend.service';
import { AlertService } from '../shared/alert/alert.service';

const coreRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  providers: [
    ThemeService,
    BackendService,
    AlertService
  ],
  exports: [
    HeaderComponent,
    SharedModule
  ]
})

export class CoreModule { }
