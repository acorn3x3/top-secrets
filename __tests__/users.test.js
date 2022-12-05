const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const UserService = require('../lib/services/UserService');
const { User } = require('../lib/models/User');

const sampleUser = {
  first_name: 'Test',
  last_name: 'Testerson',
  email: 'test2@test.com',
  password: '12345',
};
const admin = {
  first_name: 'admin',
  last_name: 'admin',
  email: 'admin',
  password: 'admin',
};

describe('users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /api/v1/users creates a new user', async () => {
    const resp = await request(app).post('/api/v1/users').send(sampleUser);
    expect(resp.status).toBe(200);
    const { first_name, last_name, email } = sampleUser;

    expect(resp.body).toEqual({
      id: expect.any(String),
      first_name,
      last_name,
      email,
    });
  });
  it('POST /api/v1/sessions signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(sampleUser);
    const resp = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test2@test.com', password: '12345' });
    expect(resp.status).toEqual(200);
  });

  it('GET /api/v1/users/secrets should return a 401 if not authenticated', async () => {
    const resp = await request(app).get('/api/v1/users/secrets');
    expect(resp.status).toEqual(401);
  });

  it('GET /api/v1/users/secrets should return the current user if autenticated ', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({ ...sampleUser });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'test2@test.com', password: '12345' });
    const resp = await agent.get('/api/v1/users/secrets');
    expect(resp.status).toEqual(200);
  });

  it('GET api/v1/users should return 401 if user is not authenticated', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({ ...sampleUser });

    await agent
      .post('/api/v1/users')
      .send({ email: 'test2@test.com', password: '12345' });

    const resp = await agent.get('/api/v1/users');
    expect(resp.status).toEqual(401);
  });

  // it('GET api/v1/users/ should return 401 if user is not authenticated', async () => {
  //   const agent = request.agent(app);
  //   const user = await UserService.create({ ...sampleUser });

  //   await agent
  //     .post('/api/v1/users/secrets')
  //     .send({ email: 'test2@test.com', password: '12345' });

  //   const resp = await agent.get('/api/v1/users/secrets');
  //   expect(resp.status).toEqual(401);
  // });

  // const registerAndLogin = async () => {
  //   const agent = request.agent(app);
  //   const user = await UserService.create(admin);
  //   await agent
  //     .post('/api/v1/users/sessions')
  //     .send({ email: 'admin', password: 'admin' });
  //   return [agent, user];
  // };

  // it('GET /api/v1/users/secrets should return the current user if authenticated and authorized', async () => {
  //   const [agent] = await registerAndLogin();
  //   const resp = await agent.post('/api/v1/users/secrets');
  // });
  afterAll(() => {
    pool.end();
  });
});
