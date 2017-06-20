import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TileModel } from '../../shared/tile.model';

const tileWidth = 60;
const tileHeight = 80;

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() tileModel: TileModel = null;
  @Input() selected = false;
  @Input() matched = false;
  xPos: string;
  yPos: string;
  zIndex: string;
  tileClass: string;

  constructor() { }

  ngOnInit() {
    this.initTile();
  }

  initTile() {
    if(this.tileModel !== null) {
      this.xPos = (this.tileModel.xPos / 2 ) * tileWidth + this.tileModel.zPos * -4 + 'px';
      this.yPos = (this.tileModel.yPos / 2 ) * tileHeight + this.tileModel.zPos * -4 + 'px';
      this.zIndex = `${this.tileModel.zPos + 1}`;
      this.tileClass =  this.tileModel.tile ? this.tileModel.tile.suit + "-" + this.tileModel.tile.name : 'Joker';

      if(this.tileModel.match){
        this.matched = true;
      }
    }
  }

}
