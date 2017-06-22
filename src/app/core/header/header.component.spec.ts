import { TestBed, async } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../shared/theme.service';
import { AlertService } from '../../shared/alert/alert.service';
import { CarouselModule, BsDropdownModule, BsRootModule} from 'ngx-bootstrap';
import { AuthService } from '../../auth/auth.service';

describe('HeaderComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        ThemeService,
        AlertService,
        AuthService
      ],
      imports: [
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot()
      ]
    }).compileComponents();
  }));

  // it('should create the component', async(() => {
  //   const fixture = TestBed.createComponent(HeaderComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
});
