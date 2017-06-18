import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { OverviewComponent } from './overview.component';
import { GamesTableComponent } from './games-table/games-table.component';
import { GamesPipe } from './games.pipe';

const overviewRoutes: Routes = [
    { path: "games", redirectTo: "games/" /*, canActivate: [AuthGuard]*/ },
    { path: "games/:filter", component: OverviewComponent /*, canActivate: [AuthGuard]*/ },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(overviewRoutes)
  ],
  declarations: [
    OverviewComponent,
    GamesTableComponent,
    GamesPipe
  ]
})
export class OverviewModule { }
