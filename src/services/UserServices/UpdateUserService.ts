import { inject, injectable } from 'tsyringe';
import User from '../../database/typeorm/entities/User';
import AppError from '../../errors/AppError';
import IUsersRepository from '../../database/typeorm/repositories/interfaces/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    user_id,
    name,
    old_password,
    password,
  }: IRequest): Promise<User> {}
}
export default UpdateUserService;
