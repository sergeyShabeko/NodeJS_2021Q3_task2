import request from 'supertest';
import app from "../src/app";
import { getToken } from "../src/authorization/authorization.service";

const TEST_DATA = {
  login: 'TEST_USER',
  password: 'Pass123',
  age: 22
};

describe('Users suite', () => {

  let auth;
  beforeAll(async () => {
    auth = await getToken("Tim", "d23dew");
  });

  describe('GET', () => {
    it('should return all users', async () => {
      const usersResponse = await request(app)
        .get('/users/getAllUsers')
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(usersResponse.status).toEqual(200);
      expect(Array.isArray(usersResponse.body)).toBe(true);
    });

    it('should return a user by id', async () => {
      let userId;

      await request(app)
        .post('/users/createUser')
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .send(TEST_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(typeof res.body.id).toBe('string');
          userId = res.body.id;
        });

      const userResponse = await request(app)
        .get(`/users/getUserById/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(typeof userResponse.body).toBe('object');
      expect(userResponse.body.id).toEqual(userId);

      await request(app)
        .delete(`/users/deleteUser/${userId}`)
        .set('Authorization', auth);
    });

    it('should return suggested users', async () => {
      const limit = 1;
      const loginSubstring = 'Ti'
      const usersResponse = await request(app)
        .get(`/users/getAutoSuggestUsers?loginSubstring=${loginSubstring}&limit=${limit}`)
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(usersResponse.status).toEqual(200);
      expect(Array.isArray(usersResponse.body)).toBe(true);
      expect(usersResponse.body.every((user) => user.login.startsWith(loginSubstring))).toBe(true);
    });
  });

  describe('POST', () => {
    it('should create user', async () => {
      let userId;

      await request(app)
        .post('/users/createUser')
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .send(TEST_DATA)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(typeof res.body.id).toBe('string');
          userId = res.body.id;
          expect(res.body).toMatchObject({
            login: TEST_DATA.login,
            age: TEST_DATA.age
          });
        });

      await request(app)
        .delete(`/users/deleteUser/${userId}`)
        .set('Authorization', auth);
    });
  });

  describe('PUT', () => {
    it('should update user', async () => {
      let userId;

      await request(app)
        .post('/users/createUser')
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .send(TEST_DATA)
        .then(res => {
          userId = res.body.id;
        });

      const updatedUser = {
        ...TEST_DATA,
        login: 'Autotest updated TEST_USER'
      };

      await request(app)
        .put(`/users/updateUser/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .send(updatedUser)
        .expect(200)
        .expect('Content-Type', /json/);

      const { password, ...expectedUser } = updatedUser;

      await request(app)
        .get(`/users/getUserById/${userId}`)
        .set('Accept', 'application/json')
        .set('Authorization', auth)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => expect(res.body).toMatchObject(expectedUser));

      await request(app)
        .delete(`/users/deleteUser/${userId}`)
        .set('Authorization', auth);
    });
  });

  describe('DELETE', () => {
    it('should delete user', async () => {

      const userResponse = await request(app)
        .post('/users/createUser')
        .set('Authorization', auth)
        .send(TEST_DATA);
      const userId = userResponse.body.id;

      const deleteResponse = await request(app)
        .delete(`/users/deleteUser/${userId}`)
        .set('Authorization', auth);
      expect(deleteResponse.status).toEqual(204);
    });
  });
});