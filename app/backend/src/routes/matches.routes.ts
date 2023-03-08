import { Router } from 'express';
import MatchController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/validateToken';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/matches', matchController.getAll.bind(matchController));
matchRouter.patch('/matches/:id/finish', tokenValidation, matchController
  .finishMatch.bind(matchController));

export default matchRouter;