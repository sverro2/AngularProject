import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { BackendService } from '../../shared/backend.service';
import { TileModel } from '../../shared/tile.model';
import { PlayerStatsModel } from './player-stats.model';

@Injectable()
export class StatsService {

  constructor(private backend: BackendService) { }

  getMatches(gameId: string): Observable<TileModel[]> {
    return this.backend.getRequest('/games/' + gameId + '/tiles/matches').map((message: Response) => {
      const game: TileModel[] = message.json();
      return game;
    });
  }

  getGamePlayers(gameId: string): Observable<PlayerStatsModel[]> {
    return this.backend.getRequest('/games/' + gameId + '/players').map((message: Response) => {
      const game: PlayerStatsModel[] = message.json();
      return game;
    });
  }

}
