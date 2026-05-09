// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SimpleChecks from 'simplechecks';

const client = new SimpleChecks({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource alerts', () => {
  test('retrieve', async () => {
    const responsePromise = client.checks.alerts.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete', async () => {
    const responsePromise = client.checks.alerts.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replace: only required params', async () => {
    const responsePromise = client.checks.alerts.replace('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      channels: [{ target: 'target', type: 'email' }],
      consecutive_failures_threshold: 1,
      consensus_m: 1,
      consensus_n: 1,
      enabled: true,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replace: required and optional params', async () => {
    const response = await client.checks.alerts.replace('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      channels: [
        {
          target: 'target',
          type: 'email',
          config: { foo: 'bar' },
        },
      ],
      consecutive_failures_threshold: 1,
      consensus_m: 1,
      consensus_n: 1,
      enabled: true,
      account_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      check_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      maintenance_windows: [{ end_unix_ms: 0, start_unix_ms: 0 }],
    });
  });

  test('testFire', async () => {
    const responsePromise = client.checks.alerts.testFire('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
