import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CommentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content } = request.body;
    const { post_id } = request.params;
  }
}
