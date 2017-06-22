import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabviewComponent } from './tabview.component';

describe('TabviewComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        TabviewComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [{ provide: '', useValue: '/' }]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(TabviewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
