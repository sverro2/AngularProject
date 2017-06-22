import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ThemeService } from './theme.service';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert/alert.service';
import { AlertModule} from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './core/header/header.component';

describe('AppComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AlertComponent
      ],
      providers: [
        ThemeService,
        AlertService,
        { provide: '', useValue: '/' }
      ],
      imports: [
        AlertModule.forRoot(),
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  // it('should create the component', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
});
