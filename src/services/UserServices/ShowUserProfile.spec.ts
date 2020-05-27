import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import AppError from '../../errors/AppError';
import ShowUserProfile from './ShowUserProfile';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfile;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfile = new ShowUserProfile(fakeUsersRepository);
  });
  it('Should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });
    const profile = await showUserProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('Gabriel Sinergia');
    expect(profile.email).toBe('Gasorey@sinergia.com');
  });
  it('Should not be able to show profile from a non-existing user', async () => {
    await expect(
      showUserProfile.execute({
        user_id: 'this user does not exist',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
