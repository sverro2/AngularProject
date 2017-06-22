import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoginSuccesComponent } from './login-succes.component';
import { AuthService } from '../auth.service';

describe('LoginSuccessComponent', () => {

  afterAll(inject([AuthService], (auth: AuthService) => {
    auth.logout();
  }));

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: { username: 'test-username', token: 'test-token' } } } }
      ],
      declarations: [
        LoginSuccesComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(LoginSuccesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'LoginSuccesComponent works!'`, async(() => {
  //   const fixture = TestBed.createComponent(LoginSuccesComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('LoginSuccesComponent works!');
  // }));

  it('should render title in a p tag', async(() => {
    const fixture = TestBed.createComponent(LoginSuccesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('login-succes works!');
  }));

  it('Logged in', inject([AuthService], (auth: AuthService) => {
    auth.getAuthInitUrl();
    expect(auth.getUserName()).toEqual('test-username');
    expect(auth.getConnectionToken()).toEqual('test-token');
  }));
});
