import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import AppError from '../../errors/AppError';

@injectable()
export default class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const findPost = await this.postsRepository.findPostById(id);

    if (findPost.user_id !== user_id) {
      throw new AppError('You can not delete a post from another user');
    }
    await this.postsRepository.delete(id);
  }
}
