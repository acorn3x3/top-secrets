const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
//const request = require('supertest');
const app = require('../lib/app');
const request = require('supertest');
//const UserService = require('../lib/services/UserService');

const sampleUser = {
  first_name: 'Test',
  last_name: 'Testerson',
  email: 'test@test.com',
  password: '12345',
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

  afterAll(() => {
    pool.end();
  });
});
