import { UserIdToUserInfoPipe } from './user-id-to-user-info.pipe';

describe('UserIdToUserInfoPipe', () => {
  it('create an instance', () => {
    const pipe = new UserIdToUserInfoPipe();
    expect(pipe).toBeTruthy();
  });
});
