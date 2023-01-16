import {describe, expect, it, beforeEach, afterEach} from '@jest/globals';
import server from './../server';
import request from 'supertest';

describe('Test all 5 api endpoints', function() {
  let id: string = "";
  it('Create new user by /api/users/ | POST', async () => {
    const response = await request(server)
    .post(`/api/users`)
    .send({
      "username": "anonymous",
      "age": 18,
      "hobbies": []
    });
    expect(response.body.result.id).toBeDefined();
    expect(response.body.result.username).toBeDefined();
    expect(response.body.result.age).toBeDefined();
    expect(response.body.result.hobbies).toBeDefined();
    expect(response.statusCode).toEqual(201);
    id = response.body.result.id;
  });
  it('Get the new user by /api/users/{user_id} | GET', async () => {
    const response = await request(server)
    .get(`/api/users/${id}`);
    expect(response.body.result.id).toBeDefined();
    expect(response.body.result.username).toBeDefined();
    expect(response.body.result.age).toBeDefined();
    expect(response.body.result.hobbies).toBeDefined();
    expect(response.statusCode).toEqual(200);
  });
  it('Update the new user by /api/users/{user_id} | PUT', async () => {
    const response = await request(server)
    .put(`/api/users/${id}`)
    .send({
      "hobbies": ["Singing"]
    });
    expect(response.body.result.id).toBeDefined();
    expect(response.body.result.username).toBeDefined();
    expect(response.body.result.age).toBeDefined();
    expect(response.body.result.hobbies).toBeDefined();
    expect(response.statusCode).toEqual(200);
  });
  it('Delete the new user by /api/users/{user_id} | DELETE', async () => {
    const response = await request(server)
    .delete(`/api/users/${id}`);
    expect(response.statusCode).toEqual(204);
  });
  it('Get all users by /api/users | GET', async () => {
    const response = await request(server)
    .get(`/api/users`);
    expect(response.statusCode).toEqual(200);
  });
})

describe('Test 400 status error code', function() {
  let id: string = "aaaaaaaa-bbcc-1111-aadd-cccc1111eeee";
  it('Create new user by /api/users/ | POST', async () => {
    const response = await request(server)
    .post(`/api/users`)
    .send({
      "username": "anonymous",
      "age": null,
      "hobbies": []
    });
    expect(response.statusCode).toEqual(400);
  });
  it('Get the wrong user by /api/users/{user_id} | GET', async () => {
    const response = await request(server)
    .get(`/api/users/${id}`);
    expect(response.statusCode).toEqual(400);
  });
  it('Update the wrong user by /api/users/{user_id} | PUT', async () => {
    const response = await request(server)
    .put(`/api/users/${id}`)
    .send({
      "hobbies": ["Singing"]
    });
    expect(response.statusCode).toEqual(400);
  });
  it('Delete the wrong user by /api/users/{user_id} | DELETE', async () => {
    const response = await request(server)
    .delete(`/api/users/${id}`);
    expect(response.statusCode).toEqual(400);
  });
})

describe('Test 404 status error code', function() {
  let id: string = "aaeaa2a1-b79c-4236-a71d-3cc95593e5f8";
  it('Get all users with wrong url /api/users/all | GET', async () => {
    const response = await request(server)
    .get(`/api/users/all`);
    expect(response.statusCode).toEqual(404);
  });
  it('Get the user by wrong id type /api/users/{user_id} | GET', async () => {
    const response = await request(server)
    .get(`/api/users/${"aa-bb-cc-dd-eeee"}`);
    expect(response.statusCode).toEqual(404);
  });
})