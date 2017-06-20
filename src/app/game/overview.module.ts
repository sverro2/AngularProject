import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { OverviewComponent } from './overview.component';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { GamesPipe } from './games.pipe';
import { CreateComponent } from './create/create.component';
import { TileComponent } from './tile/tile.component';
import { FieldComponent } from './field/field.component';
import { TileDirective } from './tile/tile.directive';

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
    GamesOverviewComponent,
    GamesPipe,
    CreateComponent,
    TileComponent,
    FieldComponent,
    TileDirective
  ]
})
export class OverviewModule { }
