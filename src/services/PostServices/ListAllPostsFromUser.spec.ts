import AppError from '../../errors/AppError';
import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import CreateUserService from '../UserServices/CreateUserService';
import CreatePostService from './CreatePostService';
import ListAllPostsFromUser from './ListAllPostsFromUser';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakePostRepository: FakePostsRepository;
let createUser: CreateUserService;
let createPost: CreatePostService;
let listAllPosts: ListAllPostsFromUser;
let fakeHashProvider: FakeHashProvider;

describe('List Posts from user', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostRepository);
    listAllPosts = new ListAllPostsFromUser(fakePostRepository);
  });
  it('Should be able to list all posts from a User', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Sinergia',
      email: 'Gasorey@sinergia.com',
      password: 'sinergia',
    });
    await createPost.execute({
      content: 'First Post',
      user_id: user.id,
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
    // expect(list).toEqual((await list).length === 2);
  });
});
