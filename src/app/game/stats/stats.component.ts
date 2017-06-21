import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SocketService } from '../socket.service';
import { StatsService } from './stats.service';
import { TileModel } from '../../shared/tile.model';
import { UserModel } from '../../shared/user.model';
import { PlayerStatsModel } from './player-stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  providers: [StatsService]
})
export class StatsComponent implements OnInit, OnDestroy {
  gameId: string;
  matchSubscription: Subscription;
  playerSubscription: Subscription;
  latestMatch: TileModel;

  stats: {userName: string, matches: TileModel[]}[] = [];
  statsPlayerMap: any = {};
  knownTilesMap: any = {};
  addToArrayEnd: boolean;

  constructor(private socketService: SocketService, private activatedRoute: ActivatedRoute, private statsService: StatsService) { }

  ngOnInit() {
    this.gameId = this.activatedRoute.parent.snapshot.params.gameId;
    this.socketService.initGameSocket(this.gameId);

    this.addToArrayEnd = true;
    this.readNewMatches();

    this.matchSubscription = this.socketService.matchSubject.subscribe((tiles: TileModel[]) => {
      this.addToArrayEnd = false;
      this.readNewMatches();
    });

    this.playerSubscription = this.socketService.playerJoinedSubject.subscribe((player: any) => {
      this.addToArrayEnd = false;
      this.readNewMatches();
    });
  }

  readNewMatches() {
    this.preparePlayersArrays();
    this.readMatchHistory();
  }

  preparePlayersArrays() {
    this.statsService.getGamePlayers(this.gameId).subscribe((players: PlayerStatsModel[]) => {
      //add player to the list if the player wasn't added yet
      for (const player of players) {
          if (this.statsPlayerMap[player._id] === undefined) {
            this.statsPlayerMap[player._id] = this.stats.length;
            this.stats.push({userName: player.name, matches: []});
          }
      }
    });
  }

  readMatchHistory() {
    this.statsService.getMatches(this.gameId).subscribe((tiles: TileModel[]) => {
      for (let x = 0; x < tiles.length; x++) {
        if (this.addIfNotTileExists(tiles[x])) {
          //if the current tile is the latest match of the previous run, we know all tiles after this tile already have been added
          if (this.latestMatch && this.latestMatch._id == tiles[x]._id) {
            return;
          }

          const playerId = tiles[x].match.foundBy;
          const playerStatIndex = this.statsPlayerMap[playerId];

          if (this.addToArrayEnd) {
            this.stats[playerStatIndex].matches.push(tiles[x]);
          } else {
            this.stats[playerStatIndex].matches.unshift(tiles[x]);
          }
        }
      }

      if (tiles.length > 0) {
        this.latestMatch = tiles[0];
      }
    });
  }

  addIfNotTileExists(tile: TileModel): boolean {
    if (!(this.knownTilesMap[tile._id] || this.knownTilesMap[tile.match.otherTileId])) {
      this.knownTilesMap[tile._id] = true;
      this.knownTilesMap[tile.match.otherTileId] = true;
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.matchSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
    this.socketService.closeGameSocket();
  }

}
