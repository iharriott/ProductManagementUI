import { CastFormArrayPipe } from './cast-form-array.pipe';

describe('CastFormArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new CastFormArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
