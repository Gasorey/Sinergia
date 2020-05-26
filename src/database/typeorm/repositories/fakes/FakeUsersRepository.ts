import { uuid } from 'uuidv4';
import User from '../../entities/User';
import IUsersRepository from '../interfaces/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), ...userData });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async delete(email: string): Promise<void> {
    const findIndex = this.users.find(findUser => findUser.email === email);

    if (findIndex) {
      this.users;
    }
  }
}
export default FakeUsersRepository;
