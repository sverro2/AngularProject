import { Pipe, PipeTransform } from '@angular/core';
import { GameModel } from '../shared/game.model';

@Pipe({
  name: 'games'
})
export class GamesPipe implements PipeTransform {

  transform(games: GameModel[], acceptedStatuses?: string[], filterCreatedById?: string, playedById?: string): GameModel[] {
    let filteredGames: GameModel[] = [];

    //check the games on different aspect, if one aspect fails, the game will be hidden
    for (const game of games) {
      //check statuses of the game
      if (!this.checkStatuses(game, acceptedStatuses)) {
        continue;
      }

      //check if game is created or played by the user
      if(filterCreatedById && playedById){
        if (!this.checkCreatedById(game, filterCreatedById) && !this.checkPlayedById(game, playedById)) {
          continue;
        }
      }else{
        if (!this.checkCreatedById(game, filterCreatedById) || !this.checkPlayedById(game, playedById)) {
          continue;
        }
      }


      filteredGames.push(game);
    }

    return filteredGames;
  }

  checkStatuses(game: GameModel, acceptedStatuses: string[]) : boolean {
    let statusOk = false;

    if (acceptedStatuses && acceptedStatuses.length > 0 && acceptedStatuses[0].length > 0) {
      for (let status of acceptedStatuses) {
        if (game.state === status) {
          statusOk = true;
          break;
        }
      }
    }else{
      statusOk = true;
    }

    return statusOk;
  }

  checkCreatedById(game: GameModel, filterCreatedById: string) : boolean {
    if(filterCreatedById && filterCreatedById.length > 0){
      return game.createdBy._id === filterCreatedById;
    }else{
      return true;
    }
  }

  checkPlayedById(game: GameModel, playedById: string) : boolean {
    if(playedById && playedById.length > 0){

      if(game.players){
        for(const player of game.players){
          if(player._id === playedById){
            return true;
          }
        }

        //player is not found in the game
        return false;
      }
    }else{
      return true;
    }
  }

}
