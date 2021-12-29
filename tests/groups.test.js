import request from 'supertest';
import app from "../src/app";
import { getToken } from "../src/authorization/authorization.service";

const TEST_DATA = {
    name: 'TEST_GROUP',
    permissions: ["READ", "SHARE", "UPLOAD_FILES"]
};

describe('Groups suite', () => {

    let auth;
    beforeAll(async () => {
        auth = await getToken("Tim", "d23dew");
    });

      describe('GET', () => {
        it('should return all groups', async () => {
          const groupsResponse = await request(app)
            .get('/groups/getAllGroups')
            .set('Accept', 'application/json')
            .set('Authorization', auth)
            .expect(200)
            .expect('Content-Type', /json/);

          expect(groupsResponse.status).toEqual(200);
          expect(Array.isArray(groupsResponse.body)).toBe(true);
        });

        it('should return a group by id', async () => {
          let groupId;

          await request(app)
            .post('/groups/createGroup')
            .set('Accept', 'application/json')
            .set('Authorization', auth)
            .send(TEST_DATA)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => {
              expect(typeof res.body.id).toBe('string');
              groupId = res.body.id;
            });

          const groupResponse = await request(app)
            .get(`/groups/getGroupById/${groupId}`)
            .set('Accept', 'application/json')
            .set('Authorization', auth)
            .expect(200)
            .expect('Content-Type', /json/);

          expect(typeof groupResponse.body).toBe('object');
          expect(groupResponse.body.id).toEqual(groupId);

          await request(app)
            .delete(`/groups/deleteGroup/${groupId}`)
            .set('Authorization', auth);
        });
      });

      describe('POST', () => {
        it('should create group', async () => {
          let groupId;

          await request(app)
            .post('/groups/createGroup')
            .set('Accept', 'application/json')
            .set('Authorization', auth)
            .send(TEST_DATA)
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => {
              expect(typeof res.body.id).toBe('string');
              groupId = res.body.id;
              expect(res.body).toMatchObject({
                name: TEST_DATA.name,
                permissions: TEST_DATA.permissions
              });
            });

          await request(app)
            .delete(`/groups/deleteGroup/${groupId}`)
            .set('Authorization', auth);
        });
      });

      describe('PUT', () => {
        it('should update group', async () => {
          let groupId;

          await request(app)
            .post('/groups/createGroup')
            .set('Accept', 'application/json')
            .set('Authorization', auth)
            .send(TEST_DATA)
            .then(res => {
              groupId = res.body.id;
            });

          const updatedGroup = {
            ...TEST_DATA,
            name: 'Autotest updated TEST_USER'
          };

          await request(app)
            .put(`/groups/updateGroup/${groupId}`)
            .set('Accept', 'application/json')
            .set('Authorization', auth)
            .send(updatedGroup)
            .expect(200)
            .expect('Content-Type', /json/);

          const { password, ...expectedGroup } = updatedGroup;

          await request(app)
            .get(`/groups/getGroupById/${groupId}`)
            .set('Accept', 'application/json')
            .set('Authorization', auth)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => expect(res.body).toMatchObject(expectedGroup));

          await request(app)
            .delete(`/groups/deleteGroup/${groupId}`)
            .set('Authorization', auth);
        });
      });

      describe('DELETE', () => {
        it('should delete group', async () => {

          const groupResponse = await request(app)
            .post('/groups/createGroup')
            .set('Authorization', auth)
            .send(TEST_DATA);
          const groupId = groupResponse.body.id;

          const deleteResponse = await request(app)
            .delete(`/groups/deleteGroup/${groupId}`)
            .set('Authorization', auth);
          expect(deleteResponse.status).toEqual(204);
        });
      });
});