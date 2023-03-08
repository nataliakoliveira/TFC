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

  async finishMatch(id: number): Promise<IResponse> {
    const match = await this.model.findByPk(id);

    if (!match) {
      return { status: 404, message: 'Match not found' };
    }

    if (match.inProgress) {
      match.inProgress = false;
      await match.save();
      return { status: 200, message: 'Match finished' };
    }

    return { status: 400, message: 'Match already finished' };
  }
}

export default MatchService;
