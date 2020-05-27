import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import AppError from '../../errors/AppError';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserService = new UpdateUserService(fakeUsersRepository);
  });
  it('shoud be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });
    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      name: 'Gabriel Asorey',
      email: 'Gasorey@gmail.com',
    });
    expect(updatedUser.name).toBe('Gabriel Asorey');
    expect(updatedUser.email).toBe('Gasorey@gmail.com');
  });
  it('should not be able to change the email to an email already in use', async () => {
    await fakeUsersRepository.create({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Asorey',
      email: 'Gasorey@gmail.com',
      password: 'sinergia',
    });
    await expect(
      updateUserService.execute({
        user_id: user.id,
        name: 'Gabriel Asorey',
        email: 'Gasorey@sinergia.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: 'teste',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: 'sinergia',
      old_password: 'teste',
    });
    expect(updatedUser.password).toBe('sinergia');
  });
});
