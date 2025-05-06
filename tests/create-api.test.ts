import test, { expect } from '@playwright/test';
import { validateSchema } from '@src/schemaValidator';
import userSchema from '@schema/create-user.schema.json';

const headers: Record<string, string> = {
    'Content-Type': 'application/json',
};

test('Create API - Validate /posts endpoint', async ({ request }) => {
    const response = await request.post('/posts', {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
        },
        headers: headers,
    });
    const data = await response.json();
    const status = response.status();
    console.log('response:', data);
    console.log('status:', status);
    const valid = validateSchema(userSchema, data);
    if (!valid.validate) {
        console.error('Schema validation errors:', valid.errors);
    }
    expect(valid.validate).toBeTruthy();
    expect(status).toBe(201);
});

test('Create and get the newly created user', async ({ request }) => {
    const response = await request.post('/posts', {
        data: { title: 'foo', body: 'bar', userId: 1 },
        headers: headers,
    });
    expect(response.status()).toBe(201);

    //TODO: Since this is a fake API, the following lines will not work as expected
    // const userId = (await response.json()).id;
    // const getUserResponse = await request.get(`/posts/${userId}`, { headers: headers });
    // expect(getUserResponse.status()).toBe(200);
    // const getUserData = await getUserResponse.json();
    // expect(getUserData.id).toEqual(userId);
});
