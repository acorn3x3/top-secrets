const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const UserService = require('../lib/services/UserService');
// const { Secret } = require('../lib/models/Secret');

const admin = {
  first_name: 'admin',
  last_name: 'admin',
  email: 'admin',
  password: 'admin',
};
describe('secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });
  it('GET /api/v1/secrets should return a list of secrets if authd and authd', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({ ...admin });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'admin', password: 'admin' });

    const resp = await agent.get('/api/v1/secrets');
    expect(resp.status).toEqual(200);
  });
});

//   it('POST api/v1/users/secrets should only be allowed if user is authenticated and authorized', async () => {
//     const agent = request.agent(app);
//     const user = await UserService.create({ ...admin });

//     await agent
//       .post('/api/v1/user/sessions')
//       .send({ email: 'admin', password: 'admin' });

//     const resp = await agent.post('/api/v1/users/secrets');
//     expect(resp.status).toEqual(200);
//   });
// });
