import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Subject } from 'rxjs/Rx';
import { UserModel } from '../shared/user.model';
import { TileModel } from '../shared/tile.model';
import { AlertService } from '../shared/alert/alert.service';
import { AlertModel } from '../shared/alert/alert.model';

@Injectable()
export class SocketService {
  startSubject = new Subject<void>();
  endSubject = new Subject<void>();
  playerJoinedSubject = new Subject<UserModel>();
  matchSubject = new Subject<TileModel[]>();
  socket: any;

  constructor(private alert: AlertService) { }

  initGameSocket(gameId: string) {
    //make sure the socket is disconnected before initializing again...
    this.closeGameSocket();
    this.initializeGameSocket(gameId);
  }

  initializeGameSocket(gameId: string){
    this.socket = io("http://mahjongmayhem.herokuapp.com?gameId=" + gameId);
    this.socket.on('start', () => {
      this.startSubject.next();
      this.alert.getAlertSubject().next(new AlertModel('success', 'Het spel is gestart', 5000));
    });

    this.socket.on('end', () => {
      this.endSubject.next();
      this.alert.getAlertSubject().next(new AlertModel('warning', 'Het spel is afgelopen.', 20000));
    });

    this.socket.on('playerJoined', (player: UserModel) => {
      this.playerJoinedSubject.next(player);
      this.alert.getAlertSubject().next(new AlertModel('info', `Player ${player._id} has joined the game.`, 5000));
    });

    this.socket.on('match', (tiles: TileModel[]) => {
      console.log(tiles);
      this.matchSubject.next(tiles);
    });
  }

  closeGameSocket() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }
}
