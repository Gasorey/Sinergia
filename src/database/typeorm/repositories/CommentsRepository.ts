import { getRepository, Repository } from 'typeorm';
import ICommentsRepository from './interfaces/ICommentsRepository';
import ICreateCommentDTO from './dtos/ICreateCommentDTO';
import Comment from '../entities/Comment';
import IUpdateCommentDTO from './dtos/IUpdateCommentDTO';

class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async create(commentData: ICreateCommentDTO): Promise<Comment> {
    const comment = this.ormRepository.create(commentData);

    await this.ormRepository.save(comment);

    return comment;
  }

  public async delete(id: string): Promise<void> {
    const comment = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    await this.ormRepository.remove(comment);
  }

  public async findAllCommentsByUser(
    user_id: string,
  ): Promise<Comment[] | undefined> {
    const comments = await this.ormRepository.find({
      where: { user_id },
    });
    return comments;
  }

  public async findCommentById(id: string): Promise<Comment | undefined> {
    const comment = await this.ormRepository.findOne({
      where: { id },
    });
    return comment;
  }

  public async save(data: IUpdateCommentDTO): Promise<Comment> {
    return this.ormRepository.save(data);
  }
}
export default CommentsRepository;
