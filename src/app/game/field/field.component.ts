import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GameModel } from '../../shared/game.model';
import { TileModel } from '../../shared/tile.model';
import { UserModel } from '../../shared/user.model';
import { gameService } from '../game.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [ gameService ]
})
export class FieldComponent implements OnInit, OnDestroy {
  @Input() gameId: string = null;
  @Input() templateId: string = null;
  currentGame: GameModel;
  gameStarted: boolean;
  gameTiles: TileModel[] = [];

  //subscriptions
  startSubscription: Subscription;
  endSubscription: Subscription;
  playerSubscription: Subscription;
  matchSubscription: Subscription;

  constructor(private gameService: gameService) { }

  ngOnInit() {
    //init subscriptions
    this.startSubscription = this.gameService.startSubject.subscribe(() => {
      console.log("game started");
    });

    this.startSubscription = this.gameService.endSubject.subscribe(() => {
      console.log("game ended");
    });

    this.playerSubscription = this.gameService.playerJoinedSubject.subscribe((user: UserModel) => {
      console.log("User joined matched: " + user.name);
      console.log(user);
    });

    this.matchSubscription = this.gameService.matchSubject.subscribe((tiles: TileModel[]) => {
      console.log("Tiles matched");
      console.log(tiles);
    });

    this.initGame();
  }

  initGame() {
    //if the playingfield is configured for playing a game:
    if (this.gameId !== null) {
      this.gameService.initGame(this.gameId);
      this.gameService.getGameDetails(this.gameId).subscribe((game: GameModel) => {
        this.currentGame = game;
        this.templateId = game.gameTemplate.id;

        if (game.state === 'open') {
          this.showPreview();
        }else{
          this.showGame();
        }
      });
    //if it is just used as a preview
    }else {
      this.showPreview();
    }
  }

  showPreview() {
    this.gameStarted = false;
    this.gameService.getTemplateTiles(this.templateId).subscribe((tiles: any) => {
      this.gameTiles = tiles.tiles;
    })
  }

  showGame() {
    this.gameService.initGame(this.gameId);
    this.gameStarted = true;

    this.gameService.getGameTiles(this.gameId).subscribe((tiles: TileModel[]) => {
      this.gameTiles = tiles;
    })
  }

  ngOnDestroy() {
    this.gameService.closeGame();
    this.startSubscription.unsubscribe();
    this.endSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
  }

}
