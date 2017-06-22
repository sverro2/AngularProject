import { ActivatedRoute } from '@angular/router';
import { TestBed, async, inject } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { SocketService } from '../socket.service';
import { StatsService } from './stats.service';

import { BackendService } from '../../shared/backend.service';
import { AuthService } from '../../auth/auth.service';
import { AlertService} from '../../shared/alert/alert.service';
import { TileModel } from '../../shared/tile.model';

describe('Game StatsComponent', () => {
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

  it('Init the component data', inject([SocketService], async(socketService: SocketService) => {
    const fixture = TestBed.createComponent(StatsComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(socketService, 'initGameSocket');
    spyOn(app, 'readNewMatches');
    app.ngOnInit();

    expect(socketService.initGameSocket).toHaveBeenCalled();
    expect(app.readNewMatches).toHaveBeenCalled();
  }));

  it('Properly detecting duplicate matches', async(() => {
    //arrange
    let tile1 = new TileModel();
    tile1._id = 'ab';
    tile1.match = {foundBy: 'test', otherTileId: 'cd', foundOn: 'time' };

    let tile2 = new TileModel();
    tile2._id = 'cd';
    tile2.match = {foundBy: 'test', otherTileId: 'ab', foundOn: 'time' };

    let tile3 = new TileModel();
    tile3._id = 'de';
    tile3.match = {foundBy: 'test', otherTileId: 'fg', foundOn: 'time' };

    const fixture = TestBed.createComponent(StatsComponent);
    const app = fixture.debugElement.componentInstance;

    //act
    const response1 = app.addIfNotTileExists(tile1);
    const response2 = app.addIfNotTileExists(tile2);
    const response3 = app.addIfNotTileExists(tile3);

    //assert
    expect(app.knownTilesMap[tile1._id]).toBeTruthy();
    expect(app.knownTilesMap[tile2._id]).toBeTruthy();
    expect(app.knownTilesMap[tile3._id]).toBeTruthy();

    expect(response1).toBeTruthy();
    expect(response2).toBeFalsy();
    expect(response3).toBeTruthy();
  }));
});

export class MockBackendService { }
