// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SimpleChecks from 'simplechecks';

const client = new SimpleChecks({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource runs', () => {
  test('retrieve', async () => {
    const responsePromise = client.runs.retrieve('run_sew2vlfw09vz231q9mz9al2ecd');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.runs.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.runs.list(
        {
          check_id: 'check_id',
          limit: 0,
          offset: 0,
          since: 0,
          status: 'PASS',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(SimpleChecks.NotFoundError);
  });
});
