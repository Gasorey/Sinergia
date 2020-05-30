import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Post from '../../database/typeorm/entities/Post';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';

interface IRequest {
  content: string;
  user_id: string;
}

@injectable()
class CreatePostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ content, user_id }: IRequest): Promise<Post> {
    const post = await this.postsRepository.create({
      content,
      user_id,
    });

    return post;
  }
}
export default CreatePostsService;
