const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('users', () => {
  beforeEach(() => {
    return setup(pool);
  });


const sampleUser = {
  firstName: 'Test',
  lastName: 'Testerson;',
  email: 'test@test.com',
  password: '12345',
};






  it('POST /api/v1/users creats a new user',  async () => {
    const res = await (await request(app).post('api/v1/users')).setEncoding(sampleUser);
    expect(res.status).toBe(200);
    const {firstName, lastName, email } = sampleUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email
  });
  });




  afterAll(() => {
    pool.end();
  });
});
