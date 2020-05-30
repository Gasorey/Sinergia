import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';
import Comment from '../../database/typeorm/entities/Comment';
import ICommentsRepository from '../../database/typeorm/repositories/interfaces/ICommentsRepository';
import IUpdateComments from '../../database/typeorm/repositories/dtos/IUpdatePostDTO';
@injectable()
export default class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    user_id,
    content,
    id,
  }: IUpdateComments): Promise<Comment> {
    const comment = await this.commentsRepository.findCommentById(id);

    if (user_id !== comment.user_id) {
      throw new AppError('You can not update a comment from another user');
    }

    comment.content = content;

    await this.commentsRepository.save(comment);

    return comment;
  }
}
