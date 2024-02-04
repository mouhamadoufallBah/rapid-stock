import { ClientIdToClientInfoPipe } from './client-id-to-client-info.pipe';

describe('ClientIdToClientInfoPipe', () => {
  it('create an instance', () => {
    const pipe = new ClientIdToClientInfoPipe();
    expect(pipe).toBeTruthy();
  });
});
