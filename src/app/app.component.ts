import { Component, OnInit, isDevMode, OnDestroy } from '@angular/core';
import { ThemeService } from './shared/theme.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app works!';
  currentTheme = 'light-theme';
  themeSubscription: Subscription;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeSubscription = this.themeService.themeSubject.subscribe((userTheme: string) => {
      this.currentTheme = userTheme;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
