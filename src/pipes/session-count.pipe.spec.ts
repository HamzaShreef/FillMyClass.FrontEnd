import { SessionCountPipe } from './session-count.pipe';

describe('SessionCountPipe', () => {
  it('create an instance', () => {
    const pipe = new SessionCountPipe();
    expect(pipe).toBeTruthy();
  });
});
