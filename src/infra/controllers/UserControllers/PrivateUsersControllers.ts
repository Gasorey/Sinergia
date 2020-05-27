import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowUserProfileService from '../../../services/UserServices/ShowUserProfileService';

export default class PrivateUsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowUserProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }
}
