import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import Post from '../../database/typeorm/entities/Post';

@injectable()
export default class ListAll {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(): Promise<Post[] | undefined> {
    const posts = await this.postsRepository.findAllPost();

    return posts;
  }
}
