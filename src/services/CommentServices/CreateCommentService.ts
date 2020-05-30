import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';

import Comment from '../../database/typeorm/entities/Comment';
import ICommentsRepository from '../../database/typeorm/repositories/interfaces/ICommentsRepository';
import ICreateCommentDTO from '../../database/typeorm/repositories/dtos/ICreateCommentDTO';

interface IRequest {
  user_id: string;
  post_id: string;
  content: string;
}

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(data: ICreateCommentDTO): Promise<Comment> {
    const comment = await this.commentsRepository.create(data);
    return comment;
  }
}

export default CreateCommentService;
