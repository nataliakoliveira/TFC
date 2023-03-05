import { Request, Response } from 'express';
import TeamsService from '../services';

class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) {}

  public async get(_req: Request, res: Response) {
    const teams = await this.teamsService.getAll();
    res.status(200).json(teams);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const team = await this.teamsService.getById(id);
    res.status(200).json(team);
  }
}

export default TeamsController;
