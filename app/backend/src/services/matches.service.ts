import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';
import Matches from '../database/models/matches';
import IResponse from '../interfaces/IResponse';

class MatchService {
  protected model: ModelStatic<Matches> = Matches;

  async getAll(): Promise<IResponse> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return { status: 200, message: matches };
  }
}

export default MatchService;
