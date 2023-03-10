import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(sinon.restore);

  const users = [
    new User({
      id: 1,
      username: 'Natalia',
      role: 'admin',
      email: 'natalia@gmail.com',
      password: '123456',
    }),
  ]
    
    const constrol = [
      {
        id: 1,
        username: 'Natalia',
        role: 'admin',
        email: 'natalia@gmail.com',
        password: '123456',
      },
    ]

    it('Testa o user', async () => {
      const body = {
        email: 'natalia@gmail.com',
        password: '',
      };
      sinon.stub(Model, 'findAll').resolves([users[0]]);
      sinon.stub(bcrypt, 'compareSync').resolves(true);

      const response = await chai.request(app).post('/login').send(body);
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('token');
    });

    it('Testa o user', async () => {
      const body = {
        email: 'nat.com',
        password: '',
      };

      sinon.stub(Model, 'findAll').resolves([users[0]]);
      sinon.stub(bcrypt, 'compareSync').resolves(true);

      const response = await chai.request(app).post('/login').send(body);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.haveOwnProperty('invalid email or password');

    });

    it('Testa o user', async () => {
      const body = {
        email: 'natalia@gmail.com',
        password: '16',
      };

      sinon.stub(Model, 'findAll').resolves([users[0]]);
      sinon.stub(bcrypt, 'compareSync').resolves(true);

      const response = await chai.request(app).post('/login').send(body);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.haveOwnProperty('invalid email or password');

    });
  });
