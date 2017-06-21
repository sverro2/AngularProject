import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { GameModel } from '../../shared/game.model';
import { UserModel } from '../../shared/user.model';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss']
})
export class GamesOverviewComponent implements OnInit {
  @Input() gamesList;
  @Output() removeGame = new EventEmitter<GameModel>();
  @Output() removePlayer = new EventEmitter<GameModel>();
  @Output() openGame = new EventEmitter<GameModel>();
  @Output() addPlayer = new EventEmitter<GameModel>();
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserName();
  }

  isRemovable(game: GameModel): boolean {
    return game.createdBy._id === this.userId && game.state === 'open';
  }

  isAPlayer(game: GameModel): boolean {
    let containsPlayer = false;

    for(const player of game.players) {
      if(player._id === this.userId) {
        return true;
      }
    }

    return false;
  }

  onRemovePlayer(game: GameModel) {
    this.removePlayer.emit(game);
  }

  onRemoveGame(game: GameModel) {
    this.removeGame.emit(game);
  }

  onAddPlayer(game: GameModel) {
    this.addPlayer.emit(game);
  }

  onOpenGame(game: GameModel) {
    this.openGame.emit(game);
  }
}
