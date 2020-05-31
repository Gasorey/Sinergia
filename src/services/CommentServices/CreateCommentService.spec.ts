import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import CreateUserService from '../UserServices/CreateUserService';
import CreatePostService from '../PostServices/CreatePostService';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import CreateCommentService from './CreateCommentService';
import FakeCommentsRepository from '../../database/typeorm/repositories/fakes/FakeCommentsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakePostRepository: FakePostsRepository;
let createUser: CreateUserService;
let createPost: CreatePostService;
let fakeHashProvider: FakeHashProvider;
let createComment: CreateCommentService;
let fakeCommentsRepository: FakeCommentsRepository;

describe('Create Comment', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();
    createComment = new CreateCommentService(fakeCommentsRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostRepository);
  });
  it('Should be able to create a comment in a post', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const post = await createPost.execute({
      content: 'Post for testing',
      user_id: user.id,
    });
    const comment = await createComment.execute({
      content: 'First comment',
      user_id: user.id,
      post_id: post.id,
    });
    expect(comment).toHaveProperty('id');
  });
});
