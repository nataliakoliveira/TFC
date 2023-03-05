import { Request, Response } from 'express';
import TeamsService from '../services';

class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) {}

  public async get(_req: Request, res: Response) {
    const teams = await this.teamsService.getAll();
    res.status(200).json(teams);
  }
}

export default TeamsController;
