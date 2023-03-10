import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async rankHome(req: Request, res: Response) {
    const result = await this.leaderboardService.calculateLeaderboard();
    res.status(result.status).json(result.message);
  }
}

export default LeaderboardController;
