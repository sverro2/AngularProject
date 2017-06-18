import { UserModel } from './user.model';

export class GameModel {
  constructor(
    public startedOn: string,
    public minPlayers: number,
    public createdOn: string,
    public gameTemplate: {id: string},
    public maxPlayers: number,
    public state: string,
    public players: UserModel[],
    public endedOn: string,
    public id: string,
    public createdBy: UserModel
  ) { }
}
