import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  gameId: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.gameId = this.activatedRoute.parent.snapshot.params.gameId;
    console.log(this.gameId);
  }

}
