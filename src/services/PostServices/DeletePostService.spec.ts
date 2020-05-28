import CreatePostService from './CreatePostService';
import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import AppError from '../../errors/AppError';
import DeletePostService from './DeletePostService';
import CreateUserService from '../UserServices/CreateUserService';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';

let fakePostRepository: FakePostsRepository;
let createPost: CreatePostService;
let deletePost: DeletePostService;
let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('DeleteService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePostRepository = new FakePostsRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostRepository);
    deletePost = new DeletePostService(fakePostRepository);
  });
  it('Should be able to delete a post', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const post = await createPost.execute({
      content: 'Primeiro post para teste',
      user_id: user.id,
    });
    await deletePost.execute(post.id, user.id);
    expect(!post);
  });
  it('Should not be able to delete a post from another user', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const user2 = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey2@gmail.com',
      password: '123456',
    });
    const post = await createPost.execute({
      content: 'Primeiro post para teste',
      user_id: user.id,
    });
    await expect(deletePost.execute(post.id, user2.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
