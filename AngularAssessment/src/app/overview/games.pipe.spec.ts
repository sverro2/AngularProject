import { GamesPipe } from './games.pipe';

describe('GamesPipe', () => {
  it('create an instance', () => {
    const pipe = new GamesPipe();
    expect(pipe).toBeTruthy();
  });
});
