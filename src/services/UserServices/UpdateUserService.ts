import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcrypt';
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
      const checkOldPassword = await compare(old_password, user.password);
      console.log(old_password);
      console.log(password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
      user.password = await hash(password, 8);
    }
    console.log(user.password);
    return this.usersRepository.save(user);
  }
}
export default UpdateUserService;
