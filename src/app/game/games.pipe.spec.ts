import { GamesPipe } from './games.pipe';
import { GameModel } from '../shared/game.model';
import { UserModel } from '../shared/user.model';

const inputArray = [
  new GameModel('startTime', 1, 'createdOn', { id: 'shanghai'}, 2, 'open', [ new UserModel('id1', 'name1'), new UserModel('id2', 'name2') ], 'endedOn', 'id', new UserModel('id2', 'name2')),
  new GameModel('startTime', 1, 'createdOn', { id: 'shanghai'}, 2, 'open', [ new UserModel('id3', 'name3') ], 'endedOn', 'id', new UserModel('id1', 'name1')),
  new GameModel('startTime', 1, 'createdOn', { id: 'shanghai'}, 2, 'open', [ new UserModel('id2', 'name2') ], 'endedOn', 'id', new UserModel('id1', 'name1')),
  new GameModel('startTime', 1, 'createdOn', { id: 'shanghai'}, 2, 'created', [ new UserModel('id1', 'name1') ], 'endedOn', 'id', new UserModel('id1', 'name1')),
  new GameModel('startTime', 1, 'createdOn', { id: 'shanghai'}, 2, 'finished', [ new UserModel('id1', 'name1'), new UserModel('id2', 'name2') ], 'endedOn', 'id', new UserModel('id2', 'name2'))
]

describe('GamesPipe', () => {
  it('Creates an instance', () => {
    const pipe = new GamesPipe();
    expect(pipe).toBeTruthy();
  });

  it('Doesnt change source array', function() {
    const pipe = new GamesPipe();
    const beforeFilteringLength = inputArray.length;
    var output = pipe.transform(inputArray, ['open'], null, null);

    expect(beforeFilteringLength).toEqual(inputArray.length);
  });

  it('Filters state correctly', function() {
    const pipe = new GamesPipe();
    var output = pipe.transform(inputArray, ['open', 'created'], null, null);

    const expected = [
      inputArray[0],
      inputArray[1],
      inputArray[2],
      inputArray[3]
    ]

    expect(output).toEqual(expected);
  });

  it('Filters createdBy correctly', function() {
    const pipe = new GamesPipe();
    var output = pipe.transform(inputArray, [], 'id2');

    const expected = [
      inputArray[0],
      inputArray[4]
    ]

    expect(output).toEqual(expected);
  });

  it('Filters playedBy correctly', function() {
    const pipe = new GamesPipe();
    var output = pipe.transform(inputArray, [], null, 'id3');

    const expected = [
      inputArray[1]
    ]

    expect(output).toEqual(expected);
  });

  it('Filters combo correctly', function() {
    const pipe = new GamesPipe();
    var output = pipe.transform(inputArray, ['finished'], null, 'id1');

    const expected = [
      inputArray[4]
    ]

    expect(output).toEqual(expected);
  });

  it('Filters createdBy + playedBy correctly (both)', function() {
    const pipe = new GamesPipe();
    var output = pipe.transform(inputArray, [''], 'id4', 'id4');

    const expected = [
    ]

    expect(output).toEqual(expected);
  });
});
