import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  constructor(private _service: UserService) {}

  async login(req: Request, res: Response) {
    const { status, message } = await this._service.login(req.body);
    res.status(status).json(message);
  }
}

export default UserController;
