import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePostService from '../../../services/PostServices/CreatePostService';
import DeletePostService from '../../../services/PostServices/DeletePostService';
import ListAllPostsFromUser from '../../../services/PostServices/ListAllPostsFromUser';
import ListAllPosts from '../../../services/PostServices/ListAllService';

export default class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const content = request.body;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      content,
      user_id,
    });

    return response.json(post);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.params;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute(post_id, user_id);
    return response.status(204).send();
  }

  public async listUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const listPost = container.resolve(ListAllPostsFromUser);

    const posts = await listPost.execute(user_id);

    return response.json(posts);
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const listPosts = container.resolve(ListAllPosts);

    const posts = listPosts.execute(user_id);
    return response.json(posts);
  }
  // public async update( request: Request, response: Response): Promise<Response>{
  //   const user_id = request.user.id;
  //   const { content } = request.body
  // }
}
