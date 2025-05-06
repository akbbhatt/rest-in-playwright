import test, { expect } from '@playwright/test';
import { validateSchema } from '@src/schemaValidator';
import userSchema from '@schema/userSchema.json';

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
        expect(data).toContainEqual({
            userId: 1,

            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            id: 1,
            body:
                'quia et suscipit\n' +
                'suscipit recusandae consequuntur expedita et cum\n' +
                'reprehenderit molestiae ut ut quas totam\n' +
                'nostrum rerum est autem sunt rem eveniet architecto',
        });
        const schemaValidator = validateSchema(userSchema, data);
        if (!schemaValidator.validate) {
            console.error('Schema validation errors:', schemaValidator.errors);
        }
        expect(schemaValidator.validate).toBeTruthy();
    });

    test('Get a specific user', async ({ request }) => {
        const response = await request.get('posts/1', { headers });
        const data = await response.json();
        expect(response.status()).toBe(200);
        console.log('Response data:', data);
        // Partial match by not including body field in the expected object
        expect(data).toMatchObject({
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        });
    });
});
