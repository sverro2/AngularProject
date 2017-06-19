import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewService } from './overview.service';
import { GameModel } from '../shared/game.model';
import { AuthService } from '../auth/auth.service';
import * as io from "socket.io-client";

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
  socket: any;

  constructor(private overviewService: OverviewService, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.overviewService.refreshGameList(10).subscribe((games: GameModel[]) => {
      this.gamesList = games;
    });

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

      this.socket = io("http://mahjongmayhem.herokuapp.com?gameId=5946c8db3dd8aa00117ad6ce");
      this.socket.on('start', () => {
        console.log('Game started!');
      })
    })

    this.username = this.auth.getUserName();
  }

  ngOnDestroy() {
    this.socket.close();
  }

}
