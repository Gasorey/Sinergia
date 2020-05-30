import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCommentService from '../../../services/CommentServices/CreateCommentService';

export default class CommentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content } = request.body;
    const { post_id } = request.params;

    const createCommnet = container.resolve(CreateCommentService);

    const comment = await createCommnet.execute({
      user_id,
      content,
      post_id,
    });
    return response.json(comment);
  }
}
