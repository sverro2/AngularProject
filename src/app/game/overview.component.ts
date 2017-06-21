import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewService } from './overview.service';
import { GameModel } from '../shared/game.model';
import { UserModel } from '../shared/user.model';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../shared/alert/alert.service';
import { AlertModel } from '../shared/alert/alert.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [ OverviewService ]
})
export class OverviewComponent implements OnInit, OnDestroy {
  gamesList: GameModel[] = [];
  currentFilter: string[] = [];
  username: string;
  playedByUserFilter: string = null;

  constructor(private overviewService: OverviewService, private route: ActivatedRoute, private auth: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.overviewService.refreshGameList(10).subscribe((games: GameModel[]) => {
      this.gamesList = games;
    });

    this.username = this.auth.getUserName();

    this.route.fragment.subscribe((fragment: string) => {
      let filterArray: string[] = [];

      if (fragment) {
        if (fragment === 'finished') {
          this.playedByUserFilter = this.username;
        }else {
          this.playedByUserFilter = null;
        }

        filterArray.push(fragment);
      }

      this.currentFilter = filterArray;
    })
  }

  ngOnDestroy() {

  }

  onGameRemoved(game: GameModel) {
    this.overviewService.removeGame(game).subscribe((success: boolean) => {
      if (success) {
        this.removeGameWithId(game.id);
        this.alertService.getAlertSubject().next(new AlertModel('success', 'De game is met succes verwijderd.', 2000));
      }
    }, (error) => {
      this.alertService.getAlertSubject().next(new AlertModel('danger', 'De game is om de een of andere reden niet verwijderd.', 2000));
    });
  }

  onPlayerRemoved(game: GameModel) {
    for (let x = 0; x < game.players.length; x++) {
      if(game.players[x]._id === this.auth.getUserName()){

        this.overviewService.removePlayer(game).subscribe((success: boolean) => {
          if(success) {
            this.alertService.getAlertSubject().next(new AlertModel('success', 'Je bent van het spel verwijderd.', 2000));
            game.players.splice(x, 1);
          }
        });
      }
    }
  }

  onGameOpened(game: GameModel) {
    this.router.navigate(['/games/', game.id, 'play']);
  }

  onPlayerAdded(game: GameModel) {
    this.overviewService.addPlayer(game).subscribe((success: boolean) => {
      if(success) {
        this.alertService.getAlertSubject().next(new AlertModel('success', 'Je bent als speler aan het spel toegevoegd.', 2000));
        game.players.push(new UserModel(this.auth.getUserName(), '(jij)'));
      }
    });
  }

  actionOnGameWithId(gameId: string, callback: (game: GameModel) => void) {
    for(const game of this.gamesList) {
      if(game.id === gameId) {
        callback(game);
        return;
      }
    }
  }

  removeGameWithId(gameId: string) {
    for(let x = 0; x < this.gamesList.length; x++) {
      if(this.gamesList[x].id === gameId) {
        this.gamesList.splice(x, 1);
        return;
      }
    }
  }

}
