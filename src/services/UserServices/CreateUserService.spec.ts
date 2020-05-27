import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '../../errors/AppError';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('shoud be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });
    expect(user).toHaveProperty('id');
  });
  it('should be not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });

    await expect(
      createUser.execute({
        name: 'Gabriel Sinergia',
        email: 'Gasorey@sinergia.com',
        password: 'sinergia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
