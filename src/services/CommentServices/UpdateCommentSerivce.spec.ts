import FakePostsRepository from '../../database/typeorm/repositories/fakes/FakePostsRepository';
import CreateUserService from '../UserServices/CreateUserService';
import CreatePostService from '../PostServices/CreatePostService';
import FakeHashProvider from '../../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import CreateCommentService from './CreateCommentService';
import AppError from '../../errors/AppError';
import FakeCommentsRepository from '../../database/typeorm/repositories/fakes/FakeCommentsRepository';
import UpdateCommentService from './UpdateCommentService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostRepository: FakePostsRepository;
let createUser: CreateUserService;
let createPost: CreatePostService;
let fakeHashProvider: FakeHashProvider;
let createComment: CreateCommentService;
let fakeCommentsRepository: FakeCommentsRepository;
let updateComment: UpdateCommentService;

describe('Update Comment', () => {
  beforeEach(() => {
    fakePostRepository = new FakePostsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();
    createComment = new CreateCommentService(fakeCommentsRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPost = new CreatePostService(fakePostRepository);
    updateComment = new UpdateCommentService(fakeCommentsRepository);
  });
  it('Should be able to update a comment in a post', async () => {
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
    const updatedComment = await updateComment.execute({
      content: 'This comment have been updated',
      id: comment.id,
      user_id: user.id,
    });
    expect(updatedComment.content).toBe('This comment have been updated');
  });
  it('Should not be able to update a comment from another user', async () => {
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
    await expect(
      updateComment.execute({
        content: 'First Comment',
        id: comment.id,
        user_id: 'another user id here',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
