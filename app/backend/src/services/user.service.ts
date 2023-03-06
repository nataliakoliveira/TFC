import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import IResponse from '../interfaces/IResponse';
import User from '../database/models/User';
import generateToken from '../utils/jwt';
import validateLogin from './validations/validationsInputs';

class UserService {
  private model: ModelStatic<User> = User;

  public async login(login: ILogin): Promise<IResponse> {
    const user = await this.model.findOne({ where: { email: login.email } });
    const error = validateLogin(login);
    if (error) {
      return UserService.createErrorResponse(401, 'Invalid email or password');
    }

    const passwordMatch = bcrypt.compareSync(login.password, user?.password || '_');

    if (!user || !passwordMatch) {
      return UserService.createErrorResponse(401, 'Invalid email or password');
    }

    const { id, email, role, username } = user;
    const token = generateToken({ id, email, role, username });

    return UserService.createSuccessResponse(200, { token });
  }

  private static createSuccessResponse(status: number, message: unknown): IResponse {
    return { status, message };
  }

  private static createErrorResponse(status: number, message: unknown): IResponse {
    return UserService.createSuccessResponse(status, { message });
  }
}

export default UserService;
