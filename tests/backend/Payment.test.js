import request from 'supertest'; // To make HTTP requests to the backend API
import { app } from '../../server'; // Assuming the Express app is exported from server.js
import mongoose from 'mongoose'; 
import Payment from '../../models/Payment';  // Payment model

// Mock database connection for tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/gym-test-db', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();  // Close the connection after tests are finished
});

describe('Payment API Tests', () => {

  it('should successfully process a payment', async () => {
    const paymentData = {
      userId: 'mockUserId123',
      planType: 'premium',
      duration: 12,
      amount: 1200,
      status: 'success',
    };

    const response = await request(app)
      .post('/api/payment')
      .send(paymentData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);  // HTTP Status 200 OK
    expect(response.body.message).toBe('Payment successful');
    
    // Verify payment record in the database
    const paymentRecord = await Payment.findOne({ userId: paymentData.userId });
    expect(paymentRecord).toBeTruthy();
    expect(paymentRecord.planType).toBe(paymentData.planType);
    expect(paymentRecord.duration).toBe(paymentData.duration);
    expect(paymentRecord.amount).toBe(paymentData.amount);
  });

  it('should return an error for missing required fields', async () => {
    const paymentData = { // Missing required fields
      userId: 'mockUserId123',
    };

    const response = await request(app)
      .post('/api/payment')
      .send(paymentData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);  // HTTP Status 400 Bad Request
    expect(response.body.error).toBe('Required fields are missing');
  });

  it('should return an error for invalid payment data', async () => {
    const paymentData = {
      userId: 'mockUserId123',
      planType: 'premium',
      duration: 'invalid',  // Invalid duration
      amount: -500,  // Invalid amount (negative)
      status: 'failed',
    };

    const response = await request(app)
      .post('/api/payment')
      .send(paymentData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);  // HTTP Status 400 Bad Request
    expect(response.body.error).toBe('Invalid payment data');
  });

  it('should return an error if payment processing fails', async () => {
    // Simulate a payment failure
    const paymentData = {
      userId: 'mockUserId123',
      planType: 'premium',
      duration: 6,
      amount: 600,
      status: 'failed', // Payment failure
    };

    const response = await request(app)
      .post('/api/payment')
      .send(paymentData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);  // HTTP Status 400 Bad Request
    expect(response.body.error).toBe('Payment failed');
  });

});