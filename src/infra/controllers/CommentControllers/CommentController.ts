import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCommentService from '../../../services/CommentServices/CreateCommentService';
import UpdateCommentService from '../../../services/CommentServices/UpdateCommentService';
import DeleteCommentService from '../../../services/CommentServices/DeleteCommentService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content } = request.body;
    const { id } = request.params;

    const updateComment = container.resolve(UpdateCommentService);

    const updatedComment = await updateComment.execute({
      content,
      user_id,
      id,
    });

    return response.json(updatedComment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const commentToBeDeleted = container.resolve(DeleteCommentService);

    await commentToBeDeleted.execute(user_id, id);

    return response.status(204).send();
  }
}
