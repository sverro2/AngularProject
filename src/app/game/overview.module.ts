import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { OverviewComponent } from './overview.component';
import { GamesTableComponent } from './games-table/games-table.component';
import { GamesPipe } from './games.pipe';
import { CreateComponent } from './create/create.component';

const overviewRoutes: Routes = [
    { path: "games", component: OverviewComponent /*, canActivate: [AuthGuard]*/ },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(overviewRoutes)
  ],
  declarations: [
    OverviewComponent,
    GamesTableComponent,
    GamesPipe,
    CreateComponent
  ]
})
export class OverviewModule { }
