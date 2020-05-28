import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import CreatePostService from './CreatePostService';
import CreateUserService from '../UserServices/CreateUserService';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;
let createPost: CreatePostService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostsRepository);
  });
  it('shoud be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });
    const post = await createPost.execute({
      content: 'First Post',
      user_id: user.id,
    });
    expect(post).toHaveProperty('id');
    expect(post.content).toBe('First Post');
    expect(post.user_id).toBe(user.id);
  });
});
