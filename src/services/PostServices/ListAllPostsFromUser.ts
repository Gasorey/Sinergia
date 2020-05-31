import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import Post from '../../database/typeorm/entities/Post';

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
