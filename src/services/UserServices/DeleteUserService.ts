import { inject, injectable } from 'tsyringe';
import AppError from '../../errors/AppError';

import IUsersRepository from '../../database/typeorm/repositories/interfaces/IUsersRepository';
import IHashProvider from '../../provider/HashProvider/models/IHashProvider';

interface IRequest {
  // name: string;
  password?: string;
  email: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<void> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('This user does not exist');
    }

    const checkPass = await this.hashProvider.compareHash(
      password,
      findUser.password,
    );

    if (!checkPass) {
      throw new AppError('Wrong password');
    }
    console.log(checkPass);
    await this.usersRepository.delete(email);
  }
}
export default DeleteUserService;
