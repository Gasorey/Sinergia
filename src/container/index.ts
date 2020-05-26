import { container } from 'tsyringe';

import IUsersRepository from '../database/typeorm/repositories/interfaces/IUsersRepository';
import UsersRepository from '../database/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
