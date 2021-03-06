import { getRepository, Repository } from 'typeorm';
import Post from '../entities/Post';
import IPostRepository from './interfaces/IPostsRepository';
import ICreatePostDTO from './dtos/ICreatePostDTO';
import IUpdatePostDTO from './dtos/IUpdatePostDTO';

class PostsRepository implements IPostRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create(postData);

    await this.ormRepository.save(post);

    return post;
  }

  public async findPostsByUserEmail(
    email: string,
  ): Promise<Post[] | undefined> {
    const posts = await this.ormRepository.find({
      where: {
        user: {
          email,
        },
      },
    });
    return posts;
  }

  public async findPostsByUserId(id: string): Promise<Post[] | undefined> {
    const posts = await this.ormRepository.find({
      where: {
        user: {
          id,
        },
      },
    });
    return posts;
  }

  public async save(data: IUpdatePostDTO): Promise<Post> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    const post = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    await this.ormRepository.remove(post);
  }

  public async findPostById(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne({
      relations: ['comments'],
      where: { id },
    });
    return post;
  }

  public async findAllPost(): Promise<Post[] | undefined> {
    const posts = await this.ormRepository.find({
      order: { created_at: 'DESC' },
    });
    return posts;
  }
}
export default PostsRepository;
