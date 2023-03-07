import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

class MatchController {
  constructor(private matchesService = new MatchService()) {}

  async getAll(_req: Request, res: Response) {
    const matches = await this.matchesService.getAll();
    res.status(matches.status).json(matches.message);
  }
}

export default MatchController;
