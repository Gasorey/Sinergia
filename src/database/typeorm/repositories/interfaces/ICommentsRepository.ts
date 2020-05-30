import Comment from '../../entities/Comment';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';

export default interface ICommentsRepository {
  create(commentData: ICreateCommentDTO): Promise<Comment | undefined>;
  save(data: ICreateCommentDTO): Promise<Comment>;
  delete(id: string): Promise<void>;
  findAllCommentsByUser(user_id: string): Promise<Comment[] | undefined>;
  findCommentById(id: string): Promise<Comment | undefined>;
}
