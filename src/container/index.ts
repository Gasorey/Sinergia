import '../provider';
import { container } from 'tsyringe';

import UsersRepository from '../database/typeorm/repositories/UsersRepository';
import IUsersRepository from '../database/typeorm/repositories/interfaces/IUsersRepository';

import PostsRepository from '../database/typeorm/repositories/PostsRepository';
import IPostsRepository from '../database/typeorm/repositories/interfaces/IPostsRepository';

import CommentsRepository from '../database/typeorm/repositories/CommentsRepository';
import ICommentsRepository from '../database/typeorm/repositories/interfaces/ICommentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);
container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);
