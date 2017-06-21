import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/Rx';

import { BackendService } from '../shared/backend.service';
import { GameModel } from '../shared/game.model';

@Injectable()
export class OverviewService {

  constructor(private backendService: BackendService) { }

  refreshGameList(amount: number): Observable<GameModel[]> {
    return this.backendService.getRequest('/games').map((message: Response) => {
      const games: GameModel[] = message.json();
      return games;
    });
  }

  removeGame(gameToRemove: GameModel): Observable<boolean> {
    return this.backendService.deleteRequest('/games/' + gameToRemove.id).map((message: Response) => {
      console.log('je doet dit toch gewoon?');
      return message.status === 204;
    });
  }

  addPlayer(game: GameModel): Observable<boolean> {
    return this.backendService.postRequest('/games/' + game.id + '/players', { }).map((message: Response) => {
      return message.status === 200;
    });
  }

  removePlayer(game: GameModel): Observable<boolean> {
      return this.backendService.deleteRequest('/games/' + game.id + '/players').map((message: Response) => {
      return message.status === 200;
    });
  }
}
