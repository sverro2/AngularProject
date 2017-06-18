import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.scss']
})
export class GamesTableComponent implements OnInit {
  @Input() gamesList;
  
  constructor() { }

  ngOnInit() {
  }

}
