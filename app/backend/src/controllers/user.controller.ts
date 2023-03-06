import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  constructor(private _service: UserService) {}

  async login(req: Request, res: Response) {
    const { status, message } = await this._service.login(req.body);
    res.status(status).json(message);
  }

  static role(_req: Request, res: Response) {
    const { payload } = res.locals.user;
    const { role } = payload;
    res.status(200).json({ role });
  }
}

export default UserController;
