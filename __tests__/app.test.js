const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const newUser = {
  userName: 'Jenna',
  email: 'test@jenna.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? newUser.password;
  const agent = request.agent(app);
  const [user] = await UserService.create({ ...newUser, ...userProps });
  const { email } = user;
  console.log(user);
  const response = await agent
    .post('/api/v1/users/sessions')
    .send({ email, password });
  console.log(response.body);
  return [agent, user];
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

  it('should return a 403 when signed in but not admin and listing all users', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/users');

    expect(res.body).toEqual({
      message: 'You do not have access to this page',
      status: 403,
    });
  });

  it('GET /api/v1/users returns a list of users if authorized', async () => {
    const [agent, user] = await registerAndLogin({
      email: 'admin@example.com',
    });
    console.log(user);
    const res = await agent.get('/api/v1/users');

    expect(res.body.length).toEqual(3);
    expect(res.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "email": "test@cutie.com",
          "id": "1",
          "userName": "cutie123",
        },
        Object {
          "email": "test@rex2.com",
          "id": "2",
          "userName": "rex123",
        },
        Object {
          "email": "admin@example.com",
          "id": "3",
          "userName": "Jenna",
        },
      ]
    `);
    expect(res.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
