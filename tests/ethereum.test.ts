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
     test('should return Ethereum account data', async () => {
         const response = await request(app).get('/api/ethereum/account?address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
         expect(response.status).toBe(200);
         expect(response.body).toHaveProperty('message', 'OK')
         expect(response.body).toHaveProperty('result');
     }  )
});