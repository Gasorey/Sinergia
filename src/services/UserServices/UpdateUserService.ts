import { inject, injectable } from 'tsyringe';
import User from '../../database/typeorm/entities/User';
import AppError from '../../errors/AppError';
import IUsersRepository from '../../database/typeorm/repositories/interfaces/IUsersRepository';
import IHashProvider from '../../provider/HashProvider/models/IHashProvider';

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
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    user_id,
    name,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('This user doest exist');
    }

    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail && checkEmail.id !== user_id) {
      throw new AppError('This email is already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Old password must be informed');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
      user.password = await this.hashProvider.generateHash(password);
    }
    return this.usersRepository.save(user);
  }
}
export default UpdateUserService;
