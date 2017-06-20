export class TileModel {
  xPos: number;
  yPos: number;
  zPos: number;
  tile: {
    id: number,
    suit: string,
    name: string,
    matchesWholeSuit: boolean,
  }
  match: {
    foundBy: string,
    othertileId: string,
    foundOn: string
  }
}
