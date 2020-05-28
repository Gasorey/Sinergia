import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowUserProfileService from '../../../services/UserServices/ShowUserProfileService';
import DeleteUserService from '../../../services/UserServices/DeleteUserService';
import UpdateUserService from '../../../services/UserServices/UpdateUserService';

export default class PrivateUsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowUserProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async delete(request: Request): Promise<void> {
    const { email, password } = request.body;

    const deleteProfile = container.resolve(DeleteUserService);

    await deleteProfile.execute({ email, password });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      email,
      name,
      user_id,
      old_password,
      password,
    });
    return response.json(classToClass(user));
  }
}
