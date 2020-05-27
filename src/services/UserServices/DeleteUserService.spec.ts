import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';
import CreateUserService from './CreateUserService';
import AppError from '../../errors/AppError';

let fakeUsersRepository: FakeUsersRepository;

let createUser: CreateUserService;
let deleteUser: DeleteUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository);
    deleteUser = new DeleteUserService(fakeUsersRepository);
  });
  it('shoud be able to delete an user', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });

    const { email } = user;

    await deleteUser.execute({ email });

    expect(!user);
  });
  it('should not be able to delete and user that does not exist', async () => {
    const {email} = 'fake@email.com'

    await expect(deleteUser.execute({email}))
  }
});
