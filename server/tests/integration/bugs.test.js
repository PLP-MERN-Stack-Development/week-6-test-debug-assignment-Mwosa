const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bugRoutes = require('../../routes/bugs');
const errorHandler = require('../../middleware/errorHandler');
const Bug = require('../../models/Bug');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);
app.use(errorHandler);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/bugtracker_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Bug.deleteMany();
});

describe('Bug API', () => {
  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test Bug', description: 'Bug description' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Bug');
  });

  it('should get all bugs', async () => {
    await Bug.create({ title: 'Bug1' });
    const res = await request(app).get('/api/bugs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it('should update a bug', async () => {
    const bug = await Bug.create({ title: 'Bug2' });
    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'resolved' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('should delete a bug', async () => {
    const bug = await Bug.create({ title: 'Bug3' });
    const res = await request(app).delete(`/api/bugs/${bug._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bug deleted');
  });
}); 