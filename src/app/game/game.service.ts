import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { BackendService } from '../shared/backend.service';
import { Subject, Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { UserModel } from '../shared/user.model';
import { TileModel } from '../shared/tile.model';
import { GameModel } from '../shared/game.model';
import * as io from "socket.io-client";
import { AlertService } from '../shared/alert/alert.service';
import { AlertModel } from '../shared/alert/alert.model';

@Injectable()
export class GameService {
  socket: any;

  //observables
  startSubject = new Subject<void>();
  endSubject = new Subject<void>();
  playerJoinedSubject = new Subject<UserModel>();
  matchSubject = new Subject<TileModel[]>();

  constructor(private backend: BackendService, private alert: AlertService) { }

  initGame(gameId: string) {
    console.log('initializing service');
    this.initializeSocket(gameId);
  }

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

  initializeSocket(gameId: string){
    this.socket = io("http://mahjongmayhem.herokuapp.com?gameId=" + gameId);
    this.socket.on('start', () => {
      console.log('Game started!');
      this.startSubject.next();
      this.alert.getAlertSubject().next(new AlertModel('success', 'Het spel is gestart', 5000));
    });

    this.socket.on('end', () => {
      console.log('Game ended!');
      this.endSubject.next();
      this.alert.getAlertSubject().next(new AlertModel('danger', 'Het spel is afgelopen.', 5000));
    });

    this.socket.on('playerjoined', (player: UserModel) => {
      console.log('Player joined: ' + player.name);
      this.playerJoinedSubject.next(player);
      this.alert.getAlertSubject().next(new AlertModel('info', `Player ${player.name} has joined the game.`, 5000));
    });

    this.socket.on('match', (tiles: TileModel[]) => {
      console.log('Tiles played');
      console.log(tiles);
      this.matchSubject.next(tiles);
    });
  }

  closeGame() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }
}
