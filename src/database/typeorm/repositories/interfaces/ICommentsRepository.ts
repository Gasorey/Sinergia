import Comment from '../../entities/Comment';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';
import IUpdateCommentDTO from '../dtos/IUpdateCommentDTO';

export default interface ICommentsRepository {
  create(commentData: ICreateCommentDTO): Promise<Comment | undefined>;
  save(data: IUpdateCommentDTO): Promise<Comment>;
  delete(id: string): Promise<void>;
  findAllCommentsByUser(user_id: string): Promise<Comment[] | undefined>;
  findCommentById(id: string): Promise<Comment | undefined>;
}
