import { inject, injectable } from 'tsyringe';
import User from '../../database/typeorm/entities/User';
import IUsersRepository from '../../database/typeorm/repositories/interfaces/IUsersRepository';
import AppError from '../../errors/AppError';

interface IResquest {
  user_id: string;
}

@injectable()
class ShowUserProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IResquest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user was not found');
    }
    return user;
  }
}

export default ShowUserProfile;
