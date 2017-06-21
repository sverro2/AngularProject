import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewService } from './overview.service';
import { GameModel } from '../shared/game.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [ OverviewService ]
})
export class OverviewComponent implements OnInit, OnDestroy {
  gamesList: GameModel[] = [];
  currentFilter: string[] = [];
  username: string;
  playedByUserFilter: string = null;

  constructor(private overviewService: OverviewService, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.overviewService.refreshGameList(10).subscribe((games: GameModel[]) => {
      this.gamesList = games;
    });

    this.username = this.auth.getUserName();

    this.route.fragment.subscribe((fragment: string) => {
      let filterArray: string[] = [];

      if (fragment) {
        if (fragment === 'finished') {
          this.playedByUserFilter = this.username;
        }else {
          this.playedByUserFilter = null;
        }

        filterArray.push(fragment);
      }

      this.currentFilter = filterArray;
    })
  }

  ngOnDestroy() {

  }

  onGameRemoved(game: GameModel) {
    console.log('game removed');
  }

  onPlayerRemoved(game: GameModel) {
    console.log('palyer removed');
  }

  onGameOpened(game: GameModel) {
    console.log('game opened');
  }

  onPlayerAdded(game: GameModel) {
    console.log('player added');
  }

}
