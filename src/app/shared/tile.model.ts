export class TileModel {
  _id: string;
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
    otherTileId: string,
    foundOn: string
  }
  selected: boolean;
}
