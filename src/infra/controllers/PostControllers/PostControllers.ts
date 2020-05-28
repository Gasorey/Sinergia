import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePostService from '../../../services/PostServices/CreatePostService';

export default class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const content = request.body;
    const user_id = request.user.id;

    const createPost = container.resolve(CreatePostService);

    const post = createPost.execute({
      content,
      user_id,
    });
    return response.json(post);
  }

  public async delete(request: Request, response: Reponse): Promise<Response> {
    const user_id = request.user.id;
  }
}
