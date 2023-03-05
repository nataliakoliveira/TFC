import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';

class TeamsService {
  private model: ModelStatic<Team> = Team;

  public async getAll(): Promise<Team[]> {
    return this.model.findAll();
  }
}

export default TeamsService;
