const request = require('supertest');
const app = require('../../src/server');
const { seedProducts, clearDatabase } = require('../helpers/db');

let server;

beforeAll(async () => {
  await seedProducts();
  server = app.listen(0);
});

afterAll(async () => {
  server.close();
  await clearDatabase();
});

describe('Product Listing E2E', () => {
  it('should list products with pagination', async () => {
    const res = await request(server).get('/api/products?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.products.length).toBeLessThanOrEqual(10);
    expect(res.body.total).toBeGreaterThan(0);
    expect(res.body.page).toBe(1);
  });

  it('should filter products by category', async () => {
    const res = await request(server).get('/api/products?category=electronics');
    expect(res.status).toBe(200);
    res.body.products.forEach((p) => {
      expect(p.category).toBe('electronics');
    });
  });

  it('should sort products by price ascending', async () => {
    const res = await request(server).get('/api/products?sort=price_asc');
    expect(res.status).toBe(200);
    const prices = res.body.products.map((p) => p.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  it('should return a single product with full details', async () => {
    const res = await request(server).get('/api/products/prod_001');
    expect(res.status).toBe(200);
    expect(res.body.product.id).toBe('prod_001');
    expect(res.body.product.name).toBeDefined();
    expect(res.body.product.description).toBeDefined();
    expect(res.body.product.images).toBeDefined();
  });
});

describe('Cart Operations E2E', () => {
  let token;

  beforeAll(async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: 'shopper@test.com', password: 'Password1!' });
    token = res.body.token;
  });

  it('should add an item to the cart and return updated totals', async () => {
    const res = await request(server)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: 'prod_001', quantity: 2 });

    expect(res.status).toBe(200);
    expect(res.body.cart.items).toHaveLength(1);
    expect(res.body.cart.subtotal).toBeGreaterThan(0);
  });

  it('should update quantity and recalculate totals', async () => {
    const res = await request(server)
      .patch('/api/cart/items/prod_001')
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 4 });

    expect(res.status).toBe(200);
    expect(res.body.cart.items[0].quantity).toBe(4);
  });

  it('should remove an item from the cart', async () => {
    const res = await request(server)
      .delete('/api/cart/items/prod_001')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.cart.items).toHaveLength(0);
  });
});

describe('Stripe Checkout E2E', () => {
  let token;

  beforeAll(async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ email: 'shopper@test.com', password: 'Password1!' });
    token = res.body.token;

    await request(server)
      .post('/api/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: 'prod_002', quantity: 1 });
  });

  it('should create a Stripe checkout session', async () => {
    const res = await request(server)
      .post('/api/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({ successUrl: 'https://store.test/success', cancelUrl: 'https://store.test/cart' });

    expect(res.status).toBe(200);
    expect(res.body.sessionId).toBeDefined();
    expect(res.body.url).toContain('checkout.stripe.com');
  });

  it('should process the Stripe payment_intent.succeeded webhook', async () => {
    const payload = { type: 'payment_intent.succeeded', data: { object: { id: 'pi_test', metadata: { userId: 'user_1' } } } };
    const res = await request(server)
      .post('/api/webhook/stripe')
      .set('stripe-signature', 'test_sig')
      .send(payload);

    expect(res.status).toBe(200);
  });
});
