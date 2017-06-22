import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AlertService } from '../shared/alert/alert.service';

describe('CanAuthenticateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        AuthService,
        AlertService
      ]
    });
  });

  it('Should create an instance', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('Should not authenticate', inject([AuthGuard, AuthService], (guard: AuthGuard) => {
    expect(guard.canActivate(null, null)).toEqual(false);
  }));

  it('Should authenticate', inject([AuthGuard, AuthService, AlertService], (guard: AuthGuard, auth: AuthService) => {
    auth.setAuthDetails('test-naam', 'test-token');
    expect(guard.canActivate(null, null)).toEqual(true);
  }));

  it('Logout', inject([AuthGuard, AuthService, AlertService], (guard: AuthGuard, auth: AuthService) => {
    auth.logout();
    expect(guard.canActivate(null, null)).toEqual(false);
  }));
});
