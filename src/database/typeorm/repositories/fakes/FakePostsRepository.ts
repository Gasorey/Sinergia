import { uuid } from 'uuidv4';
import Post from '../../entities/Post';
import IPostsRepository from '../interfaces/IPostsRepository';
import ICreatePostDTO from '../dtos/ICreatePostDTO';

class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findPostsByUserId(user_id: string): Promise<Post[] | undefined> {
    const findPosts = this.posts.filter(post => post.user_id === user_id);

    return findPosts;
  }

  public async findPostsByUserEmail(
    email: string,
  ): Promise<Post[] | undefined> {
    const findPosts = this.posts.filter(post => post.user.email === email);

    return findPosts;
  }

  public async create(postData: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, { id: uuid(), ...postData });

    this.posts.push(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    const findIndex = this.posts.findIndex(findPost => findPost.id === post.id);

    this.posts[findIndex] = post;

    return post;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.posts.findIndex(findPost => findPost.id === id);

    if (findIndex > 0) {
      this.posts.splice(findIndex, 1);
    }
  }

  public async findPostById(id: string): Promise<Post> {
    const findPost = this.posts.find(post => post.id === id);
    return findPost;
  }

  public async findAllPost(): Promise<Post[] | undefined> {
    const post = this.posts;
    return post;
  }
}
export default FakePostsRepository;
