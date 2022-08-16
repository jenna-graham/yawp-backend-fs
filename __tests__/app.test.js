const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const newUser = {
  userName: 'Jenna',
  email: 'test@jenna.com',
  password: '12345',
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('POST, creates new user, and signs them in', async () => {
    const res = await request(app).post('/api/v1/users').send(newUser);

    const { userName, email } = newUser;
    expect(res.body).toEqual({
      user: { id: expect.any(String), userName, email },
      message: 'Signed in Successfully',
    });
  });

  it('POST, 500 error with email that already exists', async () => {
    const res = await request(app).post('/api/v1/users').send({
      email: 'test@cutie.com',
    });
    expect(res.status).toBe(500);
  });

  it('POST logs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(newUser);
    const res = await request(app).post('/api/v1/users/sessions').send({
      email: 'test@jenna.com',
      password: '12345',
    });
    expect(res.status).toEqual(200);
  });
  afterAll(() => {
    pool.end();
  });
});
