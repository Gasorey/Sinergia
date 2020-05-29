import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import AppError from '../../errors/AppError';
import Post from '../../database/typeorm/entities/Post';

@injectable()
export default class ListAllPostsFromUser {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(user_id: string): Promise<Post[] | undefined> {
    const listPosts = await this.postsRepository.findAllPost(user_id);
    if (!user_id) {
      throw new AppError('you must be logged to access this rote');
    }
    if (!listPosts) {
      throw new AppError('Doesnt found any posts');
    }
    console.log(user_id);
    console.log(listPosts);

    return listPosts;
  }
}
