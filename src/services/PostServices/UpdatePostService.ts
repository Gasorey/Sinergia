import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppError';
import IPostRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import Post from '../../database/typeorm/entities/Post';
import IUpdatePostDTO from '../../database/typeorm/repositories/dtos/IUpdatePostDTO';

@injectable()
export default class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    content,
    user_id,
    id,
  }: IUpdatePostDTO): Promise<Post> {
    const findPost = await this.postRepository.findPostById(id);
    if (!findPost) {
      throw new AppError('This post does not exist');
    }
    if (findPost.user_id !== user_id) {
      throw new AppError('You cannot update your own post');
    }
    findPost.content = content;
    await this.postRepository.save(findPost);

    return findPost;
  }
}
