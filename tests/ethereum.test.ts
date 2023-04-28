import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import app from '../app';
describe('Ethereum', () => { 
    test('should return Ethereum stats', async () => {
        const response = await request(app).get('/api/ethereum/stats');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'OK')
        expect(response.body).toHaveProperty('result');
    });
    test('should return Ethereum total nodes', async () => {
        const response = await request(app).get('/api/ethereum/nodes');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'OK')
        expect(response.body).toHaveProperty('result');
     })
});