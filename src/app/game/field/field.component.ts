import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { GameModel } from '../../shared/game.model';
import { TileModel } from '../../shared/tile.model';
import { UserModel } from '../../shared/user.model';
import { GameService } from '../game.service';
import { AlertService } from '../../shared/alert/alert.service';
import { AuthService } from '../../auth/auth.service';
import { AlertModel } from '../../shared/alert/alert.model';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy, OnChanges {
  @Input() gameId: string = null;
  @Input() templateId: string = null;
  selectedTiles: TileModel[] = [];
  currentGame: GameModel;
  gameStarted: boolean;
  gameTiles: TileModel[] = [];
  gameTileIdMap: any = {};
  gameTileLocationMap: any = {};
  canStartGame: boolean = false;

  //subscriptions
  startSubscription: Subscription;
  endSubscription: Subscription;
  playerSubscription: Subscription;
  matchSubscription: Subscription;

  constructor(private gameService: GameService, private alertService: AlertService, private authService: AuthService) { }

  ngOnInit() {
    this.startSubscription = this.gameService.startSubject.subscribe(() => {
      this.showGame();
    });

    this.endSubscription = this.gameService.endSubject.subscribe(() => {
    });

    this.playerSubscription = this.gameService.playerJoinedSubject.subscribe((user: UserModel) => {
      console.log("User joined matched: ");
      console.log(user);
    });

    this.matchSubscription = this.gameService.matchSubject.subscribe((tiles: TileModel[]) => {
      console.log("Tiles matched...");
      console.log(tiles);

      for(const tile of tiles) {
        this.gameTileIdMap[tile._id].match = { foundBy: 'sven', foundOn: 'now', othertileId: '325' };
      }
    });

    if (this.gameId !== null) {
      this.gameService.initGame(this.gameId);
    }

    this.initGame();
  }

  initGame() {
    //if the playingfield is configured for playing a game:
    if (this.gameId !== null) {
      this.gameService.getGameDetails(this.gameId).subscribe((game: GameModel) => {
        this.currentGame = game;
        this.templateId = game.gameTemplate.id;

        if (game.state === 'open') {
          this.canStartGame = this.authService.getUserName() === this.currentGame.createdBy._id;
          this.showPreview();
        }else{
          this.showGame();
        }
      });
    //if it is just used as a preview
    }else if(this.templateId) {
      this.showPreview();
    }
  }

  ngOnChanges() {
    if(this.templateId) {
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
    this.gameStarted = true;
    this.canStartGame = false;

    this.gameService.getGameTiles(this.gameId).subscribe((tiles: TileModel[]) => {
      this.gameTiles = tiles;

      //create a dictionary of all tiles based on the id and position
      for(const tile of tiles) {
        this.gameTileIdMap[tile._id] = tile;
        this.gameTileLocationMap[this.getTilePositionKey(tile)] = tile;
      }
    })
  }

  ngOnDestroy() {
    this.startSubscription.unsubscribe();
    this.endSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
    this.matchSubscription.unsubscribe();
    this.gameService.closeGame();
  }

  onTileClicked(tileId: number) {
    //select the tile
    const selectedTile = this.gameTileIdMap[tileId];

    //check if the tile can't be clicked, because of an invalid position
    if(!this.validateTilePosition(selectedTile)) {
      return;
    }

    selectedTile.selected = true;

    //validate wether or not the combination is a set
    this.validateSelection(selectedTile);
  }

  clearSelected() {
    for(const tile of this.selectedTiles) {
      tile.selected = false;
    }

    this.selectedTiles = [];
  }

  removeSelected(tilesToRemove: TileModel[]) {
    //add match info (from the websocket event) to the models in the list
    for(const tile of tilesToRemove) {
      this.gameTileIdMap[tile._id].match = tile.match;
    }
  }

  validateTilePosition(selectedTile: TileModel): boolean {
    const xPos = selectedTile.xPos;
    const yPos = selectedTile.yPos;
    const zPos = selectedTile.zPos;

    if(!this.validateTopSide(xPos, yPos, zPos)) {
      this.alertService.getAlertSubject().next(new AlertModel('danger', 'Je kan deze steen niet oppakken. Er ligt nog een steen bovenop.', 1000));
      return false;
    }

    if (this.validateLeftSide(xPos, yPos, zPos) || this.validateRightSide(xPos, yPos, zPos)) {
      return true;
    }else {
      this.alertService.getAlertSubject().next(new AlertModel('danger', 'Je kan deze steen niet oppakken. Er ligt nog een steen aan één (of meerdere) van de lange zijdes.', 1000));
      return false;
    }
  }

  validateTopSide(x: number, y: number, z:number): boolean {
    if (!this.emptyOrAlreadyMatched(x, y, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x, y - 1, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x, y + 1, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x - 1, y, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x - 1, y - 1, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x - 1, y + 1, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x + 1, y - 1, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x + 1, y + 1, z + 1)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x, y, z + 1)) {
      return false;
    }

    return true;
  }

  validateLeftSide(x: number, y: number, z:number): boolean {
    if (!this.emptyOrAlreadyMatched(x-2, y, z)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x-2, y-1, z)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x-2, y+1, z)) {
      return false;
    }

    return true;
  }

  validateRightSide(x: number, y: number, z:number): boolean {
    if (!this.emptyOrAlreadyMatched(x+2, y, z)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x+2, y-1, z)) {
      return false;
    }

    if (!this.emptyOrAlreadyMatched(x+2, y+1, z)) {
      return false;
    }

    return true;
  }

  emptyOrAlreadyMatched(x: number, y: number, z:number) {
    const positionToCheck = this.generateTilePositionKey(x, y, z);
    return this.gameTileLocationMap[positionToCheck] === undefined || this.gameTileLocationMap[positionToCheck].match !== undefined
  }

  validateSelection(selectedTile: TileModel) {
    if (this.selectedTiles.length > 0 && this.selectedTiles.length <= 2) {
      if (this.selectionIsValid(selectedTile, this.selectedTiles[0])) {
        this.gameService.matchTiles(this.gameId, selectedTile._id, this.selectedTiles[0]._id).subscribe((success: boolean) => {
          this.selectedTiles.push(selectedTile);
          this.clearSelected();
          this.alertService.getAlertSubject().next(new AlertModel('success', 'Je hebt een set gevonden!', 1000));
        });
      }else {
        this.clearSelected();
        this.selectedTiles.push(selectedTile);
        this.alertService.getAlertSubject().next(new AlertModel('danger', 'Sorry, dit is geen set.', 1000));
      }
    }else {
      this.selectedTiles.push(selectedTile);
    }
  }

  selectionIsValid(tileOne: TileModel, tileTwo: TileModel) : boolean {
    //when the user clicks the same tile twice, it should not be counted as a match!
    if (tileOne._id === tileTwo._id) {
      return false;
    }else if (tileOne.tile.suit === tileTwo.tile.suit && tileOne.tile.matchesWholeSuit) {
      return true;
    }else if (tileOne.tile.suit === tileTwo.tile.suit && tileOne.tile.name === tileTwo.tile.name) {
      return true;
    }else {
      return false;
    }
  }

  getTilePositionKey(tile: TileModel): string {
    return tile.xPos + '-' + tile.yPos + '-' + tile.zPos;
  }

  generateTilePositionKey(x: number, y: number, z: number): string {
    return x + '-' + y + '-' + z;
  }

  onGameStart() {
    this.gameService.startGame(this.gameId).subscribe();
  }
}
