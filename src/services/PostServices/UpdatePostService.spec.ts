import AppError from '../../errors/AppError';
import UpdatePostService from './UpdatePostService';
import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../UserServices/CreateUserService';
import CreatePostService from './CreatePostService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostRepository: FakePostsRepository;
let createUser: CreateUserService;
let createPost: CreatePostService;
let updatePost: UpdatePostService;
let fakeHashProvider: FakeHashProvider;

describe('List Posts from data base', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostRepository);
    updatePost = new UpdatePostService(fakePostRepository);
  });
  it('Should be able to update a post', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const post = await createPost.execute({
      content: 'Test post',
      user_id: user.id,
    });
    const updatedPost = await updatePost.execute({
      content: 'Updated Test Post',
      id: post.id,
      user_id: user.id,
    });
    expect(updatedPost.content).toBe('Updated Test Post');
  });
  it('Should not be able to update a post with wrong post id', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const post = await createPost.execute({
      content: 'Test post',
      user_id: user.id,
    });
    await expect(
      updatePost.execute({
        content: 'Updated Test Post',
        id: 'anything here',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should be able to update a post', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const post = await createPost.execute({
      content: 'Test post',
      user_id: user.id,
    });
    const updatedPost = await updatePost.execute({
      content: 'Updated Test Post',
      id: post.id,
      user_id: user.id,
    });
    expect(updatedPost.content).toBe('Updated Test Post');
  });
  it('Should not be able to update a post with wrong post id', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const post = await createPost.execute({
      content: 'Test post',
      user_id: user.id,
    });
    await expect(
      updatePost.execute({
        content: 'Updated Test Post',
        id: post.id,
        user_id: 'anything here',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
