import { hash, compare } from 'bcrypt';
import FakeUsersRepository from '../../database/typeorm/repositories/fakes/FakeUsersRepository';
import AppError from '../../errors/AppError';
import UpdateUserService from './UpdateUserService';
