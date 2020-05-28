import { injectable, inject } from 'tsyringe';
import Post from '../../database/typeorm/entities/Post';
import IPostsRepository from '../../database/typeorm/repositories/interfaces/IPostsRepository';
import AppError from '../../errors/AppError';
// import User from '../../database/typeorm/entities/User';

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
    const post = this.postsRepository.create({
      content,
      user_id,
    });
    return post;
  }
}
export default CreatePostsService;
