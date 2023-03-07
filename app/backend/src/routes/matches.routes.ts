import { Router } from 'express';
import MatchController from '../controllers/matches.controller';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/matches', matchController.getAll.bind(matchController));

export default matchRouter;
