import Post from '../../entities/Post';
import ICreatePostDTO from '../dtos/ICreatePostDTO';

export default interface IPostsRepository {
  findPostById(id: string): Promise<Post | undefined>;
  findAllPost(id: string): Promise<Post[] | undefined>;
  findPostsByUserId(user_id: string): Promise<Post[] | undefined>;
  findPostsByUserEmail(email: string): Promise<Post[] | undefined>;
  create(postData: ICreatePostDTO): Promise<Post>;
  save(post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
