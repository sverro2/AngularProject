import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/Rx';

import { BackendService } from '../shared/backend.service';
import { GameModel } from '../shared/game.model';

@Injectable()
export class OverviewService {

  constructor(private backend: BackendService) { }

  refreshGameList(amount: number): Observable<GameModel[]> {
    return this.backend.getRequest('/games').map((message: Response) => {
      const games: GameModel[] = message.json();
      return games;
    });
  }
}
