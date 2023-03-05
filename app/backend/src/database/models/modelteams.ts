import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

class modelTeams extends Model {
  declare id: number;
  declare teamName: string;
}

modelTeams.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default modelTeams;
