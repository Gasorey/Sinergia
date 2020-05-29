import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import CreateUserService from '../UserServices/CreateUserService';
import CreatePostService from './CreatePostService';
import ListAllPosts from './ListAllService';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakePostRepository: FakePostsRepository;
let createUser: CreateUserService;
let createPost: CreatePostService;
let listAllPosts: ListAllPosts;
let fakeHashProvider: FakeHashProvider;

describe('List Posts from data base', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostRepository);
    listAllPosts = new ListAllPosts(fakePostRepository);
  });
  it('Should be able to list all posts from data base', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });
    const user2 = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey2@gmail.com',
      password: '123456',
    });
    await createPost.execute({
      content: 'First Post',
      user_id: user2.id,
    });
    await createPost.execute({
      content: 'Second Post',
      user_id: user.id,
    });
    await createPost.execute({
      content: 'Thrid Post',
      user_id: user.id,
    });
    const list = listAllPosts.execute(user.id);
    expect((await list).length).toEqual(3);
  });
});
