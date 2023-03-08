import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';
import Matches from '../database/models/matches';
import IResponse from '../interfaces/IResponse';
import IUpdate from '../interfaces/IUpdate';
import ICreate from '../interfaces/ICreate';

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

  async updateMatch(id:number, body: IUpdate): Promise<IResponse> {
    const match = await this.model.findByPk(id);

    if (!match) {
      return { status: 404, message: 'Match not found' };
    }

    if (match.inProgress) {
      match.homeTeamGoals = body.homeTeamGoals;
      match.awayTeamGoals = body.awayTeamGoals;
      await match.save();
      return { status: 200, message: 'Match updated' };
    }

    return { status: 400, message: 'Match already finished' };
  }

  async createMatch(body: ICreate): Promise<IResponse> {
    if (body.homeTeamId === body.awayTeamId) {
      return MatchService.createErrorResponse(
        422,
        'It is not possible to create a match with two equal teams',
      );
    }

    const homeTeam = await this.model.findByPk(body.homeTeamId);
    const awayTeam = await this.model.findByPk(body.awayTeamId);

    if (!homeTeam || !awayTeam) {
      return MatchService.createErrorResponse(404, 'There is no team with such id!');
    }

    const match = await this.model.create({ ...body, inProgress: true });
    return { status: 201, message: match };
  }

  private static createSuccessResponse(status: number, message: unknown): IResponse {
    return { status, message };
  }

  private static createErrorResponse(status: number, message: unknown): IResponse {
    return MatchService.createSuccessResponse(status, { message });
  }
}

export default MatchService;
