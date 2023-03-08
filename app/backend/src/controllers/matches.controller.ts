import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

class MatchController {
  constructor(private matchesService = new MatchService()) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getAll(inProgress as string);
    res.status(matches.status).json(matches.message);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matches = await this.matchesService.finishMatch(Number(id));
    res.status(matches.status).json(matches.message);
  }
}

export default MatchController;
