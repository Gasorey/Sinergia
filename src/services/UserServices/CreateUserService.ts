import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';
import IHashProvider from '../../provider/HashProvider/models/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, password, email }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('E-mail address already used.');
    }
    const hashPass = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      email,
      name,
      password: hashPass,
    });
    return user;
  }
}
export default CreateUserService;
