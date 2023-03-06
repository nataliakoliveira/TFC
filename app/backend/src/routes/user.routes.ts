import { Router, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import login from '../middlewares/login';

const userService = new UserService();
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post('/login', login, (req: Request, res: Response) => userController.login(req, res));

export default userRouter;
