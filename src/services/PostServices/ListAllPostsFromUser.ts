import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import AppError from '../../errors/AppError';
import Post from '../../database/typeorm/entities/Post';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListAllPostsFromUser {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(user_id: string): Promise<Post[] | undefined> {
    const postList = await this.postsRepository.findPostsByUserId(user_id);
    return postList;
  }
}
