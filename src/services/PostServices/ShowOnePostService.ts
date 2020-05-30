import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import AppError from '../../errors/AppError';
import Post from '../../database/typeorm/entities/Post';

@injectable()
class ShowOnePost {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(id: string): Promise<Post | undefined> {
    const post = await this.postsRepository.findPostById(id);

    if (!post) {
      throw new AppError('This post does not exist');
    }
    return post;
  }
}
export default ShowOnePost;
