import { injectable, inject } from 'tsyringe';
import AppError from '../../errors/AppError';
import IPostRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import Post from '../../database/typeorm/entities/Post';

@injectable()
export default class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute(content: string, user_id: string): Promise<Post> {
    const;
  }
}
