import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
     sinon
       .stub(Team, "findOne")
       .resolves({
        id: 2,
        teamName: 'Bahia',
       } as Team);
   });

   afterEach(()=>{
     (Team.findOne as sinon.SinonStub).restore();
   })

   it('Testa o GET da rota teams', async () => {
     chaiHttpResponse = await chai
       .request(app).get('/teams')
     expect(chaiHttpResponse.status).to.be.eq(200);
   });

   it('Testa o GET da rota teams/:id', async () => {
      chaiHttpResponse = await chai
        .request(app).get('/teams/2')
      expect(chaiHttpResponse.status).to.be.eq(200);
    });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
