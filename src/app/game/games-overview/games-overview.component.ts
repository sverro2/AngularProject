import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss']
})
export class GamesOverviewComponent implements OnInit {
  @Input() gamesList;

  constructor() { }

  ngOnInit() {
  }

}
