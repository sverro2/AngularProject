import { Component } from '@angular/core';
import { ThemeService } from '../../shared/theme.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentTheme = 'light-theme';
  loggedIn = false;

  constructor(private themeService: ThemeService, private auth: AuthService) { }

  //Select a theme and make sure everyone knows the theme has changed
  onSelectTheme(theme: string) {
    this.themeService.themeSubject.next(theme);
    this.currentTheme = theme;
  }

}
