import { inject, injectable } from 'tsyringe';
import ICommentsRepository from '../../database/typeorm/repositories/CommentsRepository';
import AppError from '../../errors/AppError';

@injectable()
class DeleteCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(user_id: string, id: string): Promise<void> {
    const comment = await this.commentsRepository.findCommentById(id);

    if (comment.user_id !== user_id) {
      throw new AppError('You can not delete a comment from another user');
    }
    await this.commentsRepository.delete(comment.id);
  }
}
export default DeleteCommentService;
