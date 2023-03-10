import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async leaderboardRank(req: Request, res: Response) {
    const result = await this.leaderboardService.calculateLeaderboardHome();
    res.status(result.status).json(result.message);
  }

  async leaderboardAway(req: Request, res: Response) {
    const result = await this.leaderboardService.calculateLeaderboardAway();
    res.status(result.status).json(result.message);
  }
}

export default LeaderboardController;
