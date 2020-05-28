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

  public async delete(request: Request): Promise<void> {
    const user_id = request.user.id;
    const id = request.body;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute(id, user_id);
  }
}
