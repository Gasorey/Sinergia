import { container } from 'tsyringe';

import UsersRepository from '../database/typeorm/repositories/UsersRepository';
import IUsersRepository from '../database/typeorm/repositories/interfaces/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
