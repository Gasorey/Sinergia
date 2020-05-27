import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';

import User from '../../database/typeorm/entities/User';
import IUsersRepository from '../../database/typeorm/repositories/interfaces/IUsersRepository';

interface IRequest {
  // name: string;
  // password: string;
  email: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (findUser) {
      await this.usersRepository.delete(email);
    }
  }
}
export default DeleteUserService;
