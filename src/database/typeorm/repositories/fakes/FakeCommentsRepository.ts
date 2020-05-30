import { uuid } from 'uuidv4';
import Comment from '../../entities/Comment';
import ICommentsRepository from '../interfaces/ICommentsRepository';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';
import IUpdateCommentDTO from '../dtos/IUpdateCommentDTO';

class FakeCommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async create(commentData: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, { id: uuid(), ...commentData });

    this.comments.push(comment);

    return comment;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.comments.findIndex(
      findComment => findComment.id === id,
    );
    if (findIndex > 0) {
      this.comments.splice(findIndex, 1);
    }
  }

  public async findAllCommentsByUser(
    user_id: string,
  ): Promise<Comment[] | undefined> {
    const findComment = this.comments.filter(
      comment => comment.user_id === user_id,
    );
    return findComment;
  }

  public async findCommentById(id: string): Promise<Comment | undefined> {
    const findComment = this.comments.find(comment => comment.id === id);

    return findComment;
  }

  public async save({
    content,
    user_id,
    id,
  }: IUpdateCommentDTO): Promise<Comment> {
    const findIndex = this.comments.findIndex(
      findComment => findComment.id === id,
    );

    const comment = this.comments[findIndex];

    comment.content = content;

    return comment;
  }
}
export default FakeCommentsRepository;
