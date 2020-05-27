import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';
import AppError from '../../errors/AppError';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
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
      password: 'senha',
    });

    const updatedUser = await updateUserService.execute({
      email: 'gasorey@gmail.com',
      name: 'Gabriel Asorey',
      user_id: user.id,
      old_password: 'senha',
      password: 'novaSenha',
    });
    expect(updatedUser.password).toBe('novaSenha');
  });
});
