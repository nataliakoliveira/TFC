import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const TeamRouter = Router();

TeamRouter.get('/teams', (req: Request, res: Response) => teamsController.get(req, res));
TeamRouter.get('/teams/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default TeamRouter;
