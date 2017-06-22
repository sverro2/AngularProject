import { TestBed, async } from '@angular/core/testing';
import { CreateComponent } from './create.component';

describe('HomeComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        CreateComponent
      ],
    }).compileComponents();
  }));

  // it('should create the component', async(() => {
  //   const fixture = TestBed.createComponent(CreateComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
});
