import { Subject } from 'rxjs/Rx';

export class ThemeService {
  public themeSubject = new Subject<string>();
}
