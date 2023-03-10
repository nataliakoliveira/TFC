import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/matches';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(sinon.restore);

  const matches = [
    new Matches({

      id: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 0,
      inProgress: false,
    }),
      new Matches({

        id: 2,
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 0,
        inProgress: false,

      }),
    ]

    it('Testa o GET da rota matches', async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(matches);
      const response = await chai
        .request(app).get('/matches')
      expect(response.status).to.be.eq(200);
    }
    );

    it('Testa o GET da rota matches/:id', async () => {
      sinon
        .stub(Matches, "findOne")
        .resolves(matches[0]);
      const response = await chai
        .request(app).get('/matches/1')
      expect(response.status).to.be.eq(200);
    }
    );

    it('testa o token', async () => {
      sinon
        .stub(Model, 'update').resolves();
      const response = await chai
        .request(app).patch('/matches/1/finish');

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.eq({ message: 'Token not found' });
    }
    );
  }
  );