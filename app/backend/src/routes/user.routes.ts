import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import login from '../middlewares/login';
import tokenValidation from '../middlewares/validateToken';

const userService = new UserService();
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post('/login', login, (req: Request, res: Response) => userController.login(req, res));
userRouter.get('/login/role', tokenValidation, (req: Request, res: Response) => {
  UserController.role(req, res);
});

export default userRouter;
