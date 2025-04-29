import test, { expect } from '@playwright/test';

const headers: Record<string, string> = {
    'Content-Type': 'application/json',
};

test('Update API - Validate', async ({ request }) => {
    const createResponse = await request.post(`/posts`, {
        data: { title: 'foo', body: 'bar', userId: 1 },
    });
    console.log(`New user response code: ${createResponse.status()}`);
    // const newlyCreatedUserId = (await createResponse.json()).id;
    //TODO: Cannot update the newly created user since the fake API does not support it
    // In a rea
    const responseAfterUpdate = await request.put(`/posts/1`, {
        data: {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
        },
        headers,
    });

    const updatedData = await responseAfterUpdate.json();
    console.log('response:', updatedData);

    const statusAfterUpdate = await responseAfterUpdate.status();
    console.log('status:', statusAfterUpdate);
    expect(statusAfterUpdate).toBe(200);
});
