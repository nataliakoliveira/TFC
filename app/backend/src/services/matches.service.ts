import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';
import Matches from '../database/models/matches';
import IResponse from '../interfaces/IResponse';

class MatchService {
  protected model: ModelStatic<Matches> = Matches;

  async getAll(inProgress: string): Promise<IResponse> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });

    if (inProgress === 'true') {
      return { status: 200, message: matches.filter((match) => match.inProgress) };
    }

    if (inProgress === 'false') {
      return { status: 200, message: matches.filter((match) => !match.inProgress) };
    }

    return { status: 200, message: matches };
  }
}

export default MatchService;
