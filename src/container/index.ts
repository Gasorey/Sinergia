import '../provider';
import { container } from 'tsyringe';

import UsersRepository from '../database/typeorm/repositories/UsersRepository';
import IUsersRepository from '../database/typeorm/repositories/interfaces/IUsersRepository';

import PostsRepository from '../database/typeorm/repositories/PostsRepository';
import IPostsRepository from '../database/typeorm/repositories/interfaces/IPostsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);
