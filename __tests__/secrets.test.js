const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const UserService = require('../lib/services/UserService');

const admin = {
  first_name: 'admin',
  last_name: 'admin',
  email: 'admin',
  password: 'admin',
};
const sampleUser = {
  first_name: 'Test',
  last_name: 'Testerson',
  email: 'test2@test.com',
  password: '12345',
};

const registerAndLogin = async () => {
  const agent = request.agent(app);
  const user = await UserService.create(sampleUser);
  await agent
    .post('/api/v1/users/sessions')
    .send({ email: sampleUser.email, password: sampleUser.password });
  return [agent, user];
};

describe('secrets', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/v1/secrets should return a list of secrets if authd ', async () => {
    const agent = request.agent(app);
    // eslint-disable-next-line no-unused-vars
    const user = await UserService.create({ ...admin });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'admin', password: 'admin' });

    const resp = await agent.get('/api/v1/secrets');

    expect(resp.status).toEqual(200);
  });
});

it('POST /api/v1/users/secrets should only be allowed if user is authenticated ', async () => {
  const [agent] = await registerAndLogin();
  const resp = await agent
    .post('/api/v1/secrets')

    .send({
      title: 'look at me being a sample',
      description: 'wow such empty, much lonely',
    });
  expect(resp.status).toBe(200);
  expect(resp.body).toMatchInlineSnapshot(`
    Object {
      "description": "wow such empty, much lonely",
      "id": "2",
      "title": "look at me being a sample",
    }
  `);
});
afterAll(() => {
  pool.end();
});
