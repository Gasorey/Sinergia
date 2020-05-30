import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import CreateUserService from '../UserServices/CreateUserService';
import CreatePostService from './CreatePostService';
import ShowOnePostService from './ShowOnePostService';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import AppError from '../../errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakePostRepository: FakePostsRepository;
let createUser: CreateUserService;
let createPost: CreatePostService;
let showOnePost: ShowOnePostService;
let fakeHashProvider: FakeHashProvider;

describe('Show a post with comments', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostRepository);
    showOnePost = new ShowOnePostService(fakePostRepository);
  });
  it('Should be able  to show a specif post using the post id', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });

    const post = await createPost.execute({
      content: 'First Post',
      user_id: user.id,
    });

    const list = await showOnePost.execute(post.id);
    expect(list).toHaveProperty('id');
  });
  it('Shoud not be able to list a non-existing post', async () => {
    await expect(showOnePost.execute('nothing')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
