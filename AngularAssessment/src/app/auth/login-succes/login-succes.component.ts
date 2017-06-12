import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-succes',
  templateUrl: './login-succes.component.html',
  styleUrls: ['./login-succes.component.scss']
})
export class LoginSuccesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    //Read queryParams
    const username = this.route.snapshot.queryParams['username'];
    const token = this.route.snapshot.queryParams['token'];

    //log to console
    console.log("Logged in with username: " + username);
    console.log("Token is: " + token);

    //configure AuthService
    this.auth.connectionToken = token;
    this.auth.username = username;
  }

}
