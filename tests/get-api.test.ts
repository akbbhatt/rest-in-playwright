import test, { expect } from '@playwright/test';
import { validateSchema } from '../src/schemaValidator';
import userSchema from './schema/userSchema.json';

const headers: Record<string, string> = {
    'Content-Type': 'application/json',
};

test.describe('API Tests', () => {
    test('Get API - Validate /posts endpoint', async ({ request }) => {
        const response = await request.get('/posts', { headers });
        const data = await response.json();

        expect(response.status()).toBe(200);
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBeGreaterThan(0);

        const schemaValidator = validateSchema(userSchema, data);
        expect(schemaValidator.validate).toBeTruthy();
        if (!schemaValidator.validate) {
            console.error('Schema validation errors:', schemaValidator.errors);
        }
    });

    test('Get a specific user', async ({ request }) => {
        const response = await request.get('posts/1', { headers });
        const data = await response.json();
        expect(response.status()).toBe(200);
        console.log('Response data:', data);
    });
});
