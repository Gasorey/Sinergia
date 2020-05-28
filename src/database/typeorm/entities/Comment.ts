import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import User from './User';
import Post from './Post';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  content: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post, post => post.comment)
  post: Post;

  @Column('uuid')
  post_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
