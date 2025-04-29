// Delete API tests

import test, { expect } from '@playwright/test';

const headers: Record<string, string> = { 'content-type': 'application/json' };

test('Delete API test', async ({ request }) => {
    //Create a new user
    const createAPIResponse = await request.post('/posts', {
        data: { title: 'foo', body: 'bar', userId: 1 },
        headers: headers,
    });

    const userId = await createAPIResponse.json();

    //Delete this user and verify the response
    const deleteAPIResponse = await request.delete(`/posts/${userId}`);
    const response = await deleteAPIResponse.json();
    const deleteResponseCode = deleteAPIResponse.status();

    expect(deleteResponseCode).toEqual(200);
    expect(response).toMatchObject({});

    //TODO: Try to get the deleted user using its userId
    // Response should be empty or 404 not found
});
