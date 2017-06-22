import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { AlertModule} from 'ngx-bootstrap';

describe('AlertComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AlertComponent
      ],
      providers: [
        AlertService
      ],
      imports: [
        AlertModule.forRoot(),
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(AlertComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should be viewable the component', async(() => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.detectChanges();

    const app = fixture.debugElement.nativeElement;
    expect(app).toBeTruthy();
  }));
});
