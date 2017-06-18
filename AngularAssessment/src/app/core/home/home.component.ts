import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private backend: BackendService) { }

  ngOnInit() {
    
  }

}
