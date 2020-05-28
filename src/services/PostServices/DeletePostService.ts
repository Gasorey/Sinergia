import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import AppError from '../../errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export default class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const findPost = await this.postsRepository.findPostById(id);

    if (!findPost) {
      throw new AppError('This post does not exist');
    }
    if (findPost.user_id === user_id) {
      await this.postsRepository.delete(id);
    }
  }
}
