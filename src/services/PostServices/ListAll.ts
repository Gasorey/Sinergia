import { inject, injectable } from 'tsyringe';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import Post from '../../database/typeorm/entities/Post';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListAll {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Post[] | undefined> {
    const posts = await this.postsRepository.findAllPost(user_id);

    return posts;
  }
}
