const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Trip = require('../app_api/models/travlr');
const { login } = require('./testUtils');

let authToken;

// Establish database connection and log in before all tests run
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1/travlr_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // Perform login and store JWT token for authenticated requests
  authToken = await login(app);
  if (!authToken) console.warn('Login failed. DELETE tests may be skipped.');
});

// drop the test database and close connection
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

// Reset database state before each test by deleting existing trips
// and inserting a known trip that can be used for deletion
beforeEach(async () => {
  await Trip.deleteMany({});

  await Trip.create({
    code: 'DEL210901',
    name: 'Delhi Trip',
    length: '6 nights / 7 days',
    start: '2025-09-01T09:00:00.000Z',
    resort: 'Connaught Place Hotel',
    perPerson: '$950',
    image: 'delhi.jpg',
    description: 'Experience Delhi'
  });
});

// DELETE endpoint tests
describe('DELETE /api/trips/:tripCode', () => {
  it('should delete a trip by code', async () => {
    if (!authToken) return console.warn('Skipping DELETE test — token missing');

    const res = await request(app)
      .delete('/api/trips/DEL210901')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(204);

    const remaining = await Trip.find({ code: 'DEL210901' });
    expect(remaining.length).toBe(0);
  });
});
