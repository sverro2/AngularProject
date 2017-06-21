import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { BackendService } from '../shared/backend.service';
import { TileModel } from '../shared/tile.model';
import { GameModel } from '../shared/game.model';

@Injectable()
export class GameService {
  constructor(private backend: BackendService) { }

  getGameDetails(gameId: string): Observable<GameModel> {
    return this.backend.getRequest('/games/' + gameId).map((message: Response) => {
      const game: GameModel = message.json();
      return game;
    });
  }

  getGameTiles(gameId: string): Observable<TileModel[]> {
    return this.backend.getRequest('/games/' + gameId + '/tiles').map((message: Response) => {
      const game: TileModel[] = message.json();
      return game;
    });
  }

  getTemplateTiles(templateId: string): Observable<TileModel[]> {
    return this.backend.getRequest('/gameTemplates/' + templateId).map((message: Response) => {
      const game: TileModel[] = message.json();
      return game;
    });
  }

  startGame(gameId: string): Observable<boolean> {
    return this.backend.postRequest('/games/' + gameId + '/start', { }).map((message: Response) => {
      return message.status === 200;
    });
  }

  matchTiles(gameId: string, tile1Id: string, tile2Id: string): Observable<boolean> {
    return this.backend.putRequest('/games/' + gameId + '/tiles', { tile1Id: tile1Id, tile2Id: tile2Id} ).map((message: Response) => {
      return message.status === 200;
    });
  }

  }
