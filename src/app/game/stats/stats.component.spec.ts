import { ActivatedRoute } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { SocketService } from '../socket.service';
import { StatsService } from './stats.service';

import { BackendService } from '../../shared/backend.service';
import { AuthService } from '../../auth/auth.service';
import { AlertService} from '../../shared/alert/alert.service';

describe('LoginSuccessComponent', () => {
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        StatsComponent
      ],
      providers: [
        { provide: BackendService, useClass: MockBackendService },
        { provide: ActivatedRoute, useValue: { parent: { snapshot: { params: { gameId: 'test-game-id' } } }} },
        AlertService,
        SocketService,
        StatsService,
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(StatsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

export class MockStatsService {

}

export class MockSocketService {

}

export class MockBackendService {

}
