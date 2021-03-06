import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';
import CreateUserService from './CreateUserService';
import AppError from '../../errors/AppError';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;
let deleteUser: DeleteUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    deleteUser = new DeleteUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('shoud be able to delete an user', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });

    const { email, password } = user;

    await deleteUser.execute({ email, password });

    expect(!user);
  });
  it('should not be able to delete and user that does not exist', async () => {
    await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });

    await expect(
      deleteUser.execute({
        email: 'wrongemail@mail.com',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to delete and user that does not exist', async () => {
    await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });

    await expect(
      deleteUser.execute({
        email: 'Gasorey@sinergia.com',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
