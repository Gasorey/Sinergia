import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import AppError from '../../errors/AppError';

import User from '../../database/typeorm/entities/User';
import IUsersRepository from '../../database/typeorm/repositories/interfaces/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, password, email }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail address already used.');
    }
    const hashPass = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashPass,
    });

    return user;
  }
}
export default CreateUserService;
