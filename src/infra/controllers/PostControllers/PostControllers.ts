import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePostService from '../../../services/PostServices/CreatePostService';
import DeletePostService from '../../../services/PostServices/DeletePostService';

export default class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const content = request.body;
    const user_id = request.user.id;

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
}
