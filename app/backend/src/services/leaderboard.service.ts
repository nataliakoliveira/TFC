import { ModelStatic } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import Team from '../database/models/Team';
import Matches from '../database/models/matches';
import IResponse from '../interfaces/IResponse';

const countOccurrences = (str: string, arr: string[]) =>
  arr.filter((item) => item === str).length;

const getMatchResults = (matches: Matches[]) =>
  matches.map((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return 'victory';
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      return 'draw';
    }
    return 'loss';
  });

const calculateRanking = (team: Team, results: string[], matches: Matches[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });

  return {
    name: team.teamName,
    totalPoints: countOccurrences('victory', results) * 3 + countOccurrences('draw', results),
    totalGames: matches.length,
    totalVictories: countOccurrences('victory', results),
    totalDraws: countOccurrences('draw', results),
    totalLosses: countOccurrences('loss', results),
    goalsFavor,
    goalsOwn,

  };
};

class LeaderboardService {
  private team: ModelStatic<Team> = Team;
  private matches: ModelStatic<Matches> = Matches;

  async calculateLeaderboardHome(): Promise<IResponse> {
    const [teams, matches] = await Promise.all([
      this.team.findAll(),
      this.matches.findAll({ where: { inProgress: false } }),
    ]);

    const result: ILeaderboard[] = teams.map((team) => {
      const teamMatches = matches.filter((match) => match.homeTeamId === team.id);
      const teamResults = getMatchResults(teamMatches);
      return calculateRanking(team, teamResults, teamMatches);
    });

    return LeaderboardService.createSuccessResponse(200, result);
  }

  async calculateLeaderboardAway(): Promise<IResponse> {
    const [teams, matches] = await Promise.all([
      this.team.findAll(),
      this.matches.findAll({ where: { inProgress: false } }),
    ]);

    const result: ILeaderboard[] = teams.map((team) => {
      const teamMatches = matches.filter((match) => match.awayTeamId === team.id);
      const teamResults = getMatchResults(teamMatches);
      return calculateRanking(team, teamResults, teamMatches);
    });

    return LeaderboardService.createSuccessResponse(200, result);
  }

  private static createSuccessResponse(status: number, message: unknown): IResponse {
    return { status, message };
  }

  private static createErrorResponse(status: number, message: unknown): IResponse {
    return LeaderboardService.createSuccessResponse(status, { message });
  }
}

export default LeaderboardService;
